"use client"

import { Suspense } from "react"
import MapWithProblemsContent from "./MapWithProblemsContent"

export default function MapWithProblems() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Carregando mapa...</span>
      </div>
    }>
      <MapWithProblemsContent />
    </Suspense>
  )
}