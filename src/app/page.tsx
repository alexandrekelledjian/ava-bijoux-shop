import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Logo, { AvaStar } from '@/components/ui/Logo'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-ava-gold/40 via-ava-cream to-ava-cream py-20 px-4 overflow-hidden">
          {/* Pattern de fond */}
          <div className="absolute inset-0 bg-ava-stars opacity-30" />

          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center gap-3">
              <AvaStar size={24} color="#454545" className="animate-sparkle" />
              <AvaStar size={16} color="#FFBB90" className="animate-sparkle" style={{ animationDelay: '0.2s' }} />
              <AvaStar size={20} color="#454545" className="animate-sparkle" style={{ animationDelay: '0.4s' }} />
            </div>

            <Logo variant="full" size="xl" color="anthracite" className="mx-auto" />

            <p className="text-xl text-ava-anthracite/80 font-quicksand max-w-2xl mx-auto">
              Bijoux en acier inoxydable personnalisés avec gravure.
              Créez une pièce unique avec votre prénom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/s/DEMO">
                <Button variant="primary" size="lg">
                  Découvrir les bijoux
                </Button>
              </Link>
              <Link href="/salon">
                <Button variant="outline" size="lg">
                  Espace Salon Partenaire
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section caractéristiques */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-raleway text-3xl font-bold text-ava-anthracite mb-4">
                L'élégance personnalisée
              </h2>
              <p className="text-ava-anthracite/70 font-quicksand max-w-2xl mx-auto">
                Chaque bijou AVA est unique, gravé avec soin selon vos souhaits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '✨',
                  title: 'Gravure Personnalisée',
                  description: 'Votre prénom ou celui d\'un être cher gravé avec précision sur votre bijou.',
                },
                {
                  icon: '🛡️',
                  title: 'Acier Inoxydable',
                  description: 'Qualité 316L premium, résistant à l\'eau et hypoallergénique.',
                },
                {
                  icon: '🎁',
                  title: 'Cadeau Idéal',
                  description: 'Un présent unique et personnel pour toutes les occasions.',
                },
              ].map((feature, index) => (
                <div key={index} className="card-ava text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-lato font-semibold text-lg text-ava-anthracite mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ava-anthracite/70 font-quicksand">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section pour les salons */}
        <section className="bg-ava-anthracite text-ava-cream py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <AvaStar size={32} color="#FFEEC2" className="mx-auto" />
            <h2 className="font-raleway text-3xl font-bold">
              Vous êtes un salon partenaire ?
            </h2>
            <p className="text-ava-cream/70 font-quicksand max-w-2xl mx-auto">
              Accédez à votre espace pour suivre les commandes de vos clients
              et gérer les retraits en boutique.
            </p>
            <Link href="/salon">
              <Button variant="secondary" size="lg">
                Accéder à l'espace salon
              </Button>
            </Link>
          </div>
        </section>

        {/* Section admin (temporaire pour dev) */}
        <section className="py-16 px-4 bg-ava-gold/10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Administration
            </h2>
            <p className="text-ava-anthracite/70 font-quicksand">
              Accès réservé à l'équipe AVA / Dépôts Gemmes
            </p>
            <Link href="/admin">
              <Button variant="outline">
                Back-office Admin
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
