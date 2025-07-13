"use client"

import { useEffect, useState } from "react"

interface ChapterLoaderProps {
  isVisible?: boolean
}

export default function ChapterLoader({ isVisible = true }: ChapterLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0 // Reset for demo purposes
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Main Text with Glow Effect */}
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-semibold text-white animate-pulse">
            Generating Module
            <span className="inline-block animate-bounce">.</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.3s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.4s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.5s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.6s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.7s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.8s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "0.9s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "1.1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "1.2s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "1.3s" }}>
              .
            </span>
            <span className="inline-block animate-bounce" style={{ animationDelay: "1.4s" }}>
              .
            </span>
          </h2>

          {/* Glow Effect */}
          <div className="absolute inset-0 text-2xl md:text-3xl font-semibold text-white opacity-50 blur-sm animate-pulse">
            Generating Modules  ...............
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto space-y-3">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect for progress bar */}
              <div className="absolute inset-0 bg-white opacity-60 blur-sm rounded-full"></div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="text-white/70 text-sm font-medium">{progress}% Complete</div>
        </div>

        {/* Spinning Loader */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
            {/* Glow effect for spinner */}
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-white/50 rounded-full animate-spin blur-sm"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
