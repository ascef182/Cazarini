"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

interface MagicTextProps {
  text: string
  className?: string
}

interface WordProps {
  children: string
  progress: ReturnType<typeof useScroll>
  range: number[]
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress.scrollYProgress, range, [0, 1])

  return (
    <span className="relative mr-1 inline-block">
      <span className="absolute opacity-20 select-none">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

export const MagicText: React.FC<MagicTextProps> = ({ text, className = "" }) => {
  const container = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  })

  const words = text.split(" ")

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length

        return (
          <Word key={i} progress={{ scrollYProgress }} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}