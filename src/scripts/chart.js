import * as d3 from "d3";
import { yAxisLabel } from './chart_axis_label';

export default class Chart {

  constructor(lowData, highData, indicator) {
    this.lowData = lowData;
    this.highData = highData;
    this.indicator = indicator;
    this.element = document.getElementById('line-chart');
    this.createChart();
  }

  createChart() {
    this.width = 650;
    this.height = 450;
    this.margin = {top: 20, right: 75, bottom: 50, left: 50};

    this.element.innerHTML = '';
    this.svg = d3.select(this.element)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.plot = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.createScales();
    this.addAxes();
    this.addLine(this.lowData, 'green');
    this.addLine(this.highData, 'rgb(0, 0, 99)');
  }

  createScales() {
    const lowMap = this.lowData.map(d => d.avg);
    const highMap = this.highData.map(d => d.avg);
    const map = lowMap.concat(highMap);
    const max = d3.max(map);
    const min = d3.min(map);
    const margin = this.margin;
    const xExtent = [1950, 2100];
    let yExtent;
    if (min >= 0) {
      yExtent = [min - min/20, max + max/20];
    } else {
      yExtent = [min + min / 20, max + max / 20];
    }
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
      // .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height - (margin.top + margin.bottom)})`)
      .call(xAxis);
    this.svg.append('text')
      .attr('class', 'x-axis')
      .attr('x', this.width - 335)
      .attr('y', this.height - 12)
      .style('text-anchor', 'middle')
      .text('Year');
    this.plot.append('g')
      // .attr('class', 'y axis')
      .call(yAxis);
    this.svg.append('text')
      .attr('class', 'y-axis')
      .attr('transform', 'rotate(-90)')
      .attr('x', this.width - 870)
      .attr('y', this.height - 430)
      .style('color', 'orange')
      .style('text-anchor', 'middle')
      .text(yAxisLabel(this.indicator));
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