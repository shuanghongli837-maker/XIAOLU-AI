# 第三方依赖与素材

- GSAP 3.15.1：Standard “No Charge” 许可，见 https://gsap.com/standard-license/ 。保留构建产物中的厂商声明。
- React / React DOM / Scheduler：MIT，完整许可见 `licenses/`。
- Transformers.js 3.8.1：Apache-2.0；Hugging Face Jinja：MIT。
- ONNX Runtime Web 1.22.0-dev.20250409-89f8206ba4：MIT，包含对应的第三方声明。
- Xenova/whisper-base ONNX模型：固定版本 `64da57285918e20ea79ea5c88eed7197933abaa8`；转换模型卡声明 Apache-2.0，同时保留原 OpenAI Whisper MIT许可。使用fp32编码器与q8解码器。
- OpenCC.js 1.4.2：代码MIT、词典数据Apache-2.0，仅用于将转写结果统一为简体，不纠改或补造识别内容。
- Noto Sans SC 字体子集：SIL Open Font License，见 `public/assets/OFL-NotoSansSC.txt`。优先使用设备已有 PingFang SC，字体文件用于跨平台回退。
- Heroicons 的声音开启、麦克风开启、发送与删除图标（普通聊天发送采用加粗描边变体）：MIT，见 `public/assets/LICENSE-Heroicons.txt`。
- 小鹿 IP 视频、图片、眼睛折角表情、其余图标与静态光效：来自用户提供的 Figma 设计，用于本项目还原。

运行时代码不请求临时 Figma 资源地址；所有所需素材均已存入 `public/assets/`。

上述语音依赖、模型卡和完整许可位于 `public/assets/asr/licenses/`；固定版本、来源和逐文件SHA256见 `public/assets/asr/manifest.json`。模型与WASM从本站加载，不请求外部识别服务。
