## 背景

cron service 作为一个自动化的脚本执行服务，需要记录脚本的修改记录以便存档历史记录和排查问题。git 作为开发人员最常用的版本控制工具自然是首选。因此，我找到了 go-git。

> [go-git](https://github.com/go-git/go-git)：纯 Go 语言的高度可扩展 Git 实现。

令人遗憾的是，go-git 并未给出任何关于 git 服务端的示例，这对那时仅使用过 git 客户端的我来说可谓一头雾水。幸运的是，在 issue 列表中我找到了跟我有同样想法的人 [Need an example of creating a git server using go-git](https://github.com/go-git/go-git/issues/234) 在其中评论的帮助下我能够成功的创建一个支持拉取请求服务。但是我还需要支持推送。

为此我阅读了[Git 内部原理 - 传输协议](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE) 该章节的内容帮助我了解了 git 在推送/拉取时发生了什么，同时我也模糊的知道了自己应该如何基于 go-git 来实现推送服务。
> 实际上直到现在我也不完全了解 git 的工作方式。但是这无所谓了，对于我的需求我已经成功了。

## Git 如何