import EventCard from "./event-card"

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
      <h2 className="text-3xl font-bold text-[#00473e] mb-6">Eventos Similares</h2>

      {events.map((event) => (
        <EventCard key={event.id} title={event.title} date={event.date} image={event.image} />
      ))}
    </div>
  )
}
