'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { AvaStar } from '@/components/ui/Logo'
import {
  Package,
  Euro,
  Clock,
  CheckCircle,
  Eye,
  LogOut,
  QrCode,
  Copy
} from 'lucide-react'
import { clsx } from 'clsx'

// Données de démonstration
const mockSalon = {
  nom: 'Salon Démo',
  codeUrl: 'DEMO',
  adresse: '123 Rue de la Beauté, 75001 Paris',
}

const mockCommandes = [
  {
    id: 'cmd_1',
    numero: 'AVA-2025-001',
    date: '2025-01-15',
    client: 'Marie D.',
    produit: 'Collier Étoile',
    personnalisation: 'Marie',
    statut: 'disponible_boutique',
    commission: 8.97,
  },
  {
    id: 'cmd_2',
    numero: 'AVA-2025-002',
    date: '2025-01-18',
    client: 'Sophie L.',
    produit: 'Bracelet Infini',
    personnalisation: 'Sophie',
    statut: 'en_preparation',
    commission: 7.47,
  },
  {
    id: 'cmd_3',
    numero: 'AVA-2025-003',
    date: '2025-01-10',
    client: 'Julie M.',
    produit: 'Bague Personnalisée',
    personnalisation: 'Julie',
    statut: 'recuperee',
    commission: 6.87,
  },
]

const mockStats = {
  commandesEnAttente: 2,
  commissionsEnAttente: 16.44,
  totalCommissions: 89.50,
  commandesRecuperees: 12,
}

const statutLabels: Record<string, { label: string; color: string }> = {
  en_attente_paiement: { label: 'En attente', color: 'bg-gray-100 text-gray-700' },
  payee: { label: 'Payée', color: 'bg-blue-100 text-blue-700' },
  en_preparation: { label: 'En préparation', color: 'bg-yellow-100 text-yellow-700' },
  expediee: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700' },
  disponible_boutique: { label: 'Disponible', color: 'bg-green-100 text-green-700' },
  recuperee: { label: 'Récupérée', color: 'bg-gray-100 text-gray-500' },
}

export default function SalonDashboard() {
  const [copied, setCopied] = useState(false)
  const siteUrl = `https://avabijoux.com/s/${mockSalon.codeUrl}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleMarquerRecuperee = (commandeId: string) => {
    // Ici on intégrera l'appel API
    alert(`Commande ${commandeId} marquée comme récupérée`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-ava-cream">
      {/* Header simplifié pour l'espace salon */}
      <header className="bg-white border-b border-ava-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <AvaStar size={24} color="#454545" />
              <div>
                <span className="font-lato font-medium text-ava-anthracite">
                  {mockSalon.nom}
                </span>
                <span className="hidden sm:inline text-sm text-ava-anthracite/50 ml-2">
                  Espace partenaire
                </span>
              </div>
            </div>
            <Link href="/salon" className="flex items-center gap-2 text-ava-anthracite/70 hover:text-ava-coral transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Déconnexion</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* En-tête avec QR Code */}
          <div className="card-ava">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
                  Tableau de bord
                </h1>
                <p className="text-ava-anthracite/70 font-quicksand">
                  Bienvenue, {mockSalon.nom}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white border border-ava-gold rounded-lg p-3">
                  <QrCode className="w-16 h-16 text-ava-anthracite" />
                </div>
                <div className="text-sm">
                  <p className="font-quicksand text-ava-anthracite/70">Votre lien :</p>
                  <code className="text-xs bg-ava-gold/20 px-2 py-1 rounded">
                    {siteUrl}
                  </code>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1 text-ava-coral hover:underline mt-1"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-ava">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-raleway font-bold text-ava-anthracite">
                    {mockStats.commandesEnAttente}
                  </p>
                  <p className="text-xs text-ava-anthracite/60 font-quicksand">En attente</p>
                </div>
              </div>
            </div>
            <div className="card-ava">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-raleway font-bold text-ava-anthracite">
                    {mockStats.commandesRecuperees}
                  </p>
                  <p className="text-xs text-ava-anthracite/60 font-quicksand">Récupérées</p>
                </div>
              </div>
            </div>
            <div className="card-ava">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ava-coral/20 rounded-full flex items-center justify-center">
                  <Euro className="w-5 h-5 text-ava-coral" />
                </div>
                <div>
                  <p className="text-2xl font-raleway font-bold text-ava-coral">
                    {mockStats.commissionsEnAttente.toFixed(2)}€
                  </p>
                  <p className="text-xs text-ava-anthracite/60 font-quicksand">À recevoir</p>
                </div>
              </div>
            </div>
            <div className="card-ava">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ava-gold/30 rounded-full flex items-center justify-center">
                  <Euro className="w-5 h-5 text-ava-anthracite" />
                </div>
                <div>
                  <p className="text-2xl font-raleway font-bold text-ava-anthracite">
                    {mockStats.totalCommissions.toFixed(2)}€
                  </p>
                  <p className="text-xs text-ava-anthracite/60 font-quicksand">Total perçu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des commandes */}
          <div className="card-ava">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-lato font-semibold text-lg text-ava-anthracite flex items-center gap-2">
                <Package className="w-5 h-5" />
                Commandes récentes
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ava-gold/30">
                    <th className="text-left py-3 px-2 text-sm font-quicksand text-ava-anthracite/70">N° Commande</th>
                    <th className="text-left py-3 px-2 text-sm font-quicksand text-ava-anthracite/70">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-quicksand text-ava-anthracite/70 hidden sm:table-cell">Client</th>
                    <th className="text-left py-3 px-2 text-sm font-quicksand text-ava-anthracite/70">Produit</th>
                    <th className="text-left py-3 px-2 text-sm font-quicksand text-ava-anthracite/70">Statut</th>
                    <th className="text-right py-3 px-2 text-sm font-quicksand text-ava-anthracite/70">Commission</th>
                    <th className="text-right py-3 px-2 text-sm font-quicksand text-ava-anthracite/70">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCommandes.map((commande) => (
                    <tr key={commande.id} className="border-b border-ava-gold/10 hover:bg-ava-gold/5">
                      <td className="py-4 px-2">
                        <span className="font-mono text-sm text-ava-anthracite">
                          {commande.numero}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-sm text-ava-anthracite/70">
                        {new Date(commande.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-4 px-2 text-sm text-ava-anthracite hidden sm:table-cell">
                        {commande.client}
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <p className="text-sm text-ava-anthracite">{commande.produit}</p>
                          <p className="text-xs text-ava-anthracite/50">"{commande.personnalisation}"</p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={clsx(
                          'badge-ava',
                          statutLabels[commande.statut]?.color
                        )}>
                          {statutLabels[commande.statut]?.label}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <span className="font-medium text-ava-coral">
                          {commande.commission.toFixed(2)}€
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        {commande.statut === 'disponible_boutique' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleMarquerRecuperee(commande.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Récupérée
                          </Button>
                        ) : (
                          <button className="text-ava-anthracite/40 hover:text-ava-coral transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Aide */}
          <div className="bg-ava-gold/20 rounded-xl p-6 text-center">
            <AvaStar size={24} color="#454545" className="mx-auto mb-4" />
            <h3 className="font-lato font-medium text-ava-anthracite mb-2">
              Besoin d'aide ?
            </h3>
            <p className="text-sm text-ava-anthracite/70 font-quicksand mb-4">
              Contactez l'équipe AVA pour toute question
            </p>
            <a
              href="mailto:partenaires@avabijoux.com"
              className="text-ava-coral hover:underline font-quicksand"
            >
              partenaires@avabijoux.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
