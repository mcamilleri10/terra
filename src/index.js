import "./styles/index.css";
import { fetchAzaveaData } from "./scripts/fetch_util";


console.log(keys.azaveaAPI);

document
  .getElementById('r85-btn')
  .addEventListener('click', () => r85data(1, 'average_high_temperature'));

document
  .getElementById('hist-btn')
  .addEventListener('click', () => histData(1, 'average_high_temperature'));


const city = document.getElementById('city');


// city.addEventListener('change', () => histData(city.value, 'average_high_temperature'));



const form = document.getElementById('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const obj = {};
  for (let key of data.keys()) {
    obj[key] = data.get(key);
  }
  const { city, scenario, indicator } = obj;
  console.log(city);
  console.log(scenario);
  console.log(indicator);
  fetchAzaveaData(city, scenario, indicator);
});