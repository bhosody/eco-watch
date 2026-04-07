/**
 * Transforme la réponse brute de l'API OpenWeatherMap Air Pollution
 * en un objet propre et exploitable par l'UI.
 *
 * Réponse brute attendue :
 * {
 *   list: [{
 *     main: { aqi: 1|2|3|4|5 },
 *     components: { pm2_5, no2, co, o3, so2, nh3, pm10, no }
 *   }]
 * }
 *
 * @param {object} raw - Réponse JSON brute de l'API
 * @returns {{ aqi: number, pm2_5: number, no2: number, co: number, fetchedAt: string }}
 */
export function transformAirData(raw) {
  const entry = raw?.list?.[0]
  if (!entry) throw new Error('Réponse API invalide : aucune donnée reçue.')

  const { main, components } = entry

  const loc = raw.location
  const location = loc
    ? [loc.name, loc.state, loc.country].filter(Boolean).join(', ')
    : null

  return {
    aqi: main.aqi,
    pm2_5: round(components.pm2_5),
    no2: round(components.no2),
    co: round(components.co),
    fetchedAt: new Date().toISOString(),
    location,
  }
}

function round(val) {
  return typeof val === 'number' ? Math.round(val * 10) / 10 : null
}
