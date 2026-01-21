'use client'

import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ava-anthracite mb-2 font-quicksand"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border-2',
            'bg-white text-ava-anthracite font-quicksand',
            'transition-all duration-300',
            'placeholder:text-ava-anthracite/40',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-ava-gold focus:border-ava-coral focus:ring-2 focus:ring-ava-coral/20',
            'focus:outline-none',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 font-quicksand">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-ava-anthracite/60 font-quicksand">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
