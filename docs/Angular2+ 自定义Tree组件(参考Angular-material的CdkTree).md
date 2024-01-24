---
title: Angular2+ 自定义Tree组件(参考Angular-material的CdkTree)
date: 2019-06-02 21:44:52
tags:
  - 研究
  - Angular2
  - Tree
categories:
  - Angular2
toc: true
---


**为了方便, 本文所有的`Angular`均表示Angula2及以上版本，对于使用`Angular1`/`Angular.js`的读者可作为参考**

## 前言
目前正在写一个`Angular`的`Markdown`编辑器，需要一个树形组件来写文件系统。刚好之前用过`Angular Material`的[树形组件](https://material.angular.cn/cdk/tree/overview)，就想照着写一个。毕竟直接把`Angular Material`引进来会多出其他用不到的组件，而且自己实现还能更深入学习`Angular`。

## 介绍
在写之前我百度了一通，发现大部分文章的Tree组件实现都是把节点模板直接写在了组件里，类似下面

```html
<!--Tree组件-->
<tree>
    <tree-node></tree-node>
</tree>
<!--TreeNode组件-->
<tree-node>
    <!--本节点内容-->
    {{ nodeName }}
    <!--子节点-->
    <tree-node *ngIf="hasChildren">
    </tree-node>
<tree-node>
```
说明一下: `Tree`组件里面包含`TreeNode`组件，`TreeNode`组件内部实现了递归子节点的逻辑。  
其实这样的结构已经足够满足我的需求了，但是（因为强迫症）这样的可重用性几乎是没有，因为节点的内容已经写死在`TreeNode`组件里了。  
然后我想到了`Angular Material`的`CdkTree`。他的结构如下
```html
<tree dataSource="ds">
    <tree-node>
        <!--本节点内容-->
        {{ nodeName }}
        <!--子节点出口-->
        <outlet></outlet>
    </tree-node>
</tree>
```
说明: 简单的说就是`CdkTree`把`<tree-node>`里的内容作为一个模板保存起来，然后根据数据源递归渲染出来。这样我们就可以在不修改`Tree`和`TreeNode`组件前提下改变其内容。

## 实现
在实现之前需要理解`Angular`的几个装饰器，学过`Angular`的应该都不会陌生。
* `@ViewChild`          - 在视图中查询匹配的第一个元素
* `@ViewChildren`       - 在视图中查询匹配的所有元素
* `@ContentChild`       - 在组件标签包裹的内容中查询匹配的第一个元素
* `@ContentChildren`    - 在组件标签包裹的内容中查询匹配的所有元素

**View和Content的区别**  
View: 在组件的模板中定义的内容，即我们手动写在xxx.component.html里的内容
Content: 在`Host`元素的`<opening>`和`<closeing>`标签中的内容

## 概览
在Tree组件中有四个比较重要的类
* `@Component: TreeComponent`
* `@Component: TreeNodeComponent`
* `@Directive: TreeNodeOutletDirective`
* `@Directive: TreeNodeDefDirective`

### TreeComponent
该组件就是我们要是实现的`Tree`组件，用于包裹`TreeNode`
### TreeNodeComponent
树节点组件，我们自定义的模板就写在这里面
### TreeNodeOutletDirective
这个指令设置了子节点的出口位置
### TreeNodeDefDirective
这个指令用来定义树节点所需的数据，即我们使用这个指令让模板可以使用每个树节点对应的数据

## 实现
我们先看一下完成后的样子
```html
<nb-tree [dataSource]="fileTree">
    <nb-tree-node *nbTreeNodeDef="let data = data">
        <li>
          <span>{{ data.title }}</span>
        </li>
        <ul>
          <ng-container nbTreeNodeOutlet></ng-container>
        </ul>
    </nb-tree-node>
</nb-tree>
```
（标签前面的nb请忽略，这只是默认的前缀）上面是完成后的简易版。
我们可以看到在`tree`组件上设置了`dataSource`。

然后在`treeNodeDef`指令中我们导出了数据对象`data`。然后在模板中使用了它`<span>{{ data.title }}</span>`。

最后我们在`<ng-container>`上用`treeNodeOutlet`指令设置了子节点的出口。
懒得详细写实习了。。。有空再写吧。本文主要提供一个通用树形组件的思路。

想看代码的，看结尾。有一个不是很完善的`tree`组件，我用在正在写的Markdown编辑器上了。
## 结尾
Github: [`tree`组件链接](https://github.com/abc1310054026/ngr2-markdown/tree/master/projects/ngr2-markdown/src/lib/tree)
