import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCustomizer from '@/components/products/ProductCustomizer'
import { AvaStar } from '@/components/ui/Logo'
import { ChevronLeft } from 'lucide-react'
import { mockProduits, mockPolices, mockSalon } from '@/lib/data/mock-products'

interface ProductPageProps {
  params: {
    salonCode: string
    productId: string
  }
}

// Ces fonctions seront remplacées par des appels à la BDD
async function getSalon(code: string) {
  if (code.toUpperCase() === 'DEMO') {
    return mockSalon
  }
  return null
}

async function getProduit(id: string) {
  return mockProduits.find(p => p.id === id && p.actif) || null
}

async function getPolices() {
  return mockPolices.filter(p => p.actif).sort((a, b) => a.ordre - b.ordre)
}

export default async function ProductPage({ params }: ProductPageProps) {
  const salon = await getSalon(params.salonCode)
  const produit = await getProduit(params.productId)
  const polices = await getPolices()

  if (!salon || !produit) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AvaStar size={64} color="#FFBB90" className="mx-auto animate-pulse" />
            <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Produit introuvable
            </h1>
            <p className="text-ava-anthracite/70 font-quicksand">
              Ce produit n'existe pas ou n'est plus disponible.
            </p>
            <Link
              href={`/s/${params.salonCode}`}
              className="inline-flex items-center gap-2 text-ava-coral hover:text-ava-peach transition-colors font-quicksand"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour au catalogue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header salonName={salon.nom} />

      <main className="flex-1 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <nav className="mb-6">
            <Link
              href={`/s/${params.salonCode}`}
              className="inline-flex items-center gap-2 text-ava-anthracite/70 hover:text-ava-coral transition-colors font-quicksand"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour au catalogue
            </Link>
          </nav>

          {/* Contenu produit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Colonne gauche - Mockup sur desktop, en haut sur mobile */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductCustomizer
                product={produit}
                polices={polices}
                salonCode={params.salonCode}
              />
            </div>

            {/* Colonne droite - Infos supplémentaires */}
            <div className="space-y-8 lg:order-first">
              {/* Sur mobile, le customizer est déjà affiché, donc on cache les infos redondantes */}
              <div className="hidden lg:block">
                {/* Les infos seront dans le ProductCustomizer */}
              </div>

              {/* Détails produit */}
              <div className="card-ava space-y-4">
                <h3 className="font-lato font-medium text-lg text-ava-anthracite flex items-center gap-2">
                  <AvaStar size={14} color="#454545" />
                  Détails du bijou
                </h3>
                <ul className="space-y-2 text-sm text-ava-anthracite/70 font-quicksand">
                  <li>• Matière : Acier inoxydable 316L</li>
                  <li>• Finition : Polie miroir</li>
                  <li>• Résistant à l'eau et à l'oxydation</li>
                  <li>• Hypoallergénique</li>
                  <li>• Gravure laser de haute précision</li>
                </ul>
              </div>

              {/* Délais */}
              <div className="card-ava space-y-4">
                <h3 className="font-lato font-medium text-lg text-ava-anthracite flex items-center gap-2">
                  <AvaStar size={14} color="#454545" />
                  Délais de fabrication
                </h3>
                <p className="text-sm text-ava-anthracite/70 font-quicksand">
                  Chaque bijou est gravé à la commande avec soin.
                  Comptez environ <strong>4 à 6 semaines</strong> pour la fabrication et la livraison.
                </p>
              </div>

              {/* Info retrait */}
              <div className="bg-ava-coral/10 border border-ava-coral/30 rounded-xl p-4 space-y-2">
                <h4 className="font-lato font-medium text-ava-anthracite">
                  📍 Retrait gratuit chez {salon.nom}
                </h4>
                <p className="text-sm text-ava-anthracite/70 font-quicksand">
                  {salon.adresse}, {salon.codePostal} {salon.ville}
                </p>
                <p className="text-xs text-ava-anthracite/50 font-quicksand">
                  Vous recevrez un email dès que votre bijou sera disponible.
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
