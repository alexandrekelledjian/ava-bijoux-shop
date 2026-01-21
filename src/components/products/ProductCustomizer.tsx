'use client'

import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { AvaStar } from '@/components/ui/Logo'
import { useCartStore } from '@/lib/store/cart'
import type { Produit, Police } from '@/lib/data/mock-products'

interface ProductCustomizerProps {
  product: Produit
  polices: Police[]
  salonCode?: string
}

export default function ProductCustomizer({
  product,
  polices,
  salonCode
}: ProductCustomizerProps) {
  const [texte, setTexte] = useState('')
  const [selectedPolice, setSelectedPolice] = useState<Police>(polices[0])
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { addItem, setSalonCode } = useCartStore()

  // Validation du texte
  const maxLength = 15
  const validChars = /^[a-zA-ZÀ-ÿ\s\-']*$/
  const isValidTexte = texte.length > 0 && texte.length <= maxLength && validChars.test(texte)

  // Enregistrer le code salon
  useEffect(() => {
    if (salonCode) {
      setSalonCode(salonCode)
    }
  }, [salonCode, setSalonCode])

  const handleTexteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= maxLength && validChars.test(value)) {
      setTexte(value)
    }
  }

  const handleAddToCart = async () => {
    if (!isValidTexte) return

    setIsAdding(true)

    // Simuler un délai pour le feedback visuel
    await new Promise(resolve => setTimeout(resolve, 500))

    addItem({
      produitId: product.id,
      nom: product.nom,
      prix: product.prix,
      imageUrl: product.imageUrl,
      textePersonnalisation: texte,
      policeId: selectedPolice.id,
      policeNom: selectedPolice.nomGoogleFonts,
      quantity: 1,
    })

    setIsAdding(false)
    setShowSuccess(true)

    // Reset après 3 secondes
    setTimeout(() => {
      setShowSuccess(false)
      setTexte('')
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Section Mockup - Prévisualisation */}
      <div className="relative aspect-square bg-gradient-to-br from-ava-cream to-ava-gold/30 rounded-2xl overflow-hidden shadow-lg">
        {/* Placeholder pour l'image du bijou */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AvaStar size={120} color="#FFEEC2" className="opacity-50" />
        </div>

        {/* Zone de gravure avec le texte */}
        {texte && (
          <div
            className="absolute flex items-center justify-center transition-all duration-300"
            style={{
              left: `${product.zoneGravure.x}%`,
              top: `${product.zoneGravure.y}%`,
              width: `${product.zoneGravure.width}%`,
              height: `${product.zoneGravure.height}%`,
              transform: `translate(-50%, -50%) rotate(${product.zoneGravure.rotation}deg)`,
            }}
          >
            <span
              className="text-ava-anthracite whitespace-nowrap"
              style={{
                fontFamily: `'${selectedPolice.nomGoogleFonts}', cursive`,
                fontSize: 'clamp(12px, 3vw, 24px)',
              }}
            >
              {texte}
            </span>
          </div>
        )}

        {/* Indication zone de gravure si pas de texte */}
        {!texte && (
          <div
            className="absolute border-2 border-dashed border-ava-coral/50 rounded flex items-center justify-center"
            style={{
              left: `${product.zoneGravure.x}%`,
              top: `${product.zoneGravure.y}%`,
              width: `${product.zoneGravure.width}%`,
              height: `${product.zoneGravure.height}%`,
              transform: `translate(-50%, -50%) rotate(${product.zoneGravure.rotation}deg)`,
            }}
          >
            <span className="text-xs text-ava-coral/70 font-quicksand">
              Zone gravure
            </span>
          </div>
        )}
      </div>

      {/* Informations produit */}
      <div className="space-y-2">
        <h1 className="font-raleway text-2xl sm:text-3xl font-bold text-ava-anthracite">
          {product.nom}
        </h1>
        <p className="text-ava-anthracite/70 font-quicksand">
          {product.description}
        </p>
        <p className="text-2xl font-raleway font-bold text-ava-coral">
          {product.prix.toFixed(2)} €
        </p>
      </div>

      {/* Formulaire de personnalisation */}
      <div className="space-y-6">
        {/* Saisie du texte */}
        <div>
          <Input
            label="Texte à graver"
            value={texte}
            onChange={handleTexteChange}
            placeholder="Entrez votre prénom..."
            helperText={`${texte.length}/${maxLength} caractères • Lettres, espaces, tirets et apostrophes uniquement`}
            error={texte.length > 0 && !isValidTexte ? 'Caractères non autorisés' : undefined}
          />
        </div>

        {/* Choix de la police */}
        <div>
          <label className="block text-sm font-medium text-ava-anthracite mb-3 font-quicksand">
            Style d'écriture
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {polices.map((police) => (
              <button
                key={police.id}
                onClick={() => setSelectedPolice(police)}
                className={clsx(
                  'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                  selectedPolice.id === police.id
                    ? 'border-ava-coral bg-ava-coral/10'
                    : 'border-ava-gold hover:border-ava-peach bg-white'
                )}
              >
                <span
                  className="text-lg text-ava-anthracite block truncate"
                  style={{ fontFamily: `'${police.nomGoogleFonts}', cursive` }}
                >
                  {texte || 'Exemple'}
                </span>
                <span className="text-xs text-ava-anthracite/50 font-quicksand mt-1 block">
                  {police.nomGoogleFonts}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bouton ajouter au panier */}
        <div className="pt-4">
          {showSuccess ? (
            <div className="bg-green-100 border border-green-400 rounded-xl p-4 text-center">
              <span className="text-green-700 font-quicksand font-medium">
                ✓ Ajouté au panier !
              </span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={!isValidTexte}
              loading={isAdding}
            >
              {isValidTexte
                ? `Ajouter au panier • ${product.prix.toFixed(2)} €`
                : 'Entrez un texte pour personnaliser'}
            </Button>
          )}
        </div>
      </div>

      {/* Infos livraison */}
      <div className="bg-ava-gold/20 rounded-xl p-4 space-y-2">
        <h4 className="font-lato font-medium text-ava-anthracite flex items-center gap-2">
          <AvaStar size={14} color="#454545" />
          Options de livraison
        </h4>
        <ul className="text-sm text-ava-anthracite/70 font-quicksand space-y-1">
          <li>• Retrait en boutique : <span className="font-medium text-green-600">Gratuit</span> (~45 jours)</li>
          <li>• Mondial Relay Point Relais : 4,99 €</li>
          <li>• Mondial Relay Domicile : 7,99 €</li>
        </ul>
      </div>
    </div>
  )
}
