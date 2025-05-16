import EventDetails from "@/components/evento/event-detail"
import EventHeader from "@/components/evento/event-head"
import EventImage from "@/components/evento/event-image"
import SimilarEvents from "@/components/evento/similar-events"
import CommentsSection from "@/components/comments/comments-section"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f7f5]">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <EventHeader />
            <EventDetails />
            <CommentsSection />
          </div>

          <div className="space-y-8">
            <EventImage />
            <SimilarEvents />
          </div>
        </div>
      </main>
    </div>
  )
}
