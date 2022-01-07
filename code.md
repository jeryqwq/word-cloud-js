### 代码结构
helper: 辅助函数
  constant: 常量
  genItem: 生成canvas， dom节点函数
  utils： 各种工具函数，节流， compos， 阿基米德螺线方程， 检测位置冲突， 添加css样式。。。
### 钩子函数
` animates, effets, finally,scans里面都是钩子函数，存放滚动模式和普通模式的各自需要执行的内容
 `
 <br>
执行顺序:
* scans: 数据流向， 每一个函数都会按照对应的顺序将返回的参数流向下一个函数， 记录词云的其他数据，比如： 占比，位置相关信息等   compos([() => 3, (3) => 3 + 2, (5) => 5*5])    最终拿到25
* effect：每一个词云图scan后会调用对应的effect函数， 渲染词图颜色，和tooltip， 注册事件等
* animates: 使用requestAnimateFrame函数在每次的动画帧后都会执行一次内部函数
* finally: 全部执行完成后异步回调函数，下一个红任务执行
### 入口
index.ts
init: 初始化词云图实例， 根据渲染的模式合并并匹配对应的执行钩子， 调用trigger函数执行所有的钩子

### WordChart.js
词云图类，存放词云图所有的状态和需要调用的函数， 如： 激活tooltip

