/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export interface ProductMeta {
  formats: string[];
  skinTypes: string[];
  ritualTypes: string[];
  badges: string[];
  benefits: string[];
}

export const getVariantPrice = (productPrice: number, variant: string): number => {
  const cleanVariant = (variant || '').toLowerCase().trim();
  if (cleanVariant.includes('50ml') || cleanVariant === '50ml') {
    // 50ml is 75% of base price
    return Math.round(productPrice * 0.75 * 2) / 2;
  }
  if (cleanVariant.includes('100ml') || cleanVariant === '100ml') {
    // 100ml is base price (100%)
    return productPrice;
  }
  if (cleanVariant.includes('250ml') || cleanVariant === '250ml') {
    // 250ml is 2.1x base price (bulk buy)
    return Math.round(productPrice * 2.1 * 2) / 2;
  }
  return productPrice;
};

export const getProductMeta = (product: Product): ProductMeta => {
  const standardFormats = ['50ml', '100ml', '250ml'];
  
  switch (product.id) {
    case 'serum-lumiere':
      return {
        formats: standardFormats,
        skinTypes: ['Mixte', 'Sensible'],
        ritualTypes: ['Éveil'],
        badges: ['Best Seller', 'Rituel Sacré'],
        benefits: ['Éclat', 'Régénération', 'Équilibre']
      };
    case 'elixir-de-venus':
      return {
        formats: standardFormats,
        skinTypes: ['Sèche', 'Sensible'],
        ritualTypes: ['Éveil'],
        badges: ['Nouveau', 'Édition Limitée'],
        benefits: ['Hydratation', 'Éclat', 'Tenseur']
      };
    case 'huile-sacree':
      return {
        formats: standardFormats,
        skinTypes: ['Sèche', 'Mixte'],
        ritualTypes: ['Purification', 'Protection'],
        badges: ['Rituel Sacré'],
        benefits: ['Nourrissant', 'Apaisement', 'Ancrage']
      };
    case 'savon-ancestral':
      return {
        formats: standardFormats,
        skinTypes: ['Mixte', 'Sèche', 'Sensible'],
        ritualTypes: ['Purification'],
        badges: ['Pureté Sauvage'],
        benefits: ['Purifiant', 'Exfoliant doux', 'Détox']
      };
    case 'lotion-aura':
      return {
        formats: standardFormats,
        skinTypes: ['Mixte', 'Sensible'],
        ritualTypes: ['Purification', 'Éveil'],
        badges: ['Édition Limitée'],
        benefits: ['Énergie', 'Clarté', 'Sérénité']
      };
    case 'rituel-protection':
      return {
        formats: standardFormats,
        skinTypes: ['Sèche', 'Mixte', 'Sensible'],
        ritualTypes: ['Protection', 'Purification'],
        badges: ['Éveil Spirituel', 'Rituel d\'Or'],
        benefits: ['Ancrage', 'Protection', 'Purification']
      };
    default:
      return {
        formats: standardFormats,
        skinTypes: ['Mixte'],
        ritualTypes: ['Éveil'],
        badges: ['Essentiel'],
        benefits: ['Beauté', 'Harmonie', 'Soin']
      };
  }
};

