import cloud from './cloud';
var layout = cloud()
    .size([200, 200])
    .words(`这根本就 不好玩 代码代码 码农码农 卧槽了 这啥呀 有人吗 rollup react17 vue3 angular
    `.split(' ').map(function(d) {
      return {text: d, size: 10 + Math.random() * 90};
    }))
    .padding(0)
    .rotate(0)
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw).start();
console.log(layout.size())
  // function draw(words) {
  //   d3.select("body").append("svg")
  //       .attr("width", layout.size()[0])
  //       .attr("height", layout.size()[1])
  //     .append("g")
  //       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  //     .selectAll("text")
  //       .data(words)
  //     .enter().append("text")
  //       .style("font-size", function(d) { return d.size + "px"; })
  //       .style("font-family", "Impact")
  //       .attr("text-anchor", "middle")
  //       .attr("transform", function(d) {
  //         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  //       })
  //       .text(function(d) { return d.text; });
  // }
    
function draw (words) {
  console.log(words)
  const el = document.querySelector('#app')
  words.forEach(i => {
    const curEl = document.createElement('div')
    const { text, width, height, x, x0, x1, xoff, y, y0, y1, yoff, size, rotate } = i
    curEl.textContent = text
    curEl.classList.add('word-cloud-item')
    curEl.style.fontSize = size / 2.5 + 'px'
    curEl.style.fontFamily = 'Impact'
    curEl.style.transform = `translate(${250 + x}px,${250 + y}px) rotate(${rotate}deg)`
    // curEl.style.width = width + 'px'
    // curEl.style.height = height + 'px'
    console.log(x, y)
    console.log(x0, y0)
    console.log(x1, y1)

    el.appendChild(curEl)
  });
}