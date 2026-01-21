'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { AvaStar } from '@/components/ui/Logo'
import { useCartStore, FRAIS_LIVRAISON, type ModeLivraison } from '@/lib/store/cart'
import { ChevronLeft, Lock, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const modeLivraison = (searchParams.get('livraison') || 'boutique') as ModeLivraison

  const { items, getTotal, salonCode } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'info' | 'payment'>('info')

  // Formulaire
  const [formData, setFormData] = useState({
    email: '',
    telephone: '',
    prenom: '',
    nom: '',
    adresse: '',
    codePostal: '',
    ville: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const sousTotal = getTotal()
  const fraisLivraison = FRAIS_LIVRAISON[modeLivraison]
  const total = sousTotal + fraisLivraison

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email invalide'
    }
    if (!formData.telephone.match(/^[\d\s\+\-\.]{10,}$/)) {
      newErrors.telephone = 'Téléphone invalide'
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Prénom requis'
    }
    if (!formData.nom.trim()) {
      newErrors.nom = 'Nom requis'
    }

    // Adresse requise seulement pour livraison domicile
    if (modeLivraison === 'mondial_relay_domicile') {
      if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise'
      if (!formData.codePostal.match(/^\d{5}$/)) newErrors.codePostal = 'Code postal invalide'
      if (!formData.ville.trim()) newErrors.ville = 'Ville requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      setStep('payment')
    }
  }

  const handlePayment = async () => {
    setIsLoading(true)

    // Ici on intégrera Stripe
    // Pour l'instant, simulation
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Redirection vers page de confirmation
    // window.location.href = '/confirmation?numero=AVA-XXXXX'

    setIsLoading(false)
    alert('Paiement Stripe à intégrer - voir README pour les clés API')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AvaStar size={64} color="#FFBB90" className="mx-auto" />
            <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Panier vide
            </h1>
            <Link href={salonCode ? `/s/${salonCode}` : '/'}>
              <Button variant="primary">Voir les bijoux</Button>
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
              href="/panier"
              className="inline-flex items-center gap-2 text-ava-anthracite/70 hover:text-ava-coral transition-colors font-quicksand"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour au panier
            </Link>
          </nav>

          {/* Étapes */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step === 'info' ? 'text-ava-coral' : 'text-ava-anthracite'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'info' ? 'bg-ava-coral text-white' : 'bg-ava-gold/50'
              }`}>1</span>
              <span className="font-quicksand">Informations</span>
            </div>
            <div className="w-8 h-0.5 bg-ava-gold/50" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-ava-coral' : 'text-ava-anthracite/50'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'payment' ? 'bg-ava-coral text-white' : 'bg-ava-gold/30'
              }`}>2</span>
              <span className="font-quicksand">Paiement</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              {step === 'info' ? (
                <div className="card-ava space-y-6">
                  <h2 className="font-raleway text-xl font-semibold text-ava-anthracite">
                    Vos informations
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      placeholder="votre@email.com"
                    />
                    <Input
                      label="Téléphone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      error={errors.telephone}
                      placeholder="06 12 34 56 78"
                    />
                    <Input
                      label="Prénom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      error={errors.prenom}
                    />
                    <Input
                      label="Nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      error={errors.nom}
                    />
                  </div>

                  {/* Adresse pour livraison domicile */}
                  {modeLivraison === 'mondial_relay_domicile' && (
                    <div className="space-y-4 pt-4 border-t border-ava-gold/30">
                      <h3 className="font-lato font-medium text-ava-anthracite">
                        Adresse de livraison
                      </h3>
                      <Input
                        label="Adresse"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleInputChange}
                        error={errors.adresse}
                        placeholder="123 Rue de la Paix"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Code postal"
                          name="codePostal"
                          value={formData.codePostal}
                          onChange={handleInputChange}
                          error={errors.codePostal}
                          placeholder="75001"
                        />
                        <Input
                          label="Ville"
                          name="ville"
                          value={formData.ville}
                          onChange={handleInputChange}
                          error={errors.ville}
                        />
                      </div>
                    </div>
                  )}

                  {/* Point relais */}
                  {modeLivraison === 'mondial_relay_point' && (
                    <div className="bg-ava-gold/20 rounded-xl p-4">
                      <p className="text-sm text-ava-anthracite font-quicksand">
                        📍 Vous pourrez choisir votre point relais après le paiement.
                      </p>
                    </div>
                  )}

                  {/* Retrait boutique */}
                  {modeLivraison === 'boutique' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm text-green-800 font-quicksand">
                        🏪 Retrait gratuit en boutique. Vous recevrez un email quand votre bijou sera prêt.
                      </p>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleContinue}
                  >
                    Continuer vers le paiement
                  </Button>
                </div>
              ) : (
                <div className="card-ava space-y-6">
                  <h2 className="font-raleway text-xl font-semibold text-ava-anthracite flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Paiement sécurisé
                  </h2>

                  {/* Résumé client */}
                  <div className="bg-ava-gold/10 rounded-xl p-4">
                    <p className="text-sm text-ava-anthracite font-quicksand">
                      <strong>{formData.prenom} {formData.nom}</strong><br />
                      {formData.email} • {formData.telephone}
                    </p>
                    <button
                      onClick={() => setStep('info')}
                      className="text-sm text-ava-coral hover:underline mt-2"
                    >
                      Modifier
                    </button>
                  </div>

                  {/* Zone Stripe (placeholder) */}
                  <div className="border-2 border-dashed border-ava-gold rounded-xl p-8 text-center">
                    <CreditCard className="w-12 h-12 mx-auto text-ava-gold mb-4" />
                    <p className="text-ava-anthracite/70 font-quicksand mb-4">
                      Formulaire de paiement Stripe<br />
                      <span className="text-xs">(À intégrer avec vos clés API)</span>
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handlePayment}
                      loading={isLoading}
                    >
                      Payer {total.toFixed(2)} €
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-xs text-ava-anthracite/50">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Paiement sécurisé
                    </span>
                    <span>•</span>
                    <span>SSL/TLS</span>
                    <span>•</span>
                    <span>Stripe</span>
                  </div>
                </div>
              )}
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="card-ava sticky top-24 space-y-4">
                <h3 className="font-lato font-medium text-ava-anthracite">
                  Votre commande
                </h3>

                {/* Articles */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-ava-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AvaStar size={16} color="#FFEEC2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ava-anthracite truncate">
                          {item.nom}
                        </p>
                        <p className="text-xs text-ava-anthracite/60">
                          "{item.textePersonnalisation}" × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-ava-anthracite">
                        {(item.prix * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="space-y-2 pt-4 border-t border-ava-gold/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-ava-anthracite/70">Sous-total</span>
                    <span>{sousTotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ava-anthracite/70">Livraison</span>
                    <span className={fraisLivraison === 0 ? 'text-green-600' : ''}>
                      {fraisLivraison === 0 ? 'Gratuit' : `${fraisLivraison.toFixed(2)} €`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-ava-gold/30">
                    <span className="font-medium">Total</span>
                    <span className="font-raleway font-bold text-lg text-ava-coral">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
