import "./styles/index.css";
import { fetchAzaveaData } from "./scripts/fetch_util";
import { chart } from './scripts/chart';
import * as d3 from "d3";

const form = document.getElementById('form');
let res;
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
  res = fetchAzaveaData(city, scenario, indicator)
    .then(res => {
      Object.keys(res).forEach(key => {
        formattedData.push(Object.assign({}, {'year': key}, res[key]));
      });
      console.log(formattedData);
      console.log(d3.max(formattedData.map(d => d.avg)));
    });
});


console.log(d3);