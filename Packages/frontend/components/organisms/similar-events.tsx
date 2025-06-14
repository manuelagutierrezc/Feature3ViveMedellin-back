import EventCard from "@/components/molecules/event-card"
import Typography from "@/components/atoms/typography"

export default function SimilarEvents() {
  const events = [
    {
      id: 1,
      title: "Feria del libro y la cultura",
      date: "Del 11 al 20 de septiembre del 2025",
      image: "/test2.png",
    },
  ]

  return (
    <div>
      <Typography variant="h2" color="primary" className="mb-6">
        Eventos Similares
      </Typography>

      {events.map((event) => (
        <EventCard key={event.id} title={event.title} date={event.date} image={event.image} />
      ))}
    </div>
  )
}
