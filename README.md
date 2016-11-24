# fullscroller

demo地址：https://roonie1.github.io/fullscroller/

## 参数列表

```
  {
    className: 'block',//类名
    callback: null,//每滚动一屏的回调函数
    initHeight: 0,
    position: 0
  }
```

initHeight：表示初始的高度，如果没有，会获取组件距离窗口顶部的距离。
position：表示每次切换一屏时需要滚动的距离，如果没有，会根据屏数算一个值。

```
if (position == 0) {
   position = ((number - 1) * height - 100 * (number)) / number;
}

```
## 使用方法 

```
  $(".sec").fullscroll({
    className: "block"
  });
```
