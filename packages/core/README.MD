
<div align="center">

# ChatLuna

_多平台模型接入，可扩展，多种输出格式，提供大语言模型聊天服务的机器人插件。_

[![npm](https://img.shields.io/npm/v/koishi-plugin-chatluna/next)](https://www.npmjs.com/package/koishi-plugin-chatluna) [![npm](https://img.shields.io/npm/dm/koishi-plugin-chatluna)](https://www.npmjs.com/package/koishi-plugin-chatluna) ![node version](https://img.shields.io/badge/node-%3E=18-green) ![github top language](https://img.shields.io/github/languages/top/ChatLunaLab/chatluna?logo=github)

[![Telegram](https://img.shields.io/badge/Join-Telegram_Group-blue)](https://t.me/koishi_chatluna) [![QQ](https://img.shields.io/badge/Join-QQ_Group-ff69b4)](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=eEBVq6GK7HYX2y61x55WD6hnXTIRop-0&authKey=i4pG5%2BJ%2FY8auWprBubhremTkn3vroPigQq5m9RENGBLrLmlj%2BSu3G%2BqllK7Wts2M&noverify=0&group_code=282381753) [![doc](https://img.shields.io/badge/See-Document(WIP)-green)](https://chatluna.dingyi222666.top/)

**项目状态：缓慢迭代到 1.0 正式版（急需人手补全文档）**

</div>

## 截图

施工中.....

## 特性

- 高扩展性，基于 LangChain 和 Koishi，我们提供了一套扩展 API，让第三方插件开发者可以轻松的扩展或调用此项目的服务。如 调用模型，对接新模型等
- 预设系统，可设置对话的预设，调教模型。
- 黑名单系统，全局冷却时间和模型并发请求限制，以及按小时的模型的调用额度限制，轻松管理模型的调用限额等。
- 支持以 语音/文字/图片/图文混合 渲染模型回复，也支持解析返回的 markdown，实现比较自然的分割成多条消息来发送
- 上下文对话，长期记忆的支持 （需要适配器支持）
- 三种聊天模式: `chat`,`browsing`,`plugin`

    后两种模式可让模型调用外部工具，使得模型能获取到外部信息，执行相关操作等。

- 内容安全过滤，基于 Koishi 的 [censor 服务](`https://censor.koishi.chat/`), 防止模型返回不良内容

## TODO (画饼是吧)

- [x] 基于房间的对话系统
- [x] 回复内容审核 （基于其他插件提供的 censor 服务）
- [x] 语音输出支持（即文字转语音，基于 initialencounter 佬的 [vits服务](https://github.com/initialencounter/mykoishi/blame/master/vits/readme.md)）
- [x] 图片渲染回复
- [x] 接入更多模型/平台
- [x] 预设系统
- [x] ~~导入或导出会话记录（实际未完成，已放弃支持）~~
- [x] 重构到 v1 版本
- [x] 流式响应支持
- [x] ~~i18n 本地化支持~~

## 部署

我们可在 Koishi 下直接安装本插件使用基础功能而无需额外配置。

阅读 [此文档](https://chatluna.dingyi222666.top/guide/getting-started.html) 了解更多。

## 适配支持

我们目前支持以下模型/平台：

|  模型/平台  |  接入方式  |  特性  |  注意事项  |
|:----------|:----------|-------|:----------|
| [OpenAI](./packages/openai-adapter/README.md) | 本地 Client，官方 API 接入 | 可自定义人格，支持插件/浏览模式等聊天模式 | API 接入需要付费 |
| [Google Gemini](./packages/gemini-adapter/README.md) | 本地 Client，官方 API 接入 | 速度快，性能超越 GPT-3.5 | 需要有 Gemini 访问权限账号，可能收费 |
| [New Bing](./packages/newbing-adapter/README.md) | 本地 Client，逆向 API 接入 | 自带网络搜索，强时效性，可无需登录使用 | 需要代理，需要过验证码（无需 Cookie 也可用） |
| [Google Bard](./packages/bard-adapter/README.md) | 本地 Client，逆向 API 接入 | 和 New Bing 一样可以网络搜索，强时效性 | 需要有 Bard 访问权限账号 |
| [Claude 2](./packages/claude2-adapter/) | 本地 Client，逆向 API 接入 | 超大上下文，大部分情况下能超过 GPT 3.5，类似 New Bing 有账号就行，免费 | 需要有 Claude 2 访问权限账号。后续可能会有限流 |
| [poe.com](./packages/poe-adapter/README.md) | 本地 Client，逆向 API 接入 | 网站可选多种模型，和 New Bing 一样免费 | 需要有 [poe.com](poe.com) 的账号 |
| [智谱](./packages/zhipu-adapter/README.md) | 本地 Client，官方 API 接入 | ChatGLM，新人注册可获取免费 Token 额度 | 实测效果比讯飞星火略好 |
| [通义千问](./packages/qwen-adapter/README.md) | 本地 Client，官方 API 接入 | 阿里出品国产模型，有免费额度 | 实测效果约等于 讯飞星火 |
| [讯飞星火](./packages/spark-adapter/README.md) | 本地 Client，官方 API 接入 | 国产模型，新人注册可获取免费 Token 额度 | 实测效果约等于 GPT 3.5 |
| [文心一言](./packages/wenxin-adapter/README.md) | 本地 Client，官方 API 接入 | 百度经典模型，有免费额度 | 实测效果约等于通义千问 |
| [GPT Free](./packages/gptfree-adapter/README.md) | 本地 Client，官方 API 接入 | 本地转发使用其他网站的 GPT 模型，项目自动配置网站等配置，无需手动注册 | 可能随时失效，不稳定 |
| [ChatGLM](./packages/chatglm-adapter/README.md) | 本地 Client，自搭建后端 API 接入 | 可本地搭建，四舍五入不要钱 | 需要自己搭建后端 API，要求一定的配置，模型参数不够大导致聊天效果不够好 |
| [RWKV](./packages/rwkv-adapter/README.md) | 本地 Client，自搭建 API 接入 | 知名开源模型，可本地搭建 |  需要自己搭建后端 API，要求一定的配置 |

[为模型提供网络搜索能力](/packages/search-service/README.md) 我们支持：

- Baidu (Web)
- Bing (Web)
- DuckDuckGO (Lite & Web)

## 人格预设

从 `1.0.0-alpha.10` 版本开始，我们使用更加可定制化的人格预设。新的人格预设使用 yaml 做为配置文件。

你可以点这里来查看我们默认附带的人格文件：[catgirl.yml](/packages/core/resources/presets/catgirl.yml)

我们默认的预设文件夹路径为 `你当前运行插件的 koishi 目录的路径+/data/chathub/presets`。

所有的预设文件都是从上面的文件夹上加载的。因此你可以自由添加和编辑预设文件在这个文件夹下，然后使用命令来切换人格预设。

如需了解更多，可查看[此文档](https://chatluna.dingyi222666.top/guide/preset-system/introduction.html)。

## 需要帮助

目前 ChatLuna 项目组产能极为稀缺，没有更多产能来完成下面的目标

- [ ] Web UI
- [ ] Http Server
- [ ] Project Documentation

欢迎提交 Pull Request 或进行讨论，我们非常欢迎您的贡献！

## 贡献者名单

<a href="https://github.com/ChatLunaLab/chatluna/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ChatLunaLab/chatluna" />
</a>

![Alt](https://repobeats.axiom.co/api/embed/6996e228e38a44a28ed2629b667ef87a729f12ae.svg "Repobeats analytics image")

[![Star History Chart](https://api.star-history.com/svg?repos=ChatLunaLab/chatluna&type=Date)](https://star-history.com/#ChatLunaLab/chatluna)

## 感谢

本项目在编写时也参考了其他的开源项目，特别感谢以下项目：

[koishi-plugin-openai](https://github.com/TomLBZ/koishi-plugin-openai)

[node-chatgpt-api](https://github.com/waylaidwanderer/node-chatgpt-api)

[poe-api](https://github.com/ading2210/poe-api)

[Bard](https://github.com/muhiris/wgpt)

[chathub](https://github.com/chathub-dev/chathub)
