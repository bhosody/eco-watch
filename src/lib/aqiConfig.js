/**
 * Table AQI OpenWeatherMap enrichie pour EcoWatch
 * Index 1 (Bon) à 5 (Très mauvais)
 */
export const AQI_CONFIG = {
  1: {
    label: 'Excellente',
    tailwindBg: 'bg-aqi-good',
    tailwindText: 'text-aqi-good',
    hex: '#78d64b',
    shortAdvice: "L'air est pur, profitez-en !",
    detailedAdvice: {
      sport: "Conditions idéales pour toute activité physique intense.",
      home: "Ouvrez grand les fenêtres pour renouveler l'air intérieur.",
      sensitive: "Aucun risque identifié pour les personnes fragiles."
    }
  },
  2: {
    label: 'Correcte',
    tailwindBg: 'bg-aqi-fair',
    tailwindText: 'text-aqi-fair',
    hex: '#f0e040',
    shortAdvice: "Qualité de l'air acceptable.",
    detailedAdvice: {
      sport: "Activités extérieures possibles sans restrictions majeures.",
      home: "Aération recommandée, de préférence tôt le matin ou tard le soir.",
      sensitive: "Une légère gêne peut être ressentie par les personnes très sensibles."
    }
  },
  3: {
    label: 'Modérée',
    tailwindBg: 'bg-aqi-moderate',
    tailwindText: 'text-aqi-moderate',
    hex: '#f77f00',
    shortAdvice: "L'air est légèrement pollué.",
    detailedAdvice: {
      sport: "Réduisez les exercices intenses près des axes routiers.",
      home: "Aérez par intermittence (10 min suffisent).",
      sensitive: "Essoufflements ou toux possibles chez les asthmatiques."
    }
  },
  4: {
    label: 'Mauvaise',
    tailwindBg: 'bg-aqi-poor',
    tailwindText: 'text-aqi-poor',
    hex: '#d62828',
    shortAdvice: "Santé impactée, soyez vigilant.",
    detailedAdvice: {
      sport: "Évitez le sport en extérieur. Privilégiez les activités douces.",
      home: "Gardez les fenêtres fermées aux heures de pointe.",
      sensitive: "Risque accru de problèmes respiratoires. Restez à l'abri."
    }
  },
  5: {
    label: 'Très mauvaise',
    tailwindBg: 'bg-aqi-very_poor',
    tailwindText: 'text-aqi-very_poor',
    hex: '#7b2d8b',
    shortAdvice: "Alerte pollution : danger sanitaire.",
    detailedAdvice: {
      sport: "Toute activité physique extérieure est fortement déconseillée.",
      home: "Fermez toutes les aérations. Utilisez un purificateur d'air si possible.",
      sensitive: "Tout le monde peut ressentir des effets graves. Limitez vos déplacements."
    }
  },
}

export function getAqiConfig(aqi) {
  return AQI_CONFIG[aqi] ?? AQI_CONFIG[1]
}
