import { useState, useEffect } from 'react'
import { transformAirData } from '../lib/transformAirData'

/**
 * Hook principal : géolocalise l'utilisateur puis interroge
 * la serverless function /api/air-quality qui fait proxy vers OpenWeatherMap.
 *
 * États retournés :
 *  - data    : objet transformé { aqi, pm2_5, no2, co, fetchedAt }
 *  - loading : boolean
 *  - error   : string | null
 */
export function useAirQuality() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords
          const res = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`)

          if (!res.ok) {
            const body = await res.json().catch(() => ({}))
            throw new Error(body.error ?? `Erreur serveur (${res.status})`)
          }

          const raw = await res.json()
          setData(transformAirData(raw))
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
      (geoErr) => {
        const messages = {
          1: "Permission de géolocalisation refusée. Autorisez l'accès à votre position dans les paramètres du navigateur.",
          2: "Position introuvable. Vérifiez votre connexion ou réessayez.",
          3: "La demande de géolocalisation a expiré. Réessayez.",
        }
        setError(messages[geoErr.code] ?? 'Erreur de géolocalisation inconnue.')
        setLoading(false)
      },
      { timeout: 10_000 }
    )
  }, [])

  return { data, loading, error }
}
