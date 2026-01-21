'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Logo, { AvaStar } from '@/components/ui/Logo'
import { Mail, ArrowRight } from 'lucide-react'

export default function SalonLoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Veuillez entrer un email valide')
      return
    }

    setIsLoading(true)

    // Ici on intégrera l'envoi du Magic Link
    // Pour l'instant, simulation
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSent(true)
  }

  if (isSent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Email envoyé !
            </h1>
            <p className="text-ava-anthracite/70 font-quicksand">
              Un lien de connexion a été envoyé à<br />
              <strong className="text-ava-anthracite">{email}</strong>
            </p>
            <p className="text-sm text-ava-anthracite/50 font-quicksand">
              Le lien est valable 24 heures.<br />
              Vérifiez aussi vos spams si vous ne le trouvez pas.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-ava-coral hover:underline font-quicksand"
            >
              Utiliser une autre adresse
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="card-ava space-y-8">
            {/* En-tête */}
            <div className="text-center space-y-4">
              <Logo variant="icon" size="md" color="anthracite" className="mx-auto" />
              <div>
                <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
                  Espace Salon Partenaire
                </h1>
                <p className="text-ava-anthracite/70 font-quicksand mt-2">
                  Connectez-vous pour gérer vos commandes
                </p>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Votre email professionnel"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="salon@exemple.fr"
                error={error}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
              >
                Recevoir mon lien de connexion
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Info Magic Link */}
            <div className="bg-ava-gold/20 rounded-xl p-4 space-y-2">
              <h4 className="font-lato font-medium text-sm text-ava-anthracite flex items-center gap-2">
                <AvaStar size={12} color="#454545" />
                Connexion sans mot de passe
              </h4>
              <p className="text-xs text-ava-anthracite/70 font-quicksand">
                Pour votre sécurité, nous utilisons un système de lien magique.
                Vous recevrez un email avec un lien de connexion valable 24h.
              </p>
            </div>
          </div>

          {/* Aide */}
          <p className="text-center text-sm text-ava-anthracite/50 font-quicksand mt-6">
            Vous n'êtes pas encore partenaire ?{' '}
            <a href="mailto:contact@avabijoux.com" className="text-ava-coral hover:underline">
              Contactez-nous
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
