"use client"

// src/components/Success.tsx
import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import axios from "axios"

export default function Success() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [message, setMessage] = useState("Verificando tu pago...")
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setMessage("ID de sesión no encontrado en la URL.")
      setIsLoading(false)
      return
    }
    // Opcional: verifica el estado del pago en tu backend
    axios
      .post("http://localhost:4000/api/stripe/verify", { sessionId })
      .then((_resp) => {
        setMessage("¡Pago exitoso! Tu reserva está confirmada.")
        setIsSuccess(true)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error verificando pago:", err)
        setMessage("Hubo un problema validando tu pago. Contacta soporte.")
        setIsLoading(false)
      })
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#050505" }}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with brand color */}
        <div className="h-2" style={{ backgroundColor: "#bb0501" }}></div>

        <div className="p-8 text-center">
          {/* Icon section */}
          <div className="mb-6">
            {isLoading ? (
              <div
                className="w-16 h-16 mx-auto mb-4 border-4 border-gray-200 border-t-4 rounded-full animate-spin"
                style={{ borderTopColor: "#bb0501" }}
              ></div>
            ) : isSuccess ? (
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#bb0501" }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#050505" }}>
            {isLoading ? "Procesando..." : isSuccess ? "¡Gracias por tu pago!" : "Error en el pago"}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">{message}</p>

          {/* Action button */}
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: "#bb0501" }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver al inicio
          </Link>
        </div>

        {/* Footer accent */}
        <div className="h-1" style={{ backgroundColor: "#bb0501" }}></div>
      </div>
    </div>
  )
}
