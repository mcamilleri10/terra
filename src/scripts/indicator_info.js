export const changeIndicatorInfoText = indicator => {
  const p = document.querySelector('.indicator-info');
  p.classList.remove('red');
  p.innerHTML = '';
  switch (indicator) {
    case 'loading':
      p.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
      break;
    case 'average_high_temperature':
      p.innerHTML = 'Average High Temperature is calculated by aggregating daily average high   temperatures. It is an appropriate metric for probable long term temperature trends.';
      break;
    case 'average_low_temperature':
      p.innerHTML = 'Average Low Temperature is calculated by aggregating daily average low temperatures. It is an appropriate metric for probable long term temperature trends.';
      break;
    case 'total_precipitation':
      p.innerHTML = 'Total Precipitation returns the summed precipitation volume ranging the user-specified period of time. It is an appropriate first-pass metric for probable long term precipitation trends. Total precipitation is broad because it waters down information on precipitation event intensity, particularly the longer the period of time.';
      break;
    case 'extreme_precipitation_events':
      p.innerHTML = 'Extreme Precipitation Events counts the number of times total daily precipitation exceeds the specified percentile of total historic daily precipitation. The percentile defaults to 99. This indicator is useful to understand future heavy precipitation and inform resource planners of changes to prepare for.';
      break;
    case 'extreme_cold_events':
      p.innerHTML = 'Extreme Cold Events counts the total times the daily average minimum temperature is below some percentile of historic observations. The percentile defaults to 1, referring to the coldest percentile of historic daily temperatures. It is an appropriate indicator for understanding deviations from normal climatic extremes.';
      break;
    case 'extreme_heat_events':
      p.innerHTML = 'Extreme Heat Events counts the total times the daily average maximum temperature is above some percentile of historic observations. The percentile defaults to 99, referring to the hottest percentile of historic daily temperatures. It is an appropriate indicator for understanding deviations from normal climatic extremes.';
      break;
    case 'heat_wave_incidents':
      p.innerHTML = 'Heat Wave Incidents counts the days the daily high temperature exceeds 5˚C above historic average high temperature norms for at least 5 consecutive days. This indicator is closely paired with heat wave duration index and, similarly, provides a concrete and palpable metric to the impacts of global warming. Frequency, duration, and intensity predictions of heat waves are very important for health and emergency services planning.';
      break;
    case 'heat_wave_duration_index':
      p.innerHTML = 'The Heat Wave Duration Index (HWDI) measures the maximum period of at least 5 consecutive days with daily high temperature greater than 5˚C above historic average high temperature norms. If the historic norm was 85˚F, a period of 6 consecutive days with maximum daily temperatures above 94˚F (5˚C = 9˚F) would register at 1 on the HWDI. This indicator provides a more specific and nuanced look at the extent and intensity of warming than average high temperature or even extreme heat events. It is closely related to heat wave incidents.';
      break;
    case 'dry_spells':
      p.innerHTML = 'Dry Spells counts the total number of times per user-specified period that there are 5 or more consecutive days without precipitation. This indicator is useful to understand future drought patterns and inform resource planners of changes to prepare for.';
      break;
    case 'diurnal_temperature_range':
      p.innerHTML = 'Diurnal Temperature Range (DTR) is the average difference between the maximum temperature and minimum temperature in a day. It measures how much it heats or cools in a day. A decreasing DTR suggests a warming climatic trend but is only a rough measure as DTR can be skewed by many factors such as cloud cover, urban heat island effect, and aerosols.';
      break;
    case 'frost_days':
      p.innerHTML = 'Frost Days reports the number of days where the daily low temperature drops below 32˚F or 0˚C. The presence of, lack of, and schedule of frost days have strong impacts on growing seasons, permafrost, and heating demands, for example. While the freezing point of water varies slightly with local environmental conditions, for simplicity this indicator assumes a consistent 32˚F/0˚C.';
      break;
    case 'max_high_temperature':
      p.innerHTML = 'Max High Temperature reports the highest daily temperature generated across all requested models for the given period. While averages or percentiles may be more dependable measurements of regular climatic conditions, gauging potentially new maximum heat extremes is essential for proper emergency services preparation.';
      break;
    case 'min_low_temperature':
      p.innerHTML = 'Min Low Temperature reports the lowest daily temperature generated across all requested models for the given period. While averages or percentiles may be more dependable measurements of regular climatic conditions, gauging potentially new minimum temperature extremes is essential for gauging the changing climate.';
      break;
    default:
      p.innerHTML = '';
  }
};

export const indicatorError = () => {
  const p = document.querySelector('.indicator-info');
  const submit = document.querySelector('#submit');
  p.innerHTML = 'Please select a city and indicator.';
  p.classList.add('red');
  submit.disabled = false;
};