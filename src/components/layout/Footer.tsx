'use client'

import React from 'react'
import Link from 'next/link'
import Logo, { AvaStar } from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-ava-anthracite text-ava-cream mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Logo variant="compact" size="md" color="white" />
            <p className="text-sm text-ava-cream/70 font-quicksand leading-relaxed">
              Bijoux en acier inoxydable personnalisés avec gravure.
              Créez un bijou unique avec votre prénom.
            </p>
            <div className="flex items-center gap-1 text-ava-gold">
              <AvaStar size={12} color="#FFEEC2" />
              <AvaStar size={12} color="#FFEEC2" />
              <AvaStar size={12} color="#FFEEC2" />
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-lato font-medium text-lg mb-4">Informations</h3>
            <ul className="space-y-2 text-sm font-quicksand">
              <li>
                <Link href="/livraison" className="text-ava-cream/70 hover:text-ava-gold transition-colors">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-ava-cream/70 hover:text-ava-gold transition-colors">
                  Conditions Générales de Vente
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-ava-cream/70 hover:text-ava-gold transition-colors">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-ava-cream/70 hover:text-ava-gold transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-lato font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm font-quicksand text-ava-cream/70">
              <li>
                <a href="mailto:contact@avabijoux.com" className="hover:text-ava-gold transition-colors">
                  contact@avabijoux.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/avabijoux" target="_blank" rel="noopener noreferrer" className="hover:text-ava-gold transition-colors">
                  @avabijoux sur Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-ava-cream/10 text-center">
          <p className="text-xs text-ava-cream/50 font-quicksand">
            © {new Date().getFullYear()} AVA Bijoux - Dépôts Gemmes. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
