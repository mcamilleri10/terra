import "./styles/index.css";
import { fetchAzaveaData, fetchHistAzaveaData } from "./scripts/fetch_util";
import Chart from './scripts/chart';
import * as d3 from "d3";


// new Chart([]);

const form = document.querySelector('.form');
// let res;
let formatted45Data = [];
let formatted85Data = [];
form.addEventListener('submit', e => {
  e.preventDefault();
  formatted45Data = [];
  formatted85Data = [];
  const data = new FormData(e.target);
  const obj = {};
  for (let key of data.keys()) {
    obj[key] = data.get(key);
  }
  const { city, scenario, indicator } = obj;
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
          console.log(formatted45Data);
          console.log(d3.max(formatted45Data.map(d => d.avg)));
          fetchAzaveaData(city, 'RCP85', indicator)
            .then(res => {
              Object.keys(res).forEach(key => {
                formatted85Data.push(Object.assign({}, {'year': key}, res[key]));
              });
              console.log(formatted85Data);
              console.log(d3.max(formatted85Data.map(d => d.avg)));
              new Chart(formatted45Data, formatted85Data);
              console.log('done');
            });
          });
        });
});


// console.log(d3);