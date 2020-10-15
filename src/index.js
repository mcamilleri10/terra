import "./styles/index.css";
import { fetchAzaveaData, fetchHistAzaveaData } from "./scripts/fetch_util";
import { changeIndicatorInfoText, indicatorError } from './scripts/indicator_info';
import Chart from './scripts/chart';
import * as d3 from "d3";


new Chart([], []); 

const form = document.querySelector('.form');
const submit = document.querySelector('#submit');
let formatted45Data = [];
let formatted85Data = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchAndFormatData(1, 'average_high_temperature');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  formatted45Data = [];
  formatted85Data = [];
  const data = new FormData(e.target);
  const obj = {};
  for (let key of data.keys()) {
    obj[key] = data.get(key);
  }
  const { city, indicator } = obj;
  fetchAndFormatData(city, indicator);
});

const fetchAndFormatData = (city, indicator) => {
  changeIndicatorInfoText('loading');
  submit.disabled = true;
  fetchHistAzaveaData(city, indicator)
    .then(res => {
      Object.keys(res).forEach(key => {
        formatted45Data.push(Object.assign({}, { 'year': key }, res[key]));
        formatted85Data.push(Object.assign({}, { 'year': key }, res[key]));
      });
      fetchAzaveaData(city, 'RCP45', indicator)
        .then(res => {
          Object.keys(res).forEach(key => {
            formatted45Data.push(Object.assign({}, {'year': key}, res[key]));
          });
          // console.log(formatted45Data);
          // console.log(d3.max(formatted45Data.map(d => d.avg)));
          fetchAzaveaData(city, 'RCP85', indicator)
            .then(res => {
              Object.keys(res).forEach(key => {
                formatted85Data.push(Object.assign({}, {'year': key}, res[key]));
              });
              // console.log(formatted85Data);
              // console.log(d3.max(formatted85Data.map(d => d.avg)));
              // console.log('done');
              new Chart(formatted45Data, formatted85Data);
              changeIndicatorInfoText(indicator);
              setTimeout(() => submit.disabled = false, 5000);
            });
        });
    });
};