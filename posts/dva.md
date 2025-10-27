---
title: dva使用
date: 2023-09-18
description: 不知冬寒，不知春暖
category: React
tags:
  - React
  - 其他
---

## dva 简介

    拿出dva官网给出的简介 ---dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，
    所以也可以理解为一个轻量级的应用框架。

## dva 的在项目中的使用

```javascript
// 首先我们会创建一个modal.js的文件来存放我们要共享的数据
export default {
  namespace: 'Modal',
  state: {
    count: 0,
  },
  reducers: {
    changeCount(state, { payload }) {
      return {
        ...state,
        count: payload,
      };
    },
  },
  effects: {
    // 当前定义的方法如果经过多次触发会取最后一次dispatch
    changeCount: [
      function* ({ payload }, { call, select, put }) {
        // TODO
      },
      { type: 'takeLatest' },
    ],
  },
};
```
