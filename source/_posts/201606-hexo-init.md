---
title: 使用Hexo建立博客
date: 2016-06-23 09:24:24
categories: [Html]
tags: [Hexo,Html]
---

>如何用Hexo创建自己的博客

## 准备
安装之前你可能需要阅读下面这些资料
[Hexo文档](https://hexo.io/zh-cn/docs/index.html)
[NexT文档](http://theme-next.iissnan.com/)
[Markdown文档](http://wowubuntu.com/markdown/)

## 安装Node.js
[Node.js](https://nodejs.org/en/)

<!-- more -->

## 安装git
[git](https://git-scm.com/)
把git安装目录下的cmd文件夹路径添加到系统环境变量(windows)

## 安装cnpm
Node.js自带的npm容易被墙，安装[cnpm](http://npm.taobao.org/)代替npm

    npm install -g cnpm --registry=https://registry.npm.taobao.org

## 安装Hexo
    cnpm install -g hexo-cli

## 初始化网站目录
    hexo init {Your_Folder}

## 开启网页测试
    cd {Your_Folder}
    hexo server
访问<http://localhost:4000/>
若页面能正常显示，则安装成功

