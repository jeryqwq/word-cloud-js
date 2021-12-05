##  3D词云图


File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    66.67 |       40 |    71.43 |    68.42 |                   |
 utils.ts |    66.67 |       40 |    71.43 |    68.42 | 20,21,22,23,24,25 |


### 纯js开发，无任何第三方依赖
### 基于函数式编程，可在原库上追加自己的业务
### 扩展性强，可自定义追加动画和其他数据
### TS构建，丰富的测试用例
### API
### 数据格式
默认配置：
```ts
const config = {
  el: document.querySelector('#app'),
  data: [
    {
      name: 'node1',
      value: 'node1',

    }
    ...
  ],
  config: {
    fontSizeRange: [12, 24],
    renderFn?:() => HTMLELEMENT | HTMLString,
    speed: 50,
    ...
  },
  lifeCycle: {
    beforeSacn: ({item, index, instance}) => ({item, index, instance}),
    afterScan: ({item, index, instance}) => ({item, index, instance}),
    effect: ({item, index, instance}) => void
  }
}
```