import { useAirQuality } from './hooks/useAirQuality'
import { getAqiConfig }  from './lib/aqiConfig'
import AqiCard    from './components/AqiCard'
import MetricCard from './components/MetricCard'
import AdviceBox  from './components/AdviceBox'

export default function App() {
  const { data, loading, error } = useAirQuality()

  return (
    <div className="min-h-screen lg:h-dvh flex flex-col bg-gray-950">
      {/* Top bar */}
      <header className="shrink-0 flex items-center gap-3 px-6 py-4 border-b border-gray-800/50">
        <h1 className="text-xl font-black tracking-tight text-white">
          Eco<span className="text-aqi-good">Watch</span>
        </h1>
        <span className="text-gray-700 select-none">·</span>
        <p className="text-gray-500 text-xs">Qualité de l'air en temps réel</p>
      </header>

      {/* Content */}
      <main className="flex-1 lg:min-h-0 p-4 lg:p-6">
        {loading && <LoadingState />}
        {error   && <ErrorState message={error} />}
        {data    && <Dashboard data={data} />}
      </main>

      {/* Footer */}
      <footer className="shrink-0 text-center text-gray-700 text-xs py-3 border-t border-gray-800/30">
        Données : OpenWeatherMap · {new Date().getFullYear()}
      </footer>
    </div>
  )
}

function Dashboard({ data }) {
  const { aqi, pm2_5, no2, co, fetchedAt, location } = data
  const config = getAqiConfig(aqi)

  const updatedAt = new Date(fetchedAt).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="lg:h-full grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-5 animate-fade-slide-up">

      {/* ── Colonne gauche : AQI ── */}
      <section
        className="rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-gray-800"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, ${config.hex}22, #111827 65%)`,
        }}
      >
        {location && (
          <span className="inline-flex items-center gap-1.5 bg-gray-800/80 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-700">
            <span aria-hidden="true">📍</span>
            {location}
          </span>
        )}

        <AqiCard aqi={aqi} />

        <p className="text-gray-600 text-xs">Mis à jour à {updatedAt}</p>
      </section>

      {/* ── Colonne droite : Métriques + Conseil ── */}
      <div className="flex flex-col gap-4 lg:h-full">

        {/* Polluants */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Polluants détaillés
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MetricCard metricKey="pm2_5" value={pm2_5} />
            <MetricCard metricKey="no2"   value={no2}   />
            <MetricCard metricKey="co"    value={co}    />
          </div>
        </section>

        {/* Conseil — prend l'espace restant sur desktop */}
        <section className="flex flex-col gap-3 lg:flex-1 lg:min-h-0">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Recommandation
          </h2>
          <AdviceBox aqi={aqi} />
        </section>

      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-aqi-good animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-300 font-medium">Localisation en cours…</p>
        <p className="text-xs text-gray-600 mt-1">Autorisez l'accès à votre position</p>
      </div>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-sm bg-gray-900 rounded-2xl p-6 border border-red-900/60 text-center">
        <p className="text-3xl mb-3" role="img" aria-label="Erreur">⚠️</p>
        <p className="font-semibold text-red-400 mb-2">Une erreur est survenue</p>
        <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  )
}
