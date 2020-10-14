import { keys } from '../config/keys';
import { indicatorError } from '../scripts/indicator_info';

const azaveaAuth = {
  headers: {
    Authorization: `Token ${keys.azaveaAPI}`
  }
};


export const fetchHistAzaveaData = (city, indicator) => {
  return fetch(`https://app.climate.azavea.com/api/climate-data/${city}/historical/indicator/${indicator}/`, azaveaAuth)
    .then(res => res.json())
    .then(res => res.data)
    .catch(indicatorError);
};

export const fetchAzaveaData = (city, scenario, indicator) => {
  return fetch(`https://app.climate.azavea.com/api/climate-data/${city}/${scenario}/indicator/${indicator}/`, azaveaAuth)
    .then(res => res.json())
    .then(res => res.data);
};

