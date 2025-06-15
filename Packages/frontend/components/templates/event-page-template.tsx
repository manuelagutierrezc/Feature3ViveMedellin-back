"use client"

import EventHeader from "@/components/organisms/event-header"
import EventDetails from "@/components/organisms/event-details"
import CommentsSection from "@/components/organisms/comments-section"
import EventImage from "@/components/organisms/event-image"
import SimilarEvents from "@/components/organisms/similar-events"
import Button from "@/components/atoms/Button"
import { useAuth } from "@/context/auth/auth-context"

export default function EventPageTemplate() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-[#f2f7f5]">
      <main className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda (contenido principal) */}
          <div className="flex-1 lg:w-2/3">
            <EventHeader />

            <div className="mb-10">
              <EventDetails />
            </div>

            <CommentsSection />

            {!isAuthenticated && (
              <div className="mt-6">
                <Button variant="primary" size="lg">
                  Unirme a la conversación
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar (columna derecha) */}
          <div className="lg:w-1/3 lg:max-w-[350px] space-y-6">
            <EventImage />
            <SimilarEvents />
          </div>
        </div>
      </main>
    </div>
  )
}
