/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Consultation, BlogArticle, Testimonial, ContactMessage, AdviceDocument, Order, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'serum-lumiere',
    name: 'Sérum Lumière',
    subTitle: 'Éclat & Équilibre',
    category: 'Visage',
    description: 'Élixir régénérant infusé d\'huiles précieuses et d\'actifs botaniques purifiants pour révéler l\'éclat originel de votre visage.',
    detailedDescription: 'Formulé pour tous les types de peau, le Sérum Lumière est une synergie d\'huiles de figue de barbarie sauvage, de jojoba doré et d\'or colloidal 24k. Il pénètre instantanément sans fini gras pour hydrater en profondeur, apaiser les rougeurs et activer le renouvellement cellulaire tout en agissant sur le plan spirituel comme un amplificateur d\'énergie vitale.',
    ingredients: [
      'Huile de Graine de Figue de Barbarie (Opuntia Ficus-Indica)*',
      'Huile de Jojoba Biologique (Simmondsia Chinensis)*',
      'Squalane Végétal Extrait d\'Olive',
      'Or Colloïdal 24k d\'Origine Minérale Naturelle',
      'Huile Essentielle de Rose de Damas Sauvage*',
      'Tocophérol (Vitamine E Naturelle)'
    ],
    usage: [
      'Appliquez 3 à 4 gouttes sur le visage et le cou préalablement nettoyés.',
      'Massez délicatement en effectuant des mouvements circulaires du centre du visage vers l\'extérieur.',
      'Savourer l\'instant en visualisant une onde de pure lumière bienfaitrice envelopper votre visage.'
    ],
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 34,
    featured: true,
    stock: 12
  },
  {
    id: 'elixir-de-venus',
    name: 'L\'Élixir de Vénus',
    subTitle: 'Crème de jour hautement régénérante',
    category: 'Visage',
    description: 'Une crème somptueuse qui fusionne l\'alchimie des plantes sacrées et l\'effet tenseur naturel des minéraux anciens.',
    detailedDescription: 'Cette émulsion d\'une onctuosité royale enveloppe la peau d\'un cocon protecteur et réparateur. Grâce à l\'extrait de Lotus Sacré et à la poudre de Quartz rose micronisée, elle comble les ridules, stimule la production naturelle de collagène et harmonise le chakra du cœur pour une sensation de bien-être absolu.',
    ingredients: [
      'Eau de Source de Montagne Dynamisée (Aqua)',
      'Extrait de Lotus Sacré (Nelumbo Nucifera)*',
      'Beurre de Karité Sauvage Équitable (Butyrospermum Parkii)*',
      'Huile d\'Argan Pressée à Froid*',
      'Poudre de Quartz Rose Purifiée',
      'Acide Hyaluronique d\'Origine Végétale'
    ],
    usage: [
      'Prélevez une perle de crème à l\'aide de la spatule en bois précieux.',
      'Chauffez la matière entre vos paumes de mains pour réveiller la vibration des cristaux.',
      'Appliquez par de légères pressions sur l\'ensemble du visage, le cou et le décolleté chaque matin.'
    ],
    price: 59.00,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 22,
    featured: true,
    stock: 8
  },
  {
    id: 'huile-sacree',
    name: 'Huile Sacrée',
    subTitle: 'Huile de massage corps & rituels',
    category: 'Corps',
    description: 'Soin précieux nourrissant et protecteur au parfum mystique d\'oliban ancestral et de santal pur.',
    detailedDescription: 'Inspirée des onguents sacrés des prêtresses de l\'Antiquité, cette huile sèche sature la peau de nutriments essentiels tout en purifiant l\'énergie subtile du corps. Idéale pour nourrir profondément l\'épiderme après le bain ou pour ancrer vos séances de méditation.',
    ingredients: [
      'Huile d\'Amande Douce Biologique*',
      'Huile de Noisette Sauvage Pressée à Froid',
      'Résine d\'Oliban Somalien (Encens Pur)*',
      'Extrait d\'Écorce de Santal Blanc*',
      'Fleurs de Souci (Calendula Officinalis) Macérées*',
      'Macérat de Myrrhe Sacrée'
    ],
    usage: [
      'Appliquez idéalement sur peau légèrement humide après la douche ou le bain.',
      'Effectuez un massage lent des pieds vers le buste pour stimuler l\'ancrage énergétique.',
      'Peut être versée dans l\'eau chaude du bain pour une immersion méditative complète.'
    ],
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 41,
    featured: true,
    stock: 15
  },
  {
    id: 'savon-ancestral',
    name: 'Savon Ancestral',
    subTitle: 'Purifiant & Nourrissant',
    category: 'Corps',
    description: 'Pain dermatologique saponifié à froid à l\'argile verte médicinale et aux essences protectrices de cèdre et de sauge.',
    detailedDescription: 'Fabriqué à la main avec une infinie patience, ce savon surgras préserve intactes les vertus des beurres végétaux. L\'argile verte volcanique absorbe les impuretés et élimine les toxines cutanées tandis que la sauge sclarée apporte une action purificatrice et équilibrante.',
    ingredients: [
      'Huile d\'Olive Saponifiée*',
      'Huile de Coco Saponifiée*',
      'Beurre de Karité Saponifié Sauvage*',
      'Argile Verte Volcanique Naturelle (Illite)',
      'Huile Essentielle de Sauge Sclarée*',
      'Huile Essentielle de Cèdre de l\'Atlas*'
    ],
    usage: [
      'Faites mousser le savon entre vos mains avec de l\'eau tiède.',
      'Appliquez la mousse onctueuse sur le corps en profitant de l\'arôme purifiant des huiles de forêt.',
      'Rincez abondamment. Laissez sécher le savon sur un support aéré pour prolonger sa longévité.'
    ],
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 18,
    featured: true,
    stock: 25
  },
  {
    id: 'lotion-aura',
    name: 'Brume d\'Aura Astral',
    subTitle: 'Lotion purifiante & Vibratoire',
    category: 'Visage',
    description: 'Une eau florale d\'exception pour équilibrer le sébum, rafraîchir le teint et harmoniser l\'humeur.',
    detailedDescription: 'Formulée à base de distillation divine d\'eau de Fleur d\'Oranger et d\'hydrolat de Lavande vraie sauvage, cette brume est dynamisée selon les mouvements de la lune. Elle fixe le maquillage, resserre les pores et libère l\'esprit du stress quotidien par sa douce vibration olfactive aromathérapeutique.',
    ingredients: [
      'Hydrolat de Fleur d\'Oranger Biologique (Aurantium)*',
      'Hydrolat de Lavande Vraie d\'Altitude*',
      'Argent Colloïdal Purifiant',
      'Extrait de Camomille Matricaire Apaisante*',
      'Vibration d\'Améthyste naturelle infusée sous la pleine Lune'
    ],
    usage: [
      'Vaporisez généreusement à 20cm du visage les yeux fermés, le matin au réveil ou lors d\'un moment stressant.',
      'Laissez infuser les fines gouttelettes sur votre peau sans essuyer.',
      'Prenez une inspiration profonde pour inhaler les effluves d\'oranger et de lavande relaxantes.'
    ],
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 15,
    featured: false,
    stock: 14
  },
  {
    id: 'rituel-protection',
    name: 'Kit de Protection Sacré',
    subTitle: 'Rituel d\'enfumage & Lithothérapie',
    category: 'Rituels',
    description: 'Un coffret mystique réunissant sel d\'Himalaya, bâton de sauge de montagne et cristal de protection.',
    detailedDescription: 'Conçu avec bienveillance selon d\'anciens protocoles holistiques, ce coffret de ritualité contient : un smudge de Sauge Blanche tressé de lavande pour la fumigation, un véritable cristal brute de Quartz Cristallin sourcé de manière éthique, et un sel de purification infusé d\'huiles mystiques de cèdre.',
    ingredients: [
      'Bâton de Sauge Blanche Sauvage (Salvia Apiana) cueilli à la main',
      'Fleurs séchées de Lavande Fine',
      'Cristal de Roche Brut (Quartz) programmé par Monique',
      'Sel Rose de l\'Himalaya non raffiné',
      'Flacon d\'élixir d\'ancrage (10ml)'
    ],
    usage: [
      'Allumez le bâton de sauge et soufflez délicatement pour créer des braises fumantes.',
      'Parcourez les pièces de votre habitat dans le sens des aiguilles d\'une montre pour guider la fumée protectrice.',
      'Méditez en tenant le cristal de roche dans votre main gauche pour aligner votre intention positive.'
    ],
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 29,
    featured: false,
    stock: 5
  }
];

