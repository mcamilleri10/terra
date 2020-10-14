import * as d3 from "d3";


// const svg = d3.select('#chart-container')
//   .append('svg')
//     .attr('width', 650)
//     .attr('height', 450)
//     .append('g')
//     .attr('transform', "translate(30, 50)");

// export const createAreaChart = data => {
  
//   const x = d3.scaleTime()
//     .domain([0, 150]) // years
//     .range([0, 650]); // width
//   svg.append('g')
//     .attr('transform', "translate(0, 450)") // height
//     .call(d3.axisBottom(x));

//   const max = d3.max(data, d => d.avg);
//   const y = d3.scaleLinear()
//     .domain([0, max])
//     .range([450, 0]); // height
//   svg.append('g')
//     .call(d3.axisLeft(y));

//   svg.append('path')
//     .datum(data)
//     .attr('fill', '#0000ff')
//     .attr('stroke', '#000')
//     .attr('stroke-width', 2)
//     .attr('d', d3.area()
//       .x())

// };

export default class Chart {

  constructor(lowData, highData) {
    this.lowData = lowData;
    this.highData = highData;
    this.element = document.getElementById('chart-container');
    this.createChart();
  }

  createChart() {
    this.width = 650;
    this.height = 450;
    this.margin = {top: 50, right: 75, bottom: 50, left: 30};

    this.element.innerHTML = '';
    const svg = d3.select(this.element)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.plot = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.createScales();
    this.addAxes();
    this.addLine(this.highData, 'red'); // SET TIMEOUT 5s?
    this.addLine(this.lowData, 'rgb(0, 0, 99)');
  }

  createScales() {
    const lowMap = this.lowData.map(d => d.avg);
    const highMap = this.highData.map(d => d.avg);
    const map = lowMap.concat(highMap);
    const max = d3.max(map);
    const min = d3.min(map);
    const margin = this.margin;
    const xExtent = [1950, 2100];
    const yExtent = [min - min/20, max + max/20];
    if (yExtent[0] < 0) yExtent[0] = 0;
    this.xScale = d3.scaleLinear()
      .range([0, this.width - margin.right])
      .domain(xExtent);
    this.yScale = d3.scaleLinear()
      .range([this.height - (margin.top + margin.bottom), 0])
      .domain(yExtent);
  }

  addAxes() {
    const margin = this.margin;
    const xAxis = d3.axisBottom()
      .scale(this.xScale)
      .ticks(15)
      .tickFormat(d3.format('d'));
    const yAxis = d3.axisLeft()
      .scale(this.yScale);
    this.plot.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height - (margin.top + margin.bottom)})`)
      .call(xAxis);
    this.plot.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  }

  addLine(data, color) {
    let avg = data.map(d => d.avg);
    if (avg < 0) avg = 0;
    const line = d3.line()
      .x(d => this.xScale(d.year))
      .y(d => this.yScale(d.avg));
    const path = this.plot.append('path')
      .datum(data)
      .classed('line', true)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('d', line)
      .transition()
      .duration(5000)
      .ease(d3.easeLinear)
      .attrTween("stroke-dasharray", () => {
        const length = path.node().getTotalLength();
        return d3.interpolate(`0,${length}`, `${length},${length}`);
      });
  }

}