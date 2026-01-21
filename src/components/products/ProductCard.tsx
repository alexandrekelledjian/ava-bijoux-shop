'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AvaStar } from '@/components/ui/Logo'
import type { Produit } from '@/lib/data/mock-products'

interface ProductCardProps {
  product: Produit
  salonCode?: string
}

export default function ProductCard({ product, salonCode }: ProductCardProps) {
  const href = salonCode
    ? `/s/${salonCode}/produit/${product.id}`
    : `/produit/${product.id}`

  return (
    <Link href={href} className="group">
      <article className="card-ava overflow-hidden">
        {/* Image produit */}
        <div className="relative aspect-square bg-gradient-to-br from-ava-cream to-ava-gold/20 rounded-xl overflow-hidden mb-4">
          {/* Placeholder - à remplacer par vraie image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-ava-gold/50">
              <AvaStar size={64} color="#FFEEC2" />
            </div>
          </div>

          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-ava-anthracite/0 group-hover:bg-ava-anthracite/10 transition-colors duration-300" />

          {/* Badge "Personnalisable" */}
          <div className="absolute top-3 left-3">
            <span className="badge-ava bg-ava-coral text-ava-anthracite">
              <AvaStar size={10} color="#454545" className="mr-1" />
              Personnalisable
            </span>
          </div>
        </div>

        {/* Infos produit */}
        <div className="space-y-2">
          <h3 className="font-raleway font-semibold text-lg text-ava-anthracite group-hover:text-ava-coral transition-colors">
            {product.nom}
          </h3>
          <p className="text-sm text-ava-anthracite/70 font-quicksand line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-raleway font-bold text-ava-anthracite">
              {product.prix.toFixed(2)} €
            </span>
            <span className="text-sm font-quicksand text-ava-coral group-hover:translate-x-1 transition-transform">
              Personnaliser →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
