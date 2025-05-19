export default function EventDetails() {
    const activities = [
      {
        id: 1,
        title: "Desfile de Silleteros",
        description: "Más de 500 silletas se exponen al público a lo largo de la avenida Guayabal.",
      },
      {
        id: 2,
        title: "Desfile de Autos Clásicos y Antiguos",
        description: "Más de 200 autos emblemáticos de las historia nacional y mundial.",
      },
      {
        id: 3,
        title: "Festival Nacional de la Trova",
        description:
          "Espacio donde el humor de los antioqueños se hace presente y reúne en competencia a más de 220 trovadores.",
      },
    ]
  
    return (
      <div className="mb-8">
        <p className="text-[#475d5b] mb-4">Algunas actividades de la Feria de las Flores incluyen:</p>
  
        <ul className="list-disc pl-6 space-y-4 text-[#475d5b]">
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.title}: {activity.description}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  