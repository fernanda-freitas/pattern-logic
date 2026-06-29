'use client'

import { useEffect, useRef } from 'react'

const CELL = 6

export default function PatternCanvas({ matrix }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!matrix || matrix.length === 0) return

    const height = matrix.length
    const width = matrix[0].length
    const canvas = canvasRef.current
    canvas.width = width * CELL
    canvas.height = height * CELL

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        ctx.fillStyle = matrix[row][col] ? '#1a1a1a' : '#f5f5f5'
        ctx.fillRect(col * CELL, row * CELL, CELL - 1, CELL - 1)
      }
    }
  }, [matrix])

  if (!matrix || matrix.length === 0) return null

  return <canvas ref={canvasRef} />
}
