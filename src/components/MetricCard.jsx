import { METRICS_CONFIG, getMetricLevel } from '../lib/metricsConfig'
import { getAqiConfig } from '../lib/aqiConfig'

export default function MetricCard({ metricKey, value }) {
  const metric = METRICS_CONFIG[metricKey]
  const level  = getMetricLevel(metricKey, value)
  const color  = getAqiConfig(level).hex

  const maxThreshold = metric.thresholds[metric.thresholds.length - 1] * 1.3
  const pct = Math.min((value / maxThreshold) * 100, 100)

  return (
    <div className="bg-gray-900 rounded-2xl p-4 flex flex-col gap-4 border border-gray-800">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide leading-none">
            {metric.description}
          </p>
          <p className="text-base font-bold text-white mt-1">{metric.label}</p>
        </div>
        <span
          className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full text-gray-950 mt-0.5"
          style={{ backgroundColor: color }}
        >
          Niv. {level}
        </span>
      </div>

      {/* Valeur */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black tabular-nums" style={{ color }}>
          {value}
        </span>
        <span className="text-xs text-gray-500">{metric.unit}</span>
      </div>

      {/* Barre de progression */}
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
