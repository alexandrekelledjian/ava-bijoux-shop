'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { AvaStar } from '@/components/ui/Logo'
import { useCartStore, FRAIS_LIVRAISON, type ModeLivraison } from '@/lib/store/cart'
import { Trash2, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { clsx } from 'clsx'

export default function PanierPage() {
  const { items, removeItem, updateQuantity, getTotal, salonCode } = useCartStore()
  const [modeLivraison, setModeLivraison] = useState<ModeLivraison>('boutique')

  const sousTotal = getTotal()
  const fraisLivraison = FRAIS_LIVRAISON[modeLivraison]
  const total = sousTotal + fraisLivraison

  const backLink = salonCode ? `/s/${salonCode}` : '/'

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 mx-auto bg-ava-gold/30 rounded-full flex items-center justify-center">
              <AvaStar size={48} color="#FFEEC2" />
            </div>
            <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Votre panier est vide
            </h1>
            <p className="text-ava-anthracite/70 font-quicksand">
              Découvrez nos bijoux personnalisables et créez une pièce unique !
            </p>
            <Link href={backLink}>
              <Button variant="primary">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voir les bijoux
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <nav className="mb-6">
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 text-ava-anthracite/70 hover:text-ava-coral transition-colors font-quicksand"
            >
              <ChevronLeft className="w-4 h-4" />
              Continuer mes achats
            </Link>
          </nav>

          <h1 className="font-raleway text-2xl sm:text-3xl font-bold text-ava-anthracite mb-8">
            Mon panier
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="card-ava flex gap-4"
                >
                  {/* Image placeholder */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-ava-cream to-ava-gold/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AvaStar size={32} color="#FFEEC2" />
                  </div>

                  {/* Infos article */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-lato font-medium text-ava-anthracite truncate">
                      {item.nom}
                    </h3>
                    <p className="text-sm text-ava-anthracite/70 font-quicksand">
                      Gravure : <span className="font-medium">{item.textePersonnalisation}</span>
                    </p>
                    <p className="text-xs text-ava-anthracite/50 font-quicksand">
                      Police : {item.policeNom}
                    </p>

                    {/* Prix et quantité */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-ava-gold/30 hover:bg-ava-gold flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-ava-gold/30 hover:bg-ava-gold flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="font-raleway font-bold text-ava-anthracite">
                        {(item.prix * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {/* Bouton supprimer */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-2 text-ava-anthracite/40 hover:text-red-500 transition-colors"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="card-ava sticky top-24 space-y-6">
                <h2 className="font-lato font-medium text-lg text-ava-anthracite">
                  Récapitulatif
                </h2>

                {/* Mode de livraison */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-ava-anthracite font-quicksand">
                    Mode de livraison
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'boutique' as ModeLivraison, label: 'Retrait en boutique', price: 0, delay: '~45 jours' },
                      { value: 'mondial_relay_point' as ModeLivraison, label: 'Point Relais', price: 4.99, delay: 'Standard' },
                      { value: 'mondial_relay_domicile' as ModeLivraison, label: 'À domicile', price: 7.99, delay: 'Standard' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setModeLivraison(option.value)}
                        className={clsx(
                          'w-full p-3 rounded-xl border-2 text-left transition-all',
                          modeLivraison === option.value
                            ? 'border-ava-coral bg-ava-coral/10'
                            : 'border-ava-gold hover:border-ava-peach'
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-quicksand text-sm text-ava-anthracite">
                            {option.label}
                          </span>
                          <span className={clsx(
                            'font-medium text-sm',
                            option.price === 0 ? 'text-green-600' : 'text-ava-anthracite'
                          )}>
                            {option.price === 0 ? 'Gratuit' : `${option.price.toFixed(2)} €`}
                          </span>
                        </div>
                        <span className="text-xs text-ava-anthracite/50">{option.delay}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Totaux */}
                <div className="space-y-2 pt-4 border-t border-ava-gold/30">
                  <div className="flex justify-between text-sm font-quicksand">
                    <span className="text-ava-anthracite/70">Sous-total</span>
                    <span className="text-ava-anthracite">{sousTotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm font-quicksand">
                    <span className="text-ava-anthracite/70">Livraison</span>
                    <span className={fraisLivraison === 0 ? 'text-green-600' : 'text-ava-anthracite'}>
                      {fraisLivraison === 0 ? 'Gratuit' : `${fraisLivraison.toFixed(2)} €`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-ava-gold/30">
                    <span className="font-lato font-medium text-ava-anthracite">Total</span>
                    <span className="font-raleway font-bold text-xl text-ava-coral">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                </div>

                {/* Bouton commander */}
                <Link href={`/checkout?livraison=${modeLivraison}`}>
                  <Button variant="primary" size="lg" fullWidth>
                    Commander
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-ava-anthracite/50 font-quicksand">
                  Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
