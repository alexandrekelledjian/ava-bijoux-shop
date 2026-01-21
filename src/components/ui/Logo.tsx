'use client'

import React from 'react'

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon'
  color?: 'peach' | 'anthracite' | 'white' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: { width: 80, height: 40 },
  md: { width: 120, height: 60 },
  lg: { width: 180, height: 90 },
  xl: { width: 240, height: 120 },
}

const colorMap = {
  peach: '#FFD7A1',
  anthracite: '#454545',
  white: '#FFFFFF',
  gold: '#FFEEC2',
}

export default function Logo({
  variant = 'full',
  color = 'peach',
  size = 'md',
  className = ''
}: LogoProps) {
  const dimensions = sizeMap[size]
  const fillColor = colorMap[color]
  const starColor = color === 'white' ? '#454545' : '#454545'

  if (variant === 'icon') {
    // Version icône - étoile à 4 branches avec "ava" dedans
    return (
      <svg
        width={dimensions.width * 0.5}
        height={dimensions.width * 0.5}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Étoile à 4 branches */}
        <path
          d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0Z"
          fill={starColor}
        />
        {/* Texte AVA en blanc */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill={color === 'anthracite' ? '#FDFFEB' : '#FDFFEB'}
          fontSize="22"
          fontFamily="serif"
          fontWeight="400"
        >
          ava
        </text>
      </svg>
    )
  }

  // Version full ou compact - Logo AVA avec étoile
  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lettre "a" gauche - style serif élégant */}
      <text
        x="30"
        y="65"
        fill={fillColor}
        fontSize="58"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="400"
        fontStyle="italic"
      >
        a
      </text>

      {/* Lettre "V" centrale */}
      <text
        x="70"
        y="65"
        fill={fillColor}
        fontSize="58"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="400"
        textAnchor="middle"
      >
        V
      </text>

      {/* Lettre "a" droite */}
      <text
        x="115"
        y="65"
        fill={fillColor}
        fontSize="58"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="400"
        fontStyle="italic"
      >
        a
      </text>

      {/* Petite étoile à 4 branches sous le V */}
      <path
        d="M100 75 C101 80 103 82 108 83 C103 84 101 86 100 91 C99 86 97 84 92 83 C97 82 99 80 100 75Z"
        fill={starColor}
      />

      {variant === 'full' && (
        /* Sous-titre "Bijoux Acier Inoxydable" */
        <text
          x="100"
          y="98"
          textAnchor="middle"
          fill={fillColor}
          fontSize="10"
          fontFamily="'Quicksand', sans-serif"
          letterSpacing="2"
        >
          Bijoux Acier Inoxydable
        </text>
      )}
    </svg>
  )
}

// Composant étoile AVA réutilisable
export function AvaStar({
  size = 16,
  color = '#454545',
  className = '',
    style = {}
}: {
  size?: number
  color?: string
  className?: string
    style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
            style={style}
    >
      <path
        d="M12 0 C13.2 8.4 15.6 10.8 24 12 C15.6 13.2 13.2 15.6 12 24 C10.8 15.6 8.4 13.2 0 12 C8.4 10.8 10.8 8.4 12 0Z"
        fill={color}
      />
    </svg>
  )
}
