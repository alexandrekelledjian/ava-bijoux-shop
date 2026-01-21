// Données de test pour le développement
// À remplacer par les vraies données de la base de données

export interface Produit {
  id: string
  nom: string
  description: string
  prix: number
  imageUrl: string
  mockupUrl: string
  zoneGravure: {
    x: number
    y: number
    width: number
    height: number
    rotation: number
  }
  actif: boolean
  ordre: number
}

export interface Police {
  id: string
  nomGoogleFonts: string
  actif: boolean
  ordre: number
}

// Produits de test
export const mockProduits: Produit[] = [
  {
    id: 'prod_1',
    nom: 'Collier Étoile',
    description: 'Élégant collier avec pendentif étoile personnalisable. Chaîne en acier inoxydable de 45cm, ajustable.',
    prix: 29.90,
    imageUrl: '/images/products/collier-etoile.jpg',
    mockupUrl: '/images/mockups/collier-etoile-mockup.png',
    zoneGravure: { x: 45, y: 55, width: 30, height: 8, rotation: 0 },
    actif: true,
    ordre: 1,
  },
  {
    id: 'prod_2',
    nom: 'Bracelet Infini',
    description: 'Bracelet jonc fin avec symbole infini. Parfait pour graver un prénom ou une date spéciale.',
    prix: 24.90,
    imageUrl: '/images/products/bracelet-infini.jpg',
    mockupUrl: '/images/mockups/bracelet-infini-mockup.png',
    zoneGravure: { x: 35, y: 48, width: 35, height: 6, rotation: 0 },
    actif: true,
    ordre: 2,
  },
  {
    id: 'prod_3',
    nom: 'Bague Personnalisée',
    description: 'Bague fine en acier inoxydable avec gravure sur le dessus. Disponible en plusieurs tailles.',
    prix: 22.90,
    imageUrl: '/images/products/bague-gravee.jpg',
    mockupUrl: '/images/mockups/bague-gravee-mockup.png',
    zoneGravure: { x: 40, y: 45, width: 25, height: 10, rotation: -5 },
    actif: true,
    ordre: 3,
  },
  {
    id: 'prod_4',
    nom: 'Boucles Cœur',
    description: 'Paire de boucles d\'oreilles cœur avec possibilité de graver une initiale.',
    prix: 19.90,
    imageUrl: '/images/products/boucles-coeur.jpg',
    mockupUrl: '/images/mockups/boucles-coeur-mockup.png',
    zoneGravure: { x: 42, y: 50, width: 20, height: 8, rotation: 0 },
    actif: true,
    ordre: 4,
  },
  {
    id: 'prod_5',
    nom: 'Pendentif Médaille',
    description: 'Médaille ronde classique à personnaliser. Idéale pour graver un prénom complet.',
    prix: 27.90,
    imageUrl: '/images/products/pendentif-medaille.jpg',
    mockupUrl: '/images/mockups/pendentif-medaille-mockup.png',
    zoneGravure: { x: 30, y: 35, width: 40, height: 15, rotation: 0 },
    actif: true,
    ordre: 5,
  },
]

// Polices de gravure
export const mockPolices: Police[] = [
  {
    id: 'font_1',
    nomGoogleFonts: 'Homemade Apple',
    actif: true,
    ordre: 1,
  },
  {
    id: 'font_2',
    nomGoogleFonts: 'La Belle Aurore',
    actif: true,
    ordre: 2,
  },
  {
    id: 'font_3',
    nomGoogleFonts: 'Indie Flower',
    actif: true,
    ordre: 3,
  },
  {
    id: 'font_4',
    nomGoogleFonts: 'Nothing You Could Do',
    actif: true,
    ordre: 4,
  },
  {
    id: 'font_5',
    nomGoogleFonts: 'Montserrat',
    actif: true,
    ordre: 5,
  },
]

// Salon de test
export const mockSalon = {
  id: 'salon_1',
  codeUrl: 'DEMO',
  nom: 'Salon Démo',
  adresse: '123 Rue de la Beauté',
  codePostal: '75001',
  ville: 'Paris',
  email: 'demo@salon.fr',
  telephone: '01 23 45 67 89',
  logoUrl: null,
  actif: true,
}
