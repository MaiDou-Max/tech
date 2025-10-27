---
title: React Hooks 最佳实践
date: '2023-04-20'
description: 学习如何有效地使用React Hooks
category: React
tags:
  - React
  - 其他
---

# React Hooks 最佳实践

React Hooks 是 React 16.8 中引入的新特性，它让你可以在不编写 class 的情况下使用 state 以及其他的 React 特性。

## useState 示例

```typescript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  );
}
```

## useEffect 示例

```typescript
import { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState<number>(0);

  // 类似于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `你点击了 ${count} 次`;
  });

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  );
}
```

## 自定义 Hook

```typescript
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```
