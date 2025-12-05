"use client"

import { useEffect, useRef } from "react"
import { BottomNav } from "@/components/bottom-nav"

import MapWithProblems from "@/components/MapWithProblems"

export default function ExplorarPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // TODO: Initialize map with API
    console.log("[v0] Map container ready for API integration")
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 relative">
        <div ref={mapContainerRef} className="absolute inset-0 bg-muted">
          <MapWithProblems />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