export const mockConsultations: Consultation[] = [
  {
    id: 'générale',
    type: 'general',
    title: 'Consultation Générale Holistique',
    duration: '45 min',
    price: 70,
    shortDescription: 'Bilan énergétique complet, lecture intuitive d\'aura et prescription personnalisée d\'onguents et plantes ancestrales.',
    description: 'Véritable immersion au cœur de votre bien-être global, cette séance menée par Monique Morgat combine détection des blocages physiologiques et subtils, harmonisation d\'aura et conception d\'une routine cosmétique spirituelle sur mesure adaptées à vos besoins profonds. Une ordonnance personnalisée de soins, tisanes initiatiques et rituels vous sera envoyée à l\'issue du rendez-vous.',
    benefits: [
      'Bilan énergétique global de votre état cutané et de vos chakras',
      'Routine de soins personnalisée combinant nutrition et soins holistiques',
      'Cercle de recommandations de plantes médicinales et rituels de relaxation',
      'Fiche-recettes personnalisée de décoctions florales ancestrales'
    ],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'médiumnique',
    type: 'medium',
    title: 'Consultation Médiumnique et Vain de l\'Âme',
    duration: '1h',
    price: 90,
    shortDescription: 'Un voyage spirituel profond pour recevoir les messages des mondes invisibles et illuminer les choix de votre vie.',
    description: 'Séance d\'éveil intense et d\'ancrage par canalisation directe de Monique Morgat. Cette rencontre est dédiée à révéler votre mémoire d\'âme, débloquer les nœuds transgénérationnels et karmiques, et accueillir les guidances et bénédictions issues de vos guides protecteurs et ancêtres bienveillants. Une expérience authentique et respectueuse pour dénouer vos interrogations actuelles et marcher vers votre destin en toute sérénité.',
    benefits: [
      'Communication subtile et canalisations de vos guides spirituels',
      'Nettoyage karmique de lignées familiales ou blessures de l\'âme',
      'Clarté absolue sur vos blocages relationnels, créatifs ou professionnels',
      'Remise d\'un document d\'éveil spirituel rédigé suite à la séance'
    ],
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=600&auto=format&fit=crop'
  }
];

export const mockArticles: BlogArticle[] = [
  {
    id: 'art-de-l-enfumage',
    title: 'L\'Art Sacré de l\'Enfumage : Purifier son Espace de Vie',
    category: 'Ritualité',
    excerpt: 'Découvrez comment utiliser la fumée bénéfique de sauge et d\'encens de myrrhe pour débarrasser votre foyer des vibrations stagnantes.',
    content: `L\'enfumage, ou fumigation, est une pratique spirituelle immémoriale commune à de nombreuses cultures indigènes et traditions sacrées à travers les âges. En brûlant des plantes aromatiques médicinales et des résines précieuses, nous élevons non seulement la fréquence vibratoire de notre espace, mais nous offrons également un rituel de reconnexion mentale de toute beauté.

## Pourquoi purifier sa demeure ?
Notre environnement domestique absorbe continuellement les émotions vécues, les discussions animées, le stress accumulé et les énergies des visiteurs. Lorsque l'atmosphère paraît lourde, étouffante, ou que les habitants peinent à trouver un sommeil réparateur, la fumigation opère comme une douche éthérique salutaire.

## La Sauge Blanche, reine de la purification
La Sauge Blanche (*Salvia Apiana*) est réputée pour ses vertus profondément assainissantes. Son action est immédiate : sa fumée capture les charges ioniques positives générées par le stress et les ondes électromagnétiques pour réinstaurer un climat sain et apaisant.

## Protocole de rituel d'enfumage :
1. **Intention préalable :** Avant même d'allumer votre bâton de plantes, formulez à haute voix ou intérieurement une intention claire : *"Que cet espace se libère du superflu pour n'accueillir que la paix, la joie et la lumière ancestrale."*
2. **L'embrasement :** Enflammer l'extrémité de votre smudge (faisceau de sauge). Laissez la flamme prendre quelques secondes, puis étouffez-la d'un mouvement d'air pour ne préserver qu'une fumée rougeoyante.
3. **Le parcours sacré :** Munissez-vous d'une coupelle en céramique pour recueillir les cendres. Parcourez chaque pièce de la maison de bas en haut, dans le sens horaire, en insistant doucement sur les angles obscurs où les énergies stagnent volontiers.
4. **La libération :** Une fois le circuit achevé, aérez généreusement toutes vos fenêtres pendant 10 minutes pour permettre à la fumée d'évacuer les impuretés vers le ciel.

Répétez ce rituel sacré à chaque nouvelle lune pour sceller l'énergie sainte de votre cocon familial.`,
    author: 'Monique Morgat',
    date: '12 Juin 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1605264964522-374ec3658e16?q=80&w=600&auto=format&fit=crop',
    tags: ['Purification', 'Sauge Sacrée', 'Fumigation', 'Maison Saine']
  },
  {
    id: 'secrets-huile-sacree',
    title: 'Les Secrets de l\'Huile Sacrée sur les Chakras du Corps',
    category: 'Bien-être',
    excerpt: 'Intégrez la force spirituelle de l\'oliban et de la myrrhe dans vos auto-massages quotidiens pour rééquilibrer vos méridiens subtils.',
    content: `Le massage corporel n'est pas uniquement un geste de confort physique ; c'est un canal privilégié de guérison subtile et de communion avec sa propre divinité. Notre **Huile Sacrée**, riche en essences divines d'oliban et de santal, agit en profondeur en entrant en résonance directe avec vos centres énergétiques principaux (les chakras).

## Chakra Racine (Muladhara) : L'Ancrage Initial
L'Huile Sacrée, par ses accents de cèdre noble et d'argan pur, est un outil idéal d'ancrage. En massant la plante de vos pieds et le bas de votre colonne vertébrale, vous reconnectez votre conscience au sol nourricier. Vous dissipez ainsi le sentiment d'instabilité, d'anxiété chronique et de dispersion.

## Chakra du Cœur (Anahata) : L'Amour Pur
La présence d'huiles florales douces de lavande et d'absolu de rose régénère ce portail émotionnel précieux. Appliquez une goutte d'huile au creux de votre poitrine chaque soir en effectuant de doux cercles réguliers. L'inhalation de ces odeurs sacrées apaise les deuils, libère le pardon et instaure un infini amour propre.

## Comment réaliser un rituel résonnant d'auto-massage :
1. Faites chauffer quelques gouttes d\'Huile Sacrée dans le creux de vos mains et fermez les yeux.
2. Inhalez les effluves d\'encens aromatique pendant trois respirations complètes ventrales.
3. Concentrez-vous sur la région centrale que vous souhaitez rééquilibrer et massez lentement avec gratitude pour le temple physique qu'est votre corps.

Sachez apprécier ces mouvements, car honorer son enveloppe physique constitue le premier pas vers une spiritualité épanouie et incarnée.`,
    author: 'Monique Morgat',
    date: '04 Juin 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
    tags: ['Chakras', 'Massage Holistique', 'Huile Sacrée', 'Oliban']
  },
  {
    id: 'cycles-lunaires-beaute',
    title: 'Les Cycles Lunaires dans votre Routine de Beauté Animique',
    category: 'Ésotérisme',
    excerpt: 'Apprenez à calquer l\'application de vos sérums et crèmes sur les phases célestes pour une régénération cellulaire décuplée.',
    content: `La Lune, par son attraction éternelle et cyclique, gouverne les fluides de notre terre : les océans, les sèves végétales, mais également l'eau présente au cœur des cellules de notre derme. Comprendre son influence permet d'adapter intelligemment l'utilisation de vos soins **Vertus Ancestrales** pour sublimer votre éclat charnel.

## La Nouvelle Lune (L'Introspection & la Purification)
Durant cette nuit obscure, la peau entre dans une phase d'élimination intense des toxines.
* **Le soin conseillé :** C'est le moment rêvé pour appliquer nos soins purifiants intenses comme le **Savon Ancestral** à l'argile volcanique verte et réaliser un masque à la sauge sclarée. Évitez de surcharger l'épiderme ; préférez une hydratation légère et fluide.

## La Lune Croissante (L'Assimilation & la Nutrition)
Au fur et à mesure que le disque lunaire grandit, le corps et la peau deviennent extrêmement récepteurs. C'est la période idéale pour nourrir, hydrater, repulper et revitaliser les tissus fatigués.
* **Le soin conseillé :** Le **Sérum Lumière** et **L'Élixir de Vénus** appliqués matin et soir seront absorbés en profondeur. La peau fait alors le plein de nutriments et de minéraux précieux d'or d'une efficacité redoutable.

## La Pleine Lune (L'Apogée & l'Inclusion)
Nuit de forte clarté, où la circulation et l'éclat de la peau sont au maximum. Il est possible de noter une sensibilité cutanée accrue ou des difficultés à s'endormir sereinement.
* **Le soin conseillé :** Calmez l'inflammation vibratoire avec l'hydrolat **Brume d'Aura Astral** infusé de Quartz rose et d'Améthyste. Vaporisez généreusement pour désaltérer la peau et recentrer l'esprit agité.

En synchronisant votre routine terrestre avec la course des astres, vous offrez à votre beauté un éclat intemporel et une synergie profonde avec le Cosmos.`,
    author: 'Monique Morgat',
    date: '28 Mai 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop',
    tags: ['Cycles Lunaires', 'Astrologie', 'Rituel de Beauté', 'Régénération']
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Eléonore R.',
    rating: 5,
    review: 'Le Sérum Lumière a littéralement transformé ma peau en moins de deux semaines. Son odeur divine de rose sauvage me transporte lors de chaque application. Un fini soyeux et spirituel d\'exception !',
    date: '15 Mai 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Jean-Baptiste M.',
    rating: 5,
    review: 'J\'ai pris rendez-vous avec Monique pour une consultation médiumnique. C\'était un moment suspendu d\'une justesse bouleversante. Ses messages de mes guides m\'ont donné force et clarté pour réorienter ma vie.',
    date: '28 Avril 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Aurelia D.',
    rating: 5,
    review: 'Je ne peux plus me passer de l\'Élixir de Vénus ! Sa texture veloutée pénètre à merveille, et je ressens l\'énergie apaisante du Quartz rose au quotidien. Mes traits sont reposés et ma peau lumineuse.',
    date: '02 Juin 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  }
];

export const mockAdviceDocuments: AdviceDocument[] = [
  {
    id: 'doc-1',
    userId: 'u-1',
    title: 'Fiche d\'éveil vibratoire personnalisée',
    description: 'Bilan énergétique complet rédigé par Monique avec conseils nutritionnels et rituels de Lune pour votre routine quotidienne.',
    date: '10 Juin 2026',
    fileSize: '1.4 Mo'
  },
  {
    id: 'doc-2',
    userId: 'u-1',
    title: 'Recueil des infusions de guérison',
    description: 'Protocoles ancestraux de tisanes et élixirs à préparer en harmonie avec vos besoins d\'ancrage racine.',
    date: '05 Avril 2026',
    fileSize: '850 Ko'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'VAL-0941',
    userId: 'u-1',
    customerName: 'Hari Djegui',
    customerEmail: 'haridjegui@gmail.com',
    items: [
      { productId: 'serum-lumiere', productName: 'Sérum Lumière', quantity: 1, price: 45.00 },
      { productId: 'savon-ancestral', productName: 'Savon Ancestral', quantity: 2, price: 12.00 }
    ],
    totalAmount: 69.00,
    shippingAddress: {
      street: '14 Rue Racine',
      city: 'Paris',
      postalCode: '75006',
      country: 'France'
    },
    trackingNumber: 'DHL9284102941',
    status: 'Expédiée',
    createdAt: '2026-06-18T14:32:00Z'
  },
  {
    id: 'VAL-0822',
    userId: 'u-2',
    customerName: 'Sophonie Girard',
    customerEmail: 'sophonie@test.com',
    items: [
      { productId: 'elixir-de-venus', productName: 'L\'Élixir de Vénus', quantity: 1, price: 29.00 }
    ],
    totalAmount: 29.00,
    shippingAddress: {
      street: '42 Avenue des Gobelins',
      city: 'Lyon',
      postalCode: '69002',
      country: 'France'
    },
    trackingNumber: 'DHL8274910287',
    status: 'Livrée',
    createdAt: '2026-05-15T09:12:00Z'
  },
  {
    id: 'VAL-1011',
    userId: 'u-1',
    customerName: 'Hari Djegui',
    customerEmail: 'haridjegui@gmail.com',
    items: [
      { productId: 'huile-sacree', productName: 'Huile Sacrée', quantity: 1, price: 35.00 }
    ],
    totalAmount: 35.00,
    shippingAddress: {
      street: '14 Rue Racine',
      city: 'Paris',
      postalCode: '75006',
      country: 'France'
    },
    status: 'En préparation',
    createdAt: '2026-06-20T17:45:00Z'
  }
];
