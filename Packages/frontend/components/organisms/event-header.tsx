"use client"
import Typography from "@/components/atoms/typography"

export default function EventHeader() {
  return (
    <>
      <Typography variant="h1" color="primary" className="mb-6">
        Feria de las Flores
      </Typography>

      <Typography variant="body-large" color="primary" className="mb-6">
        La ciudad de Medellín se pinta de colores para celebrar el patrimonio inmaterial silletero y las tradiciones
        antioqueñas que cautivan desde 1957 a turistas y locales.
      </Typography>

      <Typography variant="body" color="secondary" className="mb-8">
        Celebración anual de la ciudad de Medellín que se constituye como un ícono raizal, cultural e histórico
        realizada durante el mes de agosto. Ofrece una amplia diversidad de eventos y espectáculos que giran alrededor
        de la cultura paisa.
      </Typography>
    </>
  )
}
