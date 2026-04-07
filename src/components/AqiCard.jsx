import { getAqiConfig } from '../lib/aqiConfig'

export default function AqiCard({ aqi }) {
  const config = getAqiConfig(aqi)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Anneau AQI */}
      <div
        className="relative flex items-center justify-center w-44 h-44 rounded-full transition-shadow duration-700"
        style={{
          background: `conic-gradient(${config.hex} ${(aqi / 5) * 100}%, #1f2937 0%)`,
          boxShadow: `0 0 48px ${config.hex}45, 0 0 12px ${config.hex}30`,
        }}
      >
        <div className="flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gray-950">
          <span className="text-6xl font-black leading-none" style={{ color: config.hex }}>
            {aqi}
          </span>
          <span className="text-xs text-gray-500 mt-1 tracking-wide">sur 5</span>
        </div>
      </div>

      {/* Badge label */}
      <span
        className="px-5 py-1.5 rounded-full text-sm font-semibold text-gray-950 tracking-wide"
        style={{ backgroundColor: config.hex }}
      >
        {config.label}
      </span>

      {/* Sous-titre */}
      <p className="text-gray-500 text-xs tracking-widest uppercase">
        Indice de qualité de l'air
      </p>
    </div>
  )
}
