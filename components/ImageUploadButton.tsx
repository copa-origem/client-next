"use client"

import { useRef } from "react"

export function ImageUploadButton({ onFileSelect, children }: { onFileSelect: (file: File) => void, children?: React.ReactNode }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handleClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
    </>
  )
}
