# Web

1. url 中 `#` 后的内容称为 `hash`, 其不会被发送到服务器, 但是可以被浏览器使用.
   1. 当服务器限制了 url 的长度时, 可以使用 `hash` 传递参数.
2. package-lock.json 不应存储到 git 中。
	1. 当依赖库区分运行平台时，lock文件会把依赖库锁定在某一个平台，导致其他平台无法运行。
	2. https://github.com/SavageCore/node-ffprobe-installer/issues/274
	3. https://github.com/npm/cli/issues/4828