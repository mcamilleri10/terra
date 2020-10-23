export const yAxisLabel = indicator => {
  switch (indicator) {
    case 'average_high_temperature':
      return 'Avg High Temperature °F';
    case 'average_low_temperature':
      return 'Avg Low Temperature °F';
    case 'total_precipitation':
      return 'Total Precipitation';
    case 'extreme_precipitation_events':
      return 'Extreme Precipitation Events';
    case 'extreme_cold_events':
      return 'Extreme Cold Events';
    case 'extreme_heat_events':
      return 'Extreme Heat Events';
    case 'heat_wave_incidents':
      return 'Heat Wave Incidents';
    case 'heat_wave_duration_index':
      return 'Heat Wave Duration Index';
    case 'dry_spells':
      return 'Dry Spells';
    case 'diurnal_temperature_range':
      return 'Diurnal Temperature Range';
    case 'frost_days':
      return 'Frost Days';
    case 'max_high_temperature':
      return 'Max High Temperature °F';
    case 'min_low_temperature':
      return 'Min Low Temperature °F';
    default:
      break;
  }
};