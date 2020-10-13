import { keys } from '../config/keys';

const azaveaAuth = {
  headers: {
    Authorization: `Token ${keys.azaveaAPI}`
  }
};


export const fetchAzaveaData = (city, scenario, indicator) => {
  return fetch(`https://app.climate.azavea.com/api/climate-data/${city}/${scenario}/indicator/${indicator}/`, azaveaAuth)
    .then(res => res.json())
    .then(res => res.data);
};
