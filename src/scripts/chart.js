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

  constructor(data) {
    this.data = data;
    this.element = document.getElementById('chart-container');
    this.createChart();
  }

  createChart() {
    this.width = 650;
    this.height = 450;
    this.margin = {top: 50, right: 75, bottom: 50, left: 25};

    this.element.innerHTML = '';
    const svg = d3.select(this.element)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.plot = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.createScales();
    this.addAxes();
    this.addLine();
  }

  createScales() {
    const margin = this.margin;
    const xExtent = [1950, 2100];
    const yExtent = [0, d3.max(this.data.map(d => d.avg))];
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
      // .ticks(d3.max(this.data.map(d => d.avg)));
      // .tickFormat(d3.format("d"));
    this.plot.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height - (margin.top + margin.bottom)})`)
      .call(xAxis);
    this.plot.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  }

  addLine() {
    const line = d3.line()
      .x(d => this.xScale(d.year))
      .y(d => this.yScale(d.avg));
    this.plot.append('path')
      .datum(this.data)
      .classed('line', true)
      .attr('d', line)
      .style('stroke', 'blue');
  }

}