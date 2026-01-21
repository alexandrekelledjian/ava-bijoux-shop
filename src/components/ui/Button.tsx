'use client'

import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-quicksand font-medium
    rounded-full transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
  `

  const variantStyles = {
    primary: 'bg-ava-coral text-ava-anthracite hover:bg-ava-peach hover:shadow-lg focus:ring-ava-coral',
    secondary: 'bg-ava-gold text-ava-anthracite hover:bg-ava-peach hover:shadow-lg focus:ring-ava-gold',
    outline: 'border-2 border-ava-anthracite text-ava-anthracite bg-transparent hover:bg-ava-anthracite hover:text-ava-cream focus:ring-ava-anthracite',
    ghost: 'text-ava-anthracite hover:bg-ava-gold/30 focus:ring-ava-gold',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  )
}
