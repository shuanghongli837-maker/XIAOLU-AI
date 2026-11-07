# 小鹿AI · GitHub Pages 部署

本包是已经构建好的静态H5，不需要安装Node.js或再次构建。
包含当前输入框边框、历史记录删除等修正与本地中文语音识别资源。

## 为什么网页上传失败

GitHub网页上传一次最多100个文件，且单文件最多25 MiB。
本项目有两个约79 MiB和51 MiB的语音模型文件，分批网页上传仍会失败。
本包所有文件均小于100 MiB，请使用GitHub Desktop或普通Git提交。
两个大模型文件超过50 MiB时Git可能警告，但低于100 MiB硬限制。

## GitHub Desktop上传

1. 下载并安装官方GitHub Desktop：https://desktop.github.com/ ，登录自己的GitHub账号。
2. File → Clone repository → URL，粘贴你创建的仓库链接，克隆到本机。
3. 解压本包，将index.html、assets文件夹、.nojekyll及其它文件复制到刚克隆的仓库根目录。
   index.html必须直接位于发布根目录，不要额外套一层dist或压缩包文件夹。
   不要把ZIP本身直接上传到仓库。保留assets内部目录结构。
4. 在GitHub Desktop填写提交说明，Commit，然后Push origin。
   全部资源保持普通Git文件，不需要将模型转换为Git LFS指针。
5. 仓库网页 → Settings → Pages → Source选择Deploy from a branch。
   Branch选择实际推送的分支（通常main），Folder选择/(root)，点击Save。
6. 等待Pages部署完成，使用Pages页面显示的HTTPS网站链接访问。
   如使用GitHub Free，Pages通常需公开仓库；私有仓库按账号方案支持情况配置。

## 注意

- .nojekyll用于按原样发布已经构建好的静态资源。
- 首次使用语音需加载较大的模型，后续复用浏览器缓存。
- 手机麦克风需要HTTPS和用户授权。
- 这是完整前端交互版，天气、库存、商家订单和支付尚未接入真实服务。
- 音频在浏览器内存中本地识别；本包不包含任何用户录音或用户的本地聊天历史。
- 原有产品、语音说明及第三方许可随包提供。

官方说明：
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
