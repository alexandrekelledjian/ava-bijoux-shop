'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AvaStar } from '@/components/ui/Logo'
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  Menu,
  X,
  TrendingUp,
  Users,
  Euro,
  AlertCircle
} from 'lucide-react'
import { clsx } from 'clsx'

// Données de démonstration
const mockStats = {
  caTotal: 12450.80,
  commandesEnCours: 23,
  salonsActifs: 450,
  commissionsAVerser: 2890.50,
}

const mockDernieresCommandes = [
  { id: '1', numero: 'AVA-2025-156', salon: 'Coiffure Élégance', montant: 29.90, statut: 'payee' },
  { id: '2', numero: 'AVA-2025-155', salon: 'Salon Marie', montant: 54.80, statut: 'en_preparation' },
  { id: '3', numero: 'AVA-2025-154', salon: 'Beauty Spa', montant: 22.90, statut: 'expediee' },
]

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard, current: true },
  { name: 'Salons', href: '/admin/salons', icon: Store, current: false },
  { name: 'Produits', href: '/admin/produits', icon: Package, current: false },
  { name: 'Commandes', href: '/admin/commandes', icon: ShoppingCart, current: false },
  { name: 'Versements', href: '/admin/versements', icon: CreditCard, current: false },
  { name: 'Paramètres', href: '/admin/parametres', icon: Settings, current: false },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar mobile */}
      <div className={clsx(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-gray-900/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-ava-anthracite">
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-white">
              <AvaStar size={20} color="#FFEEC2" />
              <span className="font-lato font-medium">AVA Admin</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-quicksand transition-colors',
                  item.current
                    ? 'bg-ava-coral text-ava-anthracite'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 bg-ava-anthracite">
          <div className="flex items-center gap-2 h-16 px-4 border-b border-white/10">
            <AvaStar size={24} color="#FFEEC2" />
            <span className="font-lato font-medium text-white">AVA Admin</span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-quicksand transition-colors',
                  item.current
                    ? 'bg-ava-coral text-ava-anthracite'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <Link href="/" className="text-sm text-white/50 hover:text-white font-quicksand">
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="lg:pl-64">
        {/* Header mobile */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)} className="text-ava-anthracite">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-lato font-medium text-ava-anthracite">AVA Admin</span>
        </header>

        <main className="p-6 lg:p-8">
          {/* Titre */}
          <div className="mb-8">
            <h1 className="font-raleway text-2xl font-bold text-ava-anthracite">
              Tableau de bord
            </h1>
            <p className="text-ava-anthracite/60 font-quicksand">
              Vue d'ensemble de l'activité AVA Bijoux
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ava-anthracite/60 font-quicksand">CA Total</p>
                  <p className="text-2xl font-raleway font-bold text-ava-anthracite">
                    {mockStats.caTotal.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ava-anthracite/60 font-quicksand">Commandes en cours</p>
                  <p className="text-2xl font-raleway font-bold text-ava-anthracite">
                    {mockStats.commandesEnCours}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ava-anthracite/60 font-quicksand">Salons actifs</p>
                  <p className="text-2xl font-raleway font-bold text-ava-anthracite">
                    {mockStats.salonsActifs}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ava-anthracite/60 font-quicksand">Commissions à verser</p>
                  <p className="text-2xl font-raleway font-bold text-ava-coral">
                    {mockStats.commissionsAVerser.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div className="w-12 h-12 bg-ava-coral/20 rounded-full flex items-center justify-center">
                  <Euro className="w-6 h-6 text-ava-coral" />
                </div>
              </div>
            </div>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dernières commandes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-lato font-semibold text-ava-anthracite">
                  Dernières commandes
                </h2>
                <Link href="/admin/commandes" className="text-sm text-ava-coral hover:underline">
                  Voir tout
                </Link>
              </div>
              <div className="space-y-3">
                {mockDernieresCommandes.map((cmd) => (
                  <div key={cmd.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-mono text-sm text-ava-anthracite">{cmd.numero}</p>
                      <p className="text-xs text-ava-anthracite/60">{cmd.salon}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-ava-anthracite">{cmd.montant.toFixed(2)} €</p>
                      <span className={clsx(
                        'text-xs px-2 py-0.5 rounded-full',
                        cmd.statut === 'payee' && 'bg-blue-100 text-blue-700',
                        cmd.statut === 'en_preparation' && 'bg-yellow-100 text-yellow-700',
                        cmd.statut === 'expediee' && 'bg-purple-100 text-purple-700',
                      )}>
                        {cmd.statut.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-lato font-semibold text-ava-anthracite mb-4">
                Actions rapides
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/salons/nouveau"
                  className="flex items-center gap-3 p-4 bg-ava-gold/10 rounded-lg hover:bg-ava-gold/20 transition-colors"
                >
                  <Store className="w-5 h-5 text-ava-anthracite" />
                  <span className="text-sm font-quicksand">Ajouter un salon</span>
                </Link>
                <Link
                  href="/admin/produits/nouveau"
                  className="flex items-center gap-3 p-4 bg-ava-gold/10 rounded-lg hover:bg-ava-gold/20 transition-colors"
                >
                  <Package className="w-5 h-5 text-ava-anthracite" />
                  <span className="text-sm font-quicksand">Ajouter un produit</span>
                </Link>
                <Link
                  href="/admin/salons/import"
                  className="flex items-center gap-3 p-4 bg-ava-gold/10 rounded-lg hover:bg-ava-gold/20 transition-colors"
                >
                  <Users className="w-5 h-5 text-ava-anthracite" />
                  <span className="text-sm font-quicksand">Import CSV salons</span>
                </Link>
                <Link
                  href="/admin/versements/nouveau"
                  className="flex items-center gap-3 p-4 bg-ava-gold/10 rounded-lg hover:bg-ava-gold/20 transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-ava-anthracite" />
                  <span className="text-sm font-quicksand">Nouveau versement</span>
                </Link>
              </div>
            </div>

            {/* Alertes */}
            <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
              <h2 className="font-lato font-semibold text-ava-anthracite mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Alertes
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-yellow-800 font-quicksand">
                    3 commandes en attente de fabrication depuis plus de 7 jours
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">ℹ️</span>
                  <span className="text-sm text-blue-800 font-quicksand">
                    12 salons n'ont pas eu de commande ce mois-ci
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
