import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/air-quality', async (req, res) => {
            const urlObj = new URL(req.url, `http://localhost`)
            const lat = urlObj.searchParams.get('lat')
            const lon = urlObj.searchParams.get('lon')

            if (!lat || !lon) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              return res.end(JSON.stringify({ error: 'Paramètres lat et lon requis.' }))
            }

            const apiKey = env.OPENWEATHER_API_KEY
            if (!apiKey) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              return res.end(JSON.stringify({ error: 'Clé API non configurée côté serveur.' }))
            }

            const airUrl =
              `https://api.openweathermap.org/data/2.5/air_pollution` +
              `?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${apiKey}`

            const geoUrl =
              `https://api.openweathermap.org/geo/1.0/reverse` +
              `?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&limit=1&appid=${apiKey}`

            try {
              const [airRes, geoRes] = await Promise.all([fetch(airUrl), fetch(geoUrl)])
              const airData = await airRes.json()
              const geoData = geoRes.ok ? await geoRes.json() : []
              const location = geoData[0] ?? null
              res.writeHead(airRes.ok ? 200 : airRes.status, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ ...airData, location }))
            } catch (err) {
              console.error('[api-dev] Fetch error:', err)
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Impossible de contacter OpenWeatherMap.' }))
            }
          })
        },
      },
    ],
  }
})
