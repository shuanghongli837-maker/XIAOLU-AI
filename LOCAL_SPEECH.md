# 本地中文语音识别

2026-11-08：在当前Codex内置浏览器复现到麦克风已经开启，而原生SpeechRecognition返回 `network`。因此不能仅检查接口是否存在，或只改变错误提示。本次将Live与按住说话接入本站提供的Whisper识别模型。

## 数据路径

用户点击麦克风/按住说话 → 原Web Audio麦克风管理器 → AudioWorklet连续PCM（不支持时回退ScriptProcessor）→ 能量VAD分段 → 抗混叠重采样至16 kHz单声道 → Worker中的Whisper base → OpenCC简体转换 → 原有对话发送与增配逻辑。

波浪与表情继续读取同一条真实麦克风流。VAD在说话结束后等待800 ms静音，Live识别一段后返回现有对话；按住说话在松手时提交，向上移动取消。单段最多12秒，按住说话最多4段，超限提示重试。静音不送模型，取消后的结果不得发送。

采集结束先刷新最后一个音频块，再关闭音轨和AudioContext，避免丢掉句尾。退出、切后台、取消和重试均取消对应请求并丢弃旧回调。模型Worker保留以便下次复用，里面没有打开的麦克风；模型准备期间不申请麦克风权限。

音频只在内存中处理，不上传，不写入localStorage、文件或分析日志；沿用原有逻辑保存转写后的用户文字。缓存只保存模型与运行资源。

## 模型和部署

- Transformers.js 3.8.1；与安装包匹配的ONNX Runtime Web WASM，单线程，避免要求SharedArrayBuffer或COOP/COEP。
- Xenova/whisper-base，固定版本见ASR manifest；fp32 encoder + q8 decoder。tiny模型在中文装备名称测试中错字较多，因此未作为最终模型发布。
- `public/assets/asr/` 全部随站点部署；支持根目录和 `/xiaolu/` 等子目录，不依赖Hugging Face CDN在线请求。模型按需加载，打开Live时预热；首次需约139 MB模型和约22 MB实际WASM运行文件，后续使用浏览器缓存。
- `setup_local_asr.py`位于源码根目录，可校验并恢复资源。`python setup_local_asr.py --verify-only` 无网络校验manifest中的大小、SHA256及文件格式；重新准备依赖时先 `npm ci`，再运行该脚本。版本与下载来源均固定，避免混用WASM版本。
- 使用HTTP本机或HTTPS部署，服务器应正确提供`.wasm`、`.mjs`、`.onnx`文件，不要把未找到的静态资源回退成HTML。无需外部ASR密钥。

## 验证边界

`npm test`包含PCM重采样、抗混叠、VAD静音/点击声/句首保留、尾块刷新、12秒边界及音频节点清理。

开发服务器上可打开 `tests/local-asr.html`，用合成中文WAV检查真实模型解码；打开 `tests/speech-product.html`，检查实际产品、真实AudioContext/Worklet/VAD和模型的完整链路。后一页面仅替换麦克风音频来源为合成WAV，独立存储测试会话，不注入转写文字或模拟识别结果，也不会打开真实麦克风。两页不进入生产构建。样本由系统Microsoft Huihui中文合成语音生成，位于 `tests/assets/chinese-sample.wav`。

当前桌面浏览器已验证模型解码；真实麦克风获授权后能够开启，静音结束可关闭并重试。合成音频与真人录音验收需分别记录，不能把合成样本通过写成真人语音准确率通过。移动设备的内存、首次加载时长、识别延迟和嘈杂场景识别准确率仍需真机测试。本地ASR不是完整的Realtime大模型语音服务。
