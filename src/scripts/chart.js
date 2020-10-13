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
    this.margin = {top: 50, right: 75, bottom: 50, left: 75};

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
    const xExtent = [0, 250];
    const yExtent = [0, d3.max(this.data.map(d => d.avg))];
  }

  addAxes() {

  }

  addLine() {

  }

}