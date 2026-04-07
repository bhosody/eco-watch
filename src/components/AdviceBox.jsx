import { getAqiConfig } from '../lib/aqiConfig'

const CATEGORIES = [
  { key: 'sport',     label: 'Sport',              icon: '🏃' },
  { key: 'home',      label: 'Intérieur',          icon: '🪟' },
  { key: 'sensitive', label: 'Personnes fragiles', icon: '👶' },
]

export default function AdviceBox({ aqi, className = '' }) {
  const config = getAqiConfig(aqi)

  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-4 border border-gray-800 ${className}`}
      style={{
        borderLeftColor: config.hex,
        borderLeftWidth: '3px',
        backgroundColor: `${config.hex}12`,
      }}
    >
      {/* Résumé */}
      <div className="flex items-center gap-2">
        <span className="text-xl select-none shrink-0" aria-hidden="true">
          {iconForAqi(aqi)}
        </span>
        <p className="font-semibold text-sm" style={{ color: config.hex }}>
          {config.shortAdvice}
        </p>
      </div>

      {/* Trois catégories */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CATEGORIES.map(({ key, label, icon }) => (
          <div
            key={key}
            className="flex flex-col gap-1.5 rounded-xl p-3 border border-gray-700/60"
            style={{ backgroundColor: 'rgb(31 41 55 / 0.5)' }}
          >
            <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
              <span aria-hidden="true">{icon}</span>
              {label}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              {config.detailedAdvice[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function iconForAqi(aqi) {
  const icons = { 1: '🌿', 2: '😐', 3: '😷', 4: '🚫', 5: '☠️' }
  return icons[aqi] ?? '🌿'
}
