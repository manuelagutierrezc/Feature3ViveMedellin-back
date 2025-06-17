"use client"

import { useComments } from "@/context/comments-context"
import { useAuth } from "@/context/auth-context"
import Button from "@/components/atoms/Button"

export default function DebugComments() {
  const { comments, refreshComments } = useComments()
  const { user } = useAuth()

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV === 'production') return null

  const handleRefresh = async () => {
    console.log("🔄 Refrescando comentarios manualmente...")
    await refreshComments()
  }

  const handleDebugInfo = () => {
    console.log("=== 🐛 DEBUG DE COMENTARIOS ===")
    console.log("👤 Usuario actual:", user)
    console.log("📊 Total comentarios:", comments.length)
    console.log("📝 Comentarios:", comments)
    console.log("🍪 Cookie JWT:", document.cookie.includes('jwt') ? 'Presente' : 'Ausente')
    console.log("🔐 Token en localStorage:", localStorage.getItem('jwt') ? 'Presente' : 'Ausente')
    console.log("============================")
  }

  return (
    <div className="fixed top-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-lg z-50">
      <h4 className="text-xs font-bold text-blue-800 mb-2">Debug Comentarios</h4>
      <div className="text-xs text-blue-700 mb-2">
        <div>Usuario: {user?.userName || 'Sin login'}</div>
        <div>Comentarios: {comments.length}</div>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleRefresh}
          className="text-xs py-1 px-2"
        >
          Refrescar
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleDebugInfo}
          className="text-xs py-1 px-2"
        >
          Log Info
        </Button>
      </div>
    </div>
  )
} 