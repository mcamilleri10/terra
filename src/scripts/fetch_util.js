import keys from '../config/keys';

const azaveaAuth = {
  headers: {
    Authorization: `Token ${keys.azaveaAPI}`
  }
};


// export const r85data = (city, indicator) => {
//   return fetch(`https://app.climate.azavea.com/api/climate-data/${city}/RCP85/indicator/${indicator}/`, azaveaAuth)
//     .then(res => res.json())
//     .then(res => console.log(res));
// };

// export const histData = (city, indicator) => {
//   return fetch(`https://app.climate.azavea.com/api/climate-data/${city}/historical/indicator/${indicator}/`, azaveaAuth)
//     .then(res => res.json())
//     .then(res => console.log(res));
// };

export const fetchAzaveaData = (city, scenario, indicator) => {
  return fetch(`https://app.climate.azavea.com/api/climate-data/${city}/${scenario}/indicator/${indicator}/`, azaveaAuth)
    .then(res => res.json())
    .then(res => console.log(res));
};
