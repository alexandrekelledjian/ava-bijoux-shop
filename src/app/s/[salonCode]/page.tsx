import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/products/ProductCard'
import { AvaStar } from '@/components/ui/Logo'
import { mockProduits, mockSalon } from '@/lib/data/mock-products'

interface SalonPageProps {
  params: {
    salonCode: string
  }
}

// Cette fonction sera remplacée par un appel à la BDD
async function getSalon(code: string) {
  // Simulation - à remplacer par Prisma
  if (code.toUpperCase() === 'DEMO') {
    return mockSalon
  }
  return null
}

async function getProduits() {
  // Simulation - à remplacer par Prisma
  return mockProduits.filter(p => p.actif).sort((a, b) => a.ordre - b.ordre)
}

export default async function SalonPage({ params }: SalonPageProps) {
  const salon = await getSalon(params.salonCode)
  const produits = await getProduits()

  if (!salon) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AvaStar size={64} color="#FFBB90" className="mx-auto animate-pulse" />
            <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Salon introuvable
            </h1>
            <p className="text-ava-anthracite/70 font-quicksand">
              Ce code salon n'existe pas ou n'est plus actif.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header salonName={salon.nom} />

      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-ava-gold/30 to-ava-cream py-12 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex justify-center gap-2 mb-4">
              <AvaStar size={20} color="#454545" className="animate-sparkle" />
              <AvaStar size={16} color="#FFBB90" className="animate-sparkle" style={{ animationDelay: '0.3s' }} />
              <AvaStar size={20} color="#454545" className="animate-sparkle" style={{ animationDelay: '0.6s' }} />
            </div>
            <h1 className="font-raleway text-3xl sm:text-4xl font-bold text-ava-anthracite">
              Bijoux Personnalisés
            </h1>
            <p className="text-lg text-ava-anthracite/70 font-quicksand max-w-2xl mx-auto">
              Créez un bijou unique avec votre prénom gravé.
              Acier inoxydable de qualité, livraison gratuite en boutique.
            </p>
          </div>
        </section>

        {/* Catalogue produits */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <AvaStar size={16} color="#454545" />
              <h2 className="font-raleway text-2xl font-semibold text-ava-anthracite">
                Nos créations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produits.map((produit) => (
                <ProductCard
                  key={produit.id}
                  product={produit}
                  salonCode={params.salonCode}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section avantages */}
        <section className="bg-ava-anthracite text-ava-cream py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto bg-ava-gold/20 rounded-full flex items-center justify-center">
                  <AvaStar size={24} color="#FFEEC2" />
                </div>
                <h3 className="font-lato font-medium text-lg">Gravure Personnalisée</h3>
                <p className="text-sm text-ava-cream/70 font-quicksand">
                  Votre prénom gravé avec élégance
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto bg-ava-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-lato font-medium text-lg">Acier Inoxydable</h3>
                <p className="text-sm text-ava-cream/70 font-quicksand">
                  Qualité durable, ne s'oxyde pas
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto bg-ava-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
                <h3 className="font-lato font-medium text-lg">Retrait Gratuit</h3>
                <p className="text-sm text-ava-cream/70 font-quicksand">
                  Livraison gratuite chez {salon.nom}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Infos salon */}
        <section className="py-12 px-4">
          <div className="max-w-xl mx-auto card-ava text-center">
            <AvaStar size={24} color="#454545" className="mx-auto mb-4" />
            <h3 className="font-raleway text-xl font-semibold text-ava-anthracite mb-2">
              {salon.nom}
            </h3>
            <p className="text-ava-anthracite/70 font-quicksand mb-4">
              {salon.adresse}<br />
              {salon.codePostal} {salon.ville}
            </p>
            <p className="text-sm text-ava-anthracite/50 font-quicksand">
              Récupérez votre bijou personnalisé directement en boutique
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
