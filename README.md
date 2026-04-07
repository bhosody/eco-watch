<a href="https://eco-watch-iota.vercel.app">
  <img src="https://img.shields.io/badge/Live-eco--watch-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo" />
</a>

# 🌿 Eco-Watch

**Real-time air quality dashboard** — geolocates the user, fetches live pollution data, and delivers contextual health advice, all without exposing API keys to the client.

---

<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/aba6d2c9-79e0-4613-9db1-5a068a9a2456" />


---

## Features

- **Automatic geolocation** — one-click, no manual input required
- **Live AQI index** (1–5 scale, OpenWeatherMap) with a color-coded ring gauge
- **Key pollutant metrics** — PM2.5, NO₂, CO with individual level indicators and progress bars
- **Contextual health advice** broken down into three categories:
  - 🏃 Sport — outdoor activity recommendations
  - 🪟 Indoors — ventilation & window guidance
  - 👶 Sensitive groups — specific warnings for vulnerable people
- **Reverse geocoding** — displays the user's city/region from coordinates
- **Serverless API proxy** — the OpenWeatherMap key never reaches the browser

---

## Stack

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts 2 |
| Data source | OpenWeatherMap Air Pollution & Geocoding APIs |
| Deployment | Vercel Serverless Functions |

---

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/bhosody/eco-watch.git
cd eco-watch

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# → Add your OpenWeatherMap key to .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and allow location access when prompted.

---

## Architecture

```
Browser
  │
  ├─ navigator.geolocation.getCurrentPosition()
  │       │
  │       └─▶  GET /api/air-quality?lat=…&lon=…
  │                     │
  │               Vercel Serverless Function
  │                     │
  │          ┌──────────┴──────────┐
  │          ▼                     ▼
  │   air_pollution API     geo/1.0/reverse API
  │   (AQI + pollutants)    (city, region, country)
  │          └──────────┬──────────┘
  │                     │  merged JSON response
  │                     ▼
  │             transformAirData()
  │          (normalize + format values)
  │                     │
  └─◀──────────── React UI renders
```

The API key is stored exclusively in a Vercel environment variable — the client only ever calls `/api/air-quality`, never OpenWeatherMap directly.

---

## Project structure

```
eco-watch/
├── api/
│   └── air-quality.js        # Serverless function (proxy + geocoding)
├── src/
│   ├── components/
│   │   ├── AqiCard.jsx        # AQI ring gauge
│   │   ├── MetricCard.jsx     # Per-pollutant card with progress bar
│   │   └── AdviceBox.jsx      # Contextual advice (sport / home / sensitive)
│   ├── hooks/
│   │   └── useAirQuality.js   # Geolocation + fetch logic
│   └── lib/
│       ├── aqiConfig.js       # AQI levels, colors, advice copy
│       ├── metricsConfig.js   # Pollutant thresholds
│       └── transformAirData.js # API response normalizer
└── vite.config.js             # Dev middleware mirrors the serverless function
```

---

## License

MIT
