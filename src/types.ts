/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  subTitle: string;
  description: string;
  detailedDescription: string;
  ingredients: string[];
  usage: string[];
  price: number;
  image: string;
  images?: string[];
  variants?: string[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Consultation {
  id: string;
  type: 'general' | 'medium';
  title: string;
  duration: string;
  price: number;
  shortDescription: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface ConsultationBooking {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  consultationType: 'general' | 'medium';
  consultationTitle: string;
  price: number;
  date: string;
  timeSlot: string;
  status: 'Confirmée' | 'En attente' | 'Terminée';
  notes?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: 'Ésotérisme' | 'Ritualité' | 'Bien-être';
  excerpt: string;
  content: string; // Markdown formatted description or styled HTML blocks
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
  status: 'Payée' | 'En préparation' | 'Expédiée' | 'Livrée';
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'client' | 'admin';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Non lu' | 'Lu' | 'Répondu';
}

export interface AdviceDocument {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  fileSize: string;
}
