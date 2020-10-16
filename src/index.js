import "./styles/index.css";
import { fetchAzaveaData, fetchHistAzaveaData } from "./scripts/fetch_util";
import { changeIndicatorInfoText, indicatorError } from './scripts/indicator_info';
// import { initMap } from './scripts/map';
import Chart from './scripts/chart';
import * as d3 from "d3";


// new Chart([], []); 

const form = document.querySelector('.form-nci');
const submit = document.querySelector('#submit');
let formatted45Data = [];
let formatted85Data = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchAndFormatData(1, 'average_high_temperature');
  // initMap();
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
      const coords = res.city.geometry.coordinates;
      Object.keys(res.data).forEach(key => {
        formatted45Data.push(Object.assign({}, { 'year': key }, res.data[key]));
        formatted85Data.push(Object.assign({}, { 'year': key }, res.data[key]));
      });
      fetchAzaveaData(city, 'RCP45', indicator)
        .then(res => {
          Object.keys(res.data).forEach(key => {
            formatted45Data.push(Object.assign({}, {'year': key}, res.data[key]));
          });
          fetchAzaveaData(city, 'RCP85', indicator)
            .then(res => {
              Object.keys(res.data).forEach(key => {
                formatted85Data.push(Object.assign({}, {'year': key}, res.data[key]));
              });
              initMap(coords[0], coords[1]);
              new Chart(formatted45Data, formatted85Data, indicator);
              changeIndicatorInfoText(indicator);
              setTimeout(() => submit.disabled = false, 5000);
            });
        });
    });
};

let map;
window.initMap = (lng, lat) => {
  if (typeof lng === 'undefined' || lng === -75.4999) lng = -73.990286;
  if (typeof lat === 'undefined' || lat === 43.00035) lat = 40.736241;
  const mapContainer = document.querySelector("#map");
  map = new google.maps.Map(mapContainer, {
    center: { lat: lat, lng: lng },
    zoom: 10
  });
};

// -73.990286 40.736241