'use client'

import React from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'

interface HeaderProps {
  salonName?: string
  salonLogo?: string
}

export default function Header({ salonName, salonLogo }: HeaderProps) {
  const { items } = useCartStore()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-ava-cream/95 backdrop-blur-sm border-b border-ava-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo AVA */}
          <Link href="/" className="flex items-center gap-3">
            <Logo variant="compact" size="sm" color="peach" />
          </Link>

          {/* Nom du salon partenaire (si sur mini-site) */}
          {salonName && (
            <div className="hidden sm:flex items-center gap-2 text-ava-anthracite">
              <span className="text-sm font-quicksand">Chez</span>
              <span className="font-lato font-medium">{salonName}</span>
            </div>
          )}

          {/* Panier */}
          <Link
            href="/panier"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-ava-gold/30 hover:bg-ava-gold transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-ava-anthracite" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-ava-coral text-ava-anthracite text-xs font-bold rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Nom du salon en mobile */}
        {salonName && (
          <div className="sm:hidden pb-3 text-center">
            <span className="text-sm font-quicksand text-ava-anthracite">
              Chez <span className="font-medium">{salonName}</span>
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
