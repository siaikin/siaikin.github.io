---
title: HTML逆向生成Markdown -- Part 2
date: 2019-07-25 11:21:00
tags:
  - 研究
  - Markdown
  - Markdown解析
categories:
  - Markdown
toc: true
---

# HTML逆向生成Markdown -- Part 2
接上一篇[HTML逆向生成Markdown -- Part 1](/2019/06/02/HTML逆向生成Markdown-Part-1/)

在前文的结尾，我们已经将HTML文本处理为一个个虚拟DOM节点（JSON对象）了。

为了方便之后的处理，新增加了两个表示结束标签的节点，以方便构建DOM树。
```javascript
const result = [
    {
        tag: 'h2',
        type: 42,           // 不要在意`type`属性，这是自定义的，42代表`h2`元素对应数字
        position: 1
    },
    {
        tag: 'textNode',
        type: 1,
        position: 3,
        content: '逆向解析HTMl'
    },
    {
        tag: 'h2',
        type: 42,
        position: 2
    },
    {
        tag: 'p',
        type: 6,
        position: 1
    },
    {
        tag: 'a',
        type: 2,
        position: 1,
        attr: {
            href: 'https://www.baidu.com'
        }
    },
    {
        tag: 'textNode',
        type: 1,
        position: 3,
        content: 'Markdown'
    },
    {
        tag: 'a',
        type: 2,
        position: 2
    },
    {
        tag: 'p',
        type: 6,
        position: 2
    },
]
```

## 构建虚拟DOM树

我们已经用`position`属性标识了开始/结尾标签和文本节点，我们知道在开始和结束标签之间的节点都属于该节点的子节点。
以此类推，就表示出一颗DOM树了。
以上文的节点数组为输入我们来尝试构建一个虚拟DOM树。

1. 第一个是h2标签且为开始标签
```javascript
[
    {
        tag: 'h2',
        type: 42
    }
]
```
2. 第二个是文本节点
```javascript
[
    {
        tag: 'h2',
        type: 42,
        child: [
            {
                tag: 'textNode',
                type: 1,
                content: '逆向解析HTMl'
            }
        ]
    }
]
```

3. 第三个是h2的结束标签，结束标签不会改变树的结构。结束标签表示之后的节点都不是该节点的子节点。（**在代码层面上来说就是回退到父节点上，之后在添加节点就是添加到父节点的子节点数组中**）
```javascript
[
    {
        tag: 'h2',
        type: 42,
        child: [
            {
                tag: 'textNode',
                type: 1,
                content: '逆向解析HTMl'
            }
        ]
    }
]
```
4. 第四个是p的开始标签。因为h2已经结束了，所以p被添加到根节点上。
```javascript
[
    {
        tag: 'h2',
        type: 42,
        child: [
            {
                tag: 'textNode',
                type: 1,
                content: '逆向解析HTMl'
            }
        ]
    },
    {
        tag: 'p',
        type: 6
    }
]
```
5. 第五个是a的开始标签，因为上一个是p的开始标签，所以a被添加到p的子节点中
```javascript
[
    {
        tag: 'h2',
        type: 42,
        child: [
            {
                tag: 'textNode',
                type: 1,
                content: '逆向解析HTMl'
            }
        ]
    },
    {
        tag: 'p',
        type: 6,
        child: [
            {
                tag: 'a',
                type: 2,
                attr: {
                    href: 'https://www.baidu.com'
                }
            }
        ]
    }
]
```
6. 第六个是文本节点，同理被添加到a的子节点中。
```javascript
[
    {
        tag: 'h2',
        type: 42,
        child: [
            {
                tag: 'textNode',
                type: 1,
                content: '逆向解析HTMl'
            }
        ]
    },
    {
        tag: 'p',
        type: 6,
        child: [
            {
                tag: 'a',
                type: 2,
                attr: {
                    href: 'https://www.baidu.com'
                },
                child: [
                    {
                        tag: 'textNode',
                        type: 1,
                        position: 3,
                        content: 'Markdown'
                    }
                ]
            }
        ]
    }
]
```
7. 之后的两个都是结束标签，树结构也不会发生变化。

最终，我们得到的是这样一个DOM树结构：
```javascript
const  result = [
    {
        tag: 'h2',
        type: 42,
        child: [
            {
                tag: 'textNode',
                type: 1,
                content: '逆向解析HTMl'
            }
        ]
    },
    {
        tag: 'p',
        type: 6,
        child: [
            {
                tag: 'a',
                type: 2,
                attr: {
                    href: 'https://www.baidu.com'
                },
                child: [
                    {
                        tag: 'textNode',
                        type: 1,
                        position: 3,
                        content: 'Markdown'
                    }
                ]
            }
        ]
    }
]
```

到这一步，我们已经将HTML文本转化成了虚拟DOM树。最后也是最关键的一步，就是分析DOM树，根据MD规则生成MD文本了。
可以说之前的三个步骤都是为了最后一步服务的。
