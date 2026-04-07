/**
 * Serverless function Vercel — proxy OpenWeatherMap Air Pollution + Geocoding API
 *
 * Entrée  : GET /api/air-quality?lat=<float>&lon=<float>
 * Sortie  : JSON { ...air_pollution, location: { name, state, country } | null }
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Paramètres lat et lon requis.' })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API non configurée côté serveur.' })
  }

  const airUrl =
    `https://api.openweathermap.org/data/2.5/air_pollution` +
    `?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${apiKey}`

  const geoUrl =
    `https://api.openweathermap.org/geo/1.0/reverse` +
    `?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&limit=1&appid=${apiKey}`

  try {
    const [airRes, geoRes] = await Promise.all([fetch(airUrl), fetch(geoUrl)])

    if (!airRes.ok) {
      const text = await airRes.text()
      console.error('OpenWeatherMap error:', airRes.status, text)
      return res.status(airRes.status).json({
        error: `Erreur OpenWeatherMap (${airRes.status})`,
      })
    }

    const airData = await airRes.json()
    const geoData = geoRes.ok ? await geoRes.json() : []
    const location = geoData[0] ?? null

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300')
    return res.status(200).json({ ...airData, location })
  } catch (err) {
    console.error('Fetch error:', err)
    return res.status(500).json({ error: 'Impossible de contacter OpenWeatherMap.' })
  }
}
