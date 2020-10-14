import "./styles/index.css";
import { fetchAzaveaData, fetchHistAzaveaData } from "./scripts/fetch_util";
import Chart from './scripts/chart';
import * as d3 from "d3";


new Chart([]);

const form = document.querySelector('.form');
// let res;
let formattedData = [];
form.addEventListener('submit', e => {
  e.preventDefault();
  formattedData = [];
  const data = new FormData(e.target);
  const obj = {};
  for (let key of data.keys()) {
    obj[key] = data.get(key);
  }
  const { city, scenario, indicator } = obj;
  fetchHistAzaveaData(city, indicator)
    .then(res => {
      Object.keys(res).forEach(key => {
        formattedData.push(Object.assign({}, { 'year': key }, res[key]));
      });
      fetchAzaveaData(city, scenario, indicator)
        .then(res => {
          Object.keys(res).forEach(key => {
            formattedData.push(Object.assign({}, {'year': key}, res[key]));
          });
          console.log(formattedData);
          console.log(d3.max(formattedData.map(d => d.avg)));
          const chart = new Chart(formattedData);
        });
    });
});


// console.log(d3);