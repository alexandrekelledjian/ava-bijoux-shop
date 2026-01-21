import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AVA Bijoux - Bijoux Personnalisés en Acier Inoxydable',
  description: 'Découvrez AVA, une marque de bijoux en acier inoxydable personnalisables avec gravure. Créez un bijou unique avec votre prénom.',
  keywords: ['bijoux', 'personnalisé', 'gravure', 'acier inoxydable', 'prénom', 'cadeau'],
  authors: [{ name: 'AVA Bijoux' }],
  openGraph: {
    title: 'AVA Bijoux - Bijoux Personnalisés',
    description: 'Créez un bijou unique avec gravure personnalisée',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FDFFEB" />
      </head>
      <body className="bg-ava-cream min-h-screen">
        {children}
      </body>
    </html>
  )
}
