import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface GlobeStickersProps {
  size?: number
  speed?: number
  className?: string
}

export function GlobeStickers({ size = 200, speed = 0.005, className = "" }: GlobeStickersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const phiRef = useRef(0)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const accOffset = useRef({ phi: 0, theta: 0 })

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).style.cursor = "grabbing"
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    accOffset.current.phi += dragOffset.current.phi
    accOffset.current.theta += dragOffset.current.theta
    dragOffset.current = { phi: 0, theta: 0 }
    isDragging.current = false
    ;(e.target as HTMLElement).style.cursor = "grab"
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    dragOffset.current = {
      phi: (e.clientX - dragStart.current.x) / 200,
      theta: (e.clientY - dragStart.current.y) / 800,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: DPR,
      width: size,
      height: size,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 8,
      mapBaseBrightness: 0.05,
      baseColor: [0.6, 0.6, 0.6],
      markerColor: [0.1, 0.4, 0.8],
      glowColor: [0.8, 0.8, 1.0],
      opacity: 1,
      markers: [
        { location: [48.86, 2.35], size: 0.06 },
        { location: [35.68, 139.65], size: 0.06 },
        { location: [40.71, -74.01], size: 0.06 },
        { location: [-22.91, -43.17], size: 0.06 },
        { location: [-33.87, 151.21], size: 0.06 },
        { location: [28.61, 77.21], size: 0.06 },
      ],
    })

    let animId: number
    const animate = () => {
      if (!isDragging.current) phiRef.current += speed
      globeRef.current?.update({
        phi: phiRef.current + accOffset.current.phi + dragOffset.current.phi,
        theta: 0.3 + accOffset.current.theta + dragOffset.current.theta,
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      globeRef.current?.destroy()
    }
  }, [size, speed])

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "grab",
        touchAction: "none",
      }}
      className={className}
    />
  )
}
