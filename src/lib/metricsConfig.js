/**
 * Seuils officiels OpenWeatherMap pour PM2.5, NO2 et CO.
 * Chaque palier correspond à un niveau AQI 1→5.
 * Source : https://openweathermap.org/air-pollution-index-levels
 *
 * Unités :
 *  - PM2.5 : µg/m³
 *  - NO2   : µg/m³
 *  - CO    : µg/m³
 */
export const METRICS_CONFIG = {
  pm2_5: {
    label: 'PM2.5',
    unit: 'µg/m³',
    description: 'Particules fines',
    // Seuils : [max du niveau 1, max du niveau 2, max du niveau 3, max du niveau 4]
    // Au-dessus du niveau 4 → niveau 5
    thresholds: [10, 25, 50, 75],
  },
  no2: {
    label: 'NO₂',
    unit: 'µg/m³',
    description: "Dioxyde d'azote",
    thresholds: [40, 70, 150, 200],
  },
  co: {
    label: 'CO',
    unit: 'µg/m³',
    description: 'Monoxyde de carbone',
    thresholds: [4400, 9400, 12400, 15400],
  },
}

/**
 * Retourne le niveau AQI (1→5) d'une métrique selon sa valeur.
 * @param {'pm2_5'|'no2'|'co'} metricKey
 * @param {number} value
 * @returns {1|2|3|4|5}
 */
export function getMetricLevel(metricKey, value) {
  const config = METRICS_CONFIG[metricKey]
  if (!config) return 1

  for (let i = 0; i < config.thresholds.length; i++) {
    if (value <= config.thresholds[i]) return i + 1
  }
  return 5
}
