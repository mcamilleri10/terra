import "./styles/index.css";
import { fetchAzaveaData, fetchHistAzaveaData } from "./scripts/fetch_util";
import { changeIndicatorInfoText } from './scripts/indicator_info';
import Chart from './scripts/chart';



let form = document.querySelector('.form-nci');
let submit = document.querySelector('#submit');
let formatted45Data = [];
let formatted85Data = [];

// create chart on initial load
document.addEventListener('DOMContentLoaded', () => {
  fetchAndFormatData(1, 'average_high_temperature');

  form = document.querySelector('.form-nci');
  submit = document.querySelector('#submit');
  formatted45Data = [];
  formatted85Data = [];
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

// google map
let map;
window.initMap = (lng, lat) => {
  if (typeof lng === 'undefined' || lng === -75.4999) lng = -73.990286;
  if (typeof lat === 'undefined' || lat === 43.00035) lat = 40.736241;
  const mapContainer = document.querySelector("#map");
  map = new google.maps.Map(mapContainer, {
    center: { lat, lng },
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    disableDefaultUI: true
  });
};

// modal
const btn = document.querySelector('.modal-open-container');
const modalOverlay = document.querySelector('.modal-overlay');
const close = document.querySelector('.modal-close');

btn.addEventListener('click', () => {
  modalOverlay.style.display = 'block';
});

close.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modalOverlay) modalOverlay.style.display = 'none';
});