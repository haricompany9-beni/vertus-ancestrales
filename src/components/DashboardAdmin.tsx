/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, ShoppingBag, Calendar, FileText, Star, Users, Plus, Edit, Trash2, 
  CheckCircle, RefreshCw, Eye, Truck, UserCheck, Inbox, MessageSquare 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Order, ConsultationBooking, BlogArticle, Testimonial, User, ContactMessage } from '../types';

interface DashboardAdminProps {
  products: Product[];
  orders: Order[];
  bookings: ConsultationBooking[];
  articles: BlogArticle[];
  testimonials: Testimonial[];
  users: User[];
  contacts: ContactMessage[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status'], tracking?: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: ConsultationBooking['status']) => void;
  onAddArticle: (article: BlogArticle) => void;
  onDeleteArticle: (id: string) => void;
  onApproveTestimonial: (id: string) => void;
  onDeleteTestimonial: (id: string) => void;
  onReplyContact: (id: string) => void;
}

// Helper to compress and scale images selected from local computer to be safe for localStorage limits (max 800x800, 75% quality)
const compressImage = (file: File, maxWidth: number = 800, maxHeight: number = 800): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress quality to 75% to save space
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
          resolve(compressedBase64);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const DashboardAdmin: React.FC<DashboardAdminProps> = ({
  products,
  orders,
  bookings,
  articles,
  testimonials,
  users,
  contacts,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateBookingStatus,
  onAddArticle,
  onDeleteArticle,
  onApproveTestimonial,
  onDeleteTestimonial,
  onReplyContact,
}) => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'products' | 'orders' | 'consultations' | 'blog' | 'testimonials' | 'users' | 'contacts'>('kpis');

  // Local state for adding/editing product
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<string>('Visage');
  const [categories, setCategories] = useState<string[]>(['Visage', 'Corps', 'Rituels']);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [newCustomCategory, setNewCustomCategory] = useState('');
  const [newProdSubtitle, setNewProdSubtitle] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdDetailedDesc, setNewProdDetailedDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(25);
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdImages, setNewProdImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newProdVariants, setNewProdVariants] = useState<string[]>(['50ml', '100ml', '250ml']);
  const [customVariantInput, setCustomVariantInput] = useState('');

  // Local state for tracking order edit
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [dhlTrackInput, setDhlTrackInput] = useState('');

  // Local state for adding blog
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState<'Ésotérisme' | 'Ritualité' | 'Bien-être'>('Bien-être');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  // KPIs Calculations
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const pendingOrdersCount = orders.filter(o => o.status === 'En préparation').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'En attente').length;

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setNewProdName(prod.name);
    setNewProdCategory(prod.category);
    setNewProdSubtitle(prod.subTitle);
    setNewProdDesc(prod.description);
    setNewProdDetailedDesc(prod.detailedDescription);
    setNewProdPrice(prod.price);
    setNewProdImage(prod.image);
    setNewProdStock(prod.stock);
    setNewProdImages(prod.images && prod.images.length > 0 ? prod.images : [prod.image].filter(Boolean));
    setNewProdVariants(prod.variants && prod.variants.length > 0 ? prod.variants : ['50ml', '100ml', '250ml']);
    setCustomVariantInput('');
    setShowCustomCategory(false);
    setNewCustomCategory('');
    setShowProductModal(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setNewProdName('');
    setNewProdCategory('Visage');
    setNewProdSubtitle('');
    setNewProdDesc('');
    setNewProdDetailedDesc('');
    setNewProdPrice(25.00);
    setNewProdImage('https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop');
    setNewProdStock(15);
    setNewProdImages(['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop']);
    setNewProdVariants(['50ml', '100ml', '250ml']);
    setCustomVariantInput('');
    setShowCustomCategory(false);
    setNewCustomCategory('');
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const mainImg = newProdImages[0] || 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop';

    const prodData: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      subTitle: newProdSubtitle,
      description: newProdDesc,
      detailedDescription: newProdDetailedDesc,
      ingredients: editingProduct ? editingProduct.ingredients : ['Plantes sauvages biologiques', 'Eau dynamisée', 'Vibration lunaire'],
      usage: editingProduct ? editingProduct.usage : ['À appliquer sur peau purifiée', 'Symphonie spirituelle aromatique'],
      price: Number(newProdPrice),
      image: mainImg,
      images: newProdImages,
      variants: newProdVariants,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 0,
      featured: editingProduct ? editingProduct.featured : false,
      stock: Number(newProdStock)
    };

    if (editingProduct) {
      onEditProduct(prodData);
    } else {
      onAddProduct(prodData);
    }
    setShowProductModal(false);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;

    const newArticle: BlogArticle = {
      id: `art-${Date.now()}`,
      title: blogTitle,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      author: 'Monique Morgat',
      date: 'Aujourd\'hui',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=600&auto=format&fit=crop',
      tags: ['Sagesse', 'Soin Sacré', 'Botanique']
    };

    onAddArticle(newArticle);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setShowBlogModal(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12"
    >
      {/* Admin Title bar banner */}
      <div className="bg-[#FAF8F3] border border-[#E8DFC9] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-sans tracking-widest text-[#C8A96B] font-semibold">Portail Dirigeant</span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1F3B2F] font-semibold mt-1">Conduite de "Vertus Ancestrales"</h1>
          <p className="text-xs text-[#6B7280] font-sans mt-1">Surveillez l'activité des commandes, le calendrier de Monique, les blogueurs et stocks.</p>
        </div>
        <div className="flex bg-[#1F3B2F] text-white px-5 py-2.5 rounded text-xs gap-2 font-mono">
          <span className="text-[#C8A96B]">STATUT:</span>
          <span>ADMINISTRATEUR ACTIF</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Admin Controls */}
        <nav className="lg:col-span-3 bg-white border border-[#E8DFC9]/40 rounded-xl p-4 flex flex-col gap-1 shadow-sm">
          <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-sans px-3 mb-2">Sections Administration</p>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'kpis'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <TrendingUp size={15} />
            <span>Indicateurs & Ventes</span>
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'products'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <ShoppingBag size={15} />
            <span>Catalogue Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'orders'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <Truck size={15} />
            <span>Commandes Client ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="ml-auto bg-[#D64545] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'consultations'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <Calendar size={15} />
            <span>Séances Monique ({bookings.length})</span>
            {pendingBookingsCount > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {pendingBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'blog'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <FileText size={15} />
            <span>Articles de Blog ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'testimonials'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <Star size={15} />
            <span>Avis & Témoignages ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'contacts'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <Inbox size={15} />
            <span>Inscriptions & Messages ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'users'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#FAF8F3] hover:text-[#1F3B2F]'
            }`}
          >
            <Users size={15} />
            <span>Fichier Clients ({users.length})</span>
          </button>
        </nav>

        {/* Dynamic Display Area */}
        <div className="lg:col-span-9 bg-[#FAF8F3]/60 border border-[#E8DFC9]/40 sm:p-8 p-6 rounded-xl shadow-sm min-h-[550px]">
          
          {/* TAB: KPIS OVERVIEW */}
          {activeTab === 'kpis' && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Chiffres d'affaires & Rendements</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-[#E8DFC9]/30 rounded-xl p-5 shadow-sm">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Chiffre d'Affaire</span>
                  <p className="font-serif text-2xl font-bold text-[#1F3B2F] mt-2">{totalRevenue.toFixed(2)} €</p>
                  <p className="text-[10px] text-[#1F7A4D] font-sans mt-1">↑ 100% Transactions Stripe</p>
                </div>
                <div className="bg-white border border-[#E8DFC9]/30 rounded-xl p-5 shadow-sm">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Panier Moyen</span>
                  <p className="font-serif text-2xl font-bold text-[#1F3B2F] mt-2">{avgOrderValue.toFixed(2)} €</p>
                  <p className="text-[10px] text-[#556B2F] font-sans mt-1">Cosmétiques de prestige</p>
                </div>
                <div className="bg-white border border-[#E8DFC9]/30 rounded-xl p-5 shadow-sm">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Commandes En cours</span>
                  <p className="font-serif text-2xl font-bold text-[#FAF8F3] mt-2 bg-[#D64545] inline-block px-3 py-0.5 rounded text-white font-sans">{pendingOrdersCount}</p>
                  <p className="text-[10px] text-[#D64545] font-sans mt-1 font-semibold">À préparer d'urgence</p>
                </div>
                <div className="bg-white border border-[#E8DFC9]/30 rounded-xl p-5 shadow-sm">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Soins en Attente</span>
                  <p className="font-serif text-2xl font-bold text-amber-600 mt-2">{pendingBookingsCount}</p>
                  <p className="text-[10px] text-amber-600 font-sans mt-1">Sagesse & guidances</p>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-xl border border-[#E8DFC9]/40 p-5 mt-4">
                <h3 className="font-serif text-base font-semibold text-[#1F3B2F] mb-4.5">Ventes et expéditions récentes</h3>
                <div className="overflow-x-auto text-[11px] sm:text-xs text-[#3B2F2F]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E8DFC9]/30 text-[#6B7280] uppercase tracking-wider font-sans pb-3">
                        <th className="py-2.5">ID Commande</th>
                        <th>Client</th>
                        <th>Montant</th>
                        <th>Date</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFC9]/20">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF8F3]/50">
                          <td className="py-3 font-mono font-bold text-[#C8A96B]">{ord.id}</td>
                          <td>{ord.customerName}</td>
                          <td className="font-semibold">{ord.totalAmount.toFixed(2)} €</td>
                          <td>{new Date(ord.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded border border-[#E8DFC9]/40 bg-zinc-50">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CATALOGUE PRODUCTS */}
          {activeTab === 'products' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Gamme de produits et Stock</h2>
                <button 
                  onClick={handleOpenAddProduct}
                  className="bg-[#1F3B2F] hover:bg-[#556B2F] text-[#FAF8F3] text-[10px] tracking-widest uppercase font-semibold px-4 py-2.5 rounded transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus size={13} />
                  <span>Nouveau produit</span>
                </button>
              </div>

              <div className="overflow-x-auto text-xs mt-3 bg-white border border-[#E8DFC9]/40 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8DFC9]/30 text-[#6B7280] uppercase bg-gray-50/50 py-3 px-4">
                      <th className="p-3">Visuel</th>
                      <th>Nom du produit</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Stock restant</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFC9]/20">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF8F3]/40">
                        <td className="p-3">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded object-cover border border-[#E8DFC9]/50"
                          />
                        </td>
                        <td className="font-serif font-medium text-sm text-[#1F3B2F]">{prod.name}</td>
                        <td>{prod.category}</td>
                        <td className="font-bold">{prod.price.toFixed(2)} €</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                            prod.stock <= 5 
                              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                              : 'bg-green-50 text-green-700'
                          }`}>
                            {prod.stock} unités
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2 text-[#6B7280]">
                            <button 
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1 hover:text-[#C8A96B]" 
                              title="Modifier"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Supprimer définitivement l'article ${prod.name} ?`)) {
                                  onDeleteProduct(prod.id);
                                }
                              }}
                              className="p-1 hover:text-[#D64545]" 
                              title="Retirer de la vente"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ORDERS PIPELINE */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Fulfillment et colis DHL</h2>
              
              <div className="flex flex-col gap-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-[#E8DFC9]/35 bg-white p-5 rounded-lg flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E8DFC9]/10 pb-3">
                      <div>
                        <p className="text-xs font-semibold text-[#1F3B2F]">ID de Commande : #{ord.id}</p>
                        <p className="text-[10px] text-[#6B7280] font-sans">Acheteur : {ord.customerName} ({ord.customerEmail})</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select 
                          className="border border-[#E8DFC9] px-2 py-1 text-[11px] rounded focus:outline-none"
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['status'], ord.trackingNumber)}
                        >
                          <option value="Payée">Payée</option>
                          <option value="En préparation">En préparation</option>
                          <option value="Expédiée">Expédiée</option>
                          <option value="Livrée">Livrée</option>
                        </select>
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 border text-[#3B2F2F]">
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    {/* Products details */}
                    <div className="text-[11px] flex flex-col gap-1.5 font-sans">
                      {ord.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-[#3B2F2F]">
                          <span>{it.quantity}x {it.productName}</span>
                          <span className="text-[#6B7280]">{it.price.toFixed(2)} €</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold border-t border-dashed border-[#E8DFC9] pt-2 text-[#1F3B2F] mt-1 text-xs">
                        <span>Total Payé</span>
                        <span>{ord.totalAmount.toFixed(2)} €</span>
                      </div>
                    </div>

                    {/* DHL tracking action block */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC9]/50 p-2.5 rounded text-[11px] font-sans flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[#556B2F]">
                        <Truck size={14} />
                        <span>Colis DHL : {ord.trackingNumber || 'Non attribué'}</span>
                      </div>
                      
                      {trackingOrderId === ord.id ? (
                        <div className="flex gap-1.5 w-full sm:w-auto">
                          <input 
                            type="text" 
                            className="bg-white border border-[#E8DFC9] px-2 py-1 rounded text-[10px] w-full sm:w-32 focus:outline-none"
                            placeholder="Saisir n° DHL..."
                            value={dhlTrackInput}
                            onChange={(e) => setDhlTrackInput(e.target.value)}
                          />
                          <button 
                            onClick={() => {
                              onUpdateOrderStatus(ord.id, 'Expédiée', dhlTrackInput);
                              setTrackingOrderId(null);
                              setDhlTrackInput('');
                            }}
                            className="bg-[#1F3B2F] text-white px-2.5 py-1 rounded text-[9px] uppercase font-bold"
                          >
                            Valider
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setTrackingOrderId(ord.id);
                            setDhlTrackInput(ord.trackingNumber || '');
                          }}
                          className="text-[#C8A96B] hover:underline font-bold text-[10px] uppercase cursor-pointer"
                        >
                          {ord.trackingNumber ? 'Éditer Code DHL' : 'Assigner de suite DHL'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SÉANCES DE CONSULTATION */}
          {activeTab === 'consultations' && (
            <div className="flex flex-col gap-6 animate-fade-in font-sans">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Rendez-vous et séances de canalisation</h2>
              <p className="text-xs text-[#6B7280]">Suivez ou complétez les rendez-vous du calendrier de consultations de Monique Morgat.</p>

              <div className="flex flex-col gap-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-[#E8DFC9]/30 bg-white p-4.5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] text-[#C8A96B] uppercase font-bold">{booking.consultationTitle}</span>
                      <h3 className="font-serif text-base font-semibold text-[#1F3B2F] mt-1">{booking.userName}</h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">Le {booking.date} de {booking.timeSlot} • client: {booking.userEmail}</p>
                      {booking.notes && (
                        <p className="text-xs italic bg-gray-50 border p-2 rounded mt-2 text-gray-600">Notes client: "{booking.notes}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select 
                        className="border border-[#E8DFC9] px-2 py-1 text-[11px] rounded"
                        value={booking.status}
                        onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as ConsultationBooking['status'])}
                      >
                        <option value="En attente">En attente</option>
                        <option value="Confirmée">Confirmée</option>
                        <option value="Terminée">Terminée</option>
                      </select>
                      <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-gray-100 rounded border">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BLOG ARTICLES */}
          {activeTab === 'blog' && (
            <div className="flex flex-col gap-6 animate-fade-in font-sans">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Éditeur de blog d'ésotérisme</h2>
                <button 
                  onClick={() => setShowBlogModal(true)}
                  className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-2 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Rédiger article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {articles.map((art) => (
                  <div key={art.id} className="border border-[#E8DFC9]/30 bg-white p-4 rounded-lg flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={art.image} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded object-cover border"
                      />
                      <div>
                        <span className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 border rounded-full">{art.category}</span>
                        <h4 className="font-serif font-semibold text-[#1F3B2F] mt-1 text-sm">{art.title}</h4>
                        <span className="text-[10px] text-gray-500">Le {art.date} par {art.author}</span>
                      </div>
                    </div>
                    <div>
                      <button 
                        onClick={() => {
                          if (confirm(`Retirer cet article : "${art.title}" ?`)) {
                            onDeleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 hover:text-[#D64545]"
                        title="Archiver"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TESTIMONIALS MODERATOR */}
          {activeTab === 'testimonials' && (
            <div className="flex flex-col gap-6 animate-fade-in font-sans">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Modération des avis et notes stellaires</h2>
              
              <div className="flex flex-col gap-4">
                {testimonials.map((test) => (
                  <div key={test.id} className="border border-[#E8DFC9]/35 bg-white p-4.5 rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#1F3B2F]">{test.name}</span>
                        <span className="text-[10px] text-gray-400">• {test.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#C8A96B]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} className={i < test.rating ? 'fill-current' : 'opacity-20'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs italic text-gray-600 leading-relaxed">
                      "{test.review}"
                    </p>
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-[10px] text-[#1F7A4D] bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        Avis Approuvé
                      </span>
                      <button 
                        onClick={() => onDeleteTestimonial(test.id)}
                        className="text-xs text-red-600 hover:underline font-bold uppercase text-[10px]"
                      >
                        Archiver l'avis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACTS & MESSAGES */}
          {activeTab === 'contacts' && (
            <div className="flex flex-col gap-6 animate-fade-in font-sans">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Messages de contact reçus ({contacts.length})</h2>
              
              <div className="flex flex-col gap-5">
                {contacts.map((msg) => (
                  <div key={msg.id} className="border border-[#E8DFC9]/30 bg-white p-4.5 rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-xs text-[#1F3B2F]">{msg.name}</h4>
                        <span className="text-[10px] text-gray-500">{msg.email} • Recu le {msg.date}</span>
                      </div>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 border rounded-full ${
                        msg.status === 'Non lu' 
                          ? 'bg-rose-50 text-rose-700 border-rose-100' 
                          : 'bg-green-50 text-green-700'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#1F3B2F]">{msg.subject}</p>
                      <p className="text-xs text-[#3B2F2F] mt-1 leading-relaxed bg-[#FAF8F3] p-2 rounded italic">
                        "{msg.message}"
                      </p>
                    </div>

                    {msg.status === 'Non lu' && (
                      <div className="flex justify-end pt-2">
                        <button 
                          onClick={() => {
                            onReplyContact(msg.id);
                            alert(`Une réponse type de prestige a été simulée et envoyée avec succès à ${msg.email}.`);
                          }}
                          className="bg-[#1F3B2F] hover:bg-[#C8A96B] hover:text-white text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-all focus:outline-none"
                        >
                          Marquer lu / Répondre
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CLIENT USERS */}
          {activeTab === 'users' && (
            <div className="flex flex-col gap-6 animate-fade-in font-sans">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1F3B2F]">Fichiers et inscriptions clients</h2>
              
              <div className="overflow-x-auto text-xs bg-white border border-[#E8DFC9]/40 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8DFC9]/30 text-gray-500 bg-gray-50 py-3">
                      <th className="p-3">Utilisateur</th>
                      <th>Email de contact</th>
                      <th>Numéro</th>
                      <th>Rôle système</th>
                      <th className="p-3">Créé le</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((us) => (
                      <tr key={us.id} className="hover:bg-gray-50">
                        <td className="p-3 font-serif font-medium text-[#1F3B2F]">
                          {us.firstName} {us.lastName}
                        </td>
                        <td className="font-mono text-gray-600">{us.email}</td>
                        <td>{us.phone || 'Non renseigné'}</td>
                        <td>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold border ${
                            us.role === 'admin' 
                              ? 'bg-purple-100 text-purple-700 border-purple-200' 
                              : 'bg-green-50 text-green-700 border-green-200'
                          }`}>
                            {us.role}
                          </span>
                        </td>
                        <td className="p-3 text-gray-400">{new Date(us.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3B2F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-[#C8A96B]/20">
            <div className="bg-[#1F3B2F] p-5 text-[#FAF8F3] flex justify-between items-center shrink-0">
              <h3 className="font-serif text-lg font-medium">
                {editingProduct ? `Modifier le produit "${editingProduct.name}"` : 'Créer un nouveau produit'}
              </h3>
              <button 
                onClick={() => setShowProductModal(false)}
                className="text-[#FAF8F3] hover:text-[#C8A96B] font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 flex flex-col gap-4 font-sans text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Nom du produit</label>
                  <input
                    type="text"
                    className="border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none focus:border-[#C8A96B]"
                    placeholder="Sérum de Lune, etc."
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Catégorie</label>
                  {!showCustomCategory ? (
                    <div className="flex gap-2">
                      <select
                        className="flex-1 border border-[#E8DFC9] px-3 py-2 rounded bg-white focus:outline-none"
                        value={categories.includes(newProdCategory) ? newProdCategory : ''}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setShowCustomCategory(true);
                            setNewCustomCategory('');
                          } else {
                            setNewProdCategory(e.target.value);
                          }
                        }}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="__custom__">Autre (créer)...</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none focus:border-[#C8A96B]"
                        placeholder="Nouvelle catégorie..."
                        value={newCustomCategory}
                        onChange={(e) => setNewCustomCategory(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const trimmed = newCustomCategory.trim();
                          if (trimmed && !categories.includes(trimmed)) {
                            setCategories([...categories, trimmed]);
                          }
                          if (trimmed) {
                            setNewProdCategory(trimmed);
                          }
                          setShowCustomCategory(false);
                          setNewCustomCategory('');
                        }}
                        className="bg-[#1F3B2F] hover:bg-[#556B2F] text-[#FAF8F3] font-serif text-xs px-4 py-2 rounded cursor-pointer transition-colors"
                      >
                        Valider
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCustomCategory(false);
                          setNewCustomCategory('');
                        }}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-3 py-2 rounded transition-all text-xs"
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Bannière courte (SubTitle)</label>
                <input
                  type="text"
                  className="border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none"
                  placeholder="Éclat subtil, nutrition spirituelle..."
                  value={newProdSubtitle}
                  onChange={(e) => setNewProdSubtitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Prix unitaire (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Stock Initial</label>
                  <input
                    type="number"
                    className="border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-gray-700">Images du produit (Sélectionner depuis votre ordinateur)</label>
                  <span className="text-[10px] text-gray-400 font-sans font-medium">Multiples images • Drag & Drop</span>
                </div>
                
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    if (files.length === 0) return;
                    setIsUploading(true);
                    try {
                      const base64Promises = files.map(file => compressImage(file as File));
                      const results = await Promise.all(base64Promises);
                      setNewProdImages(prev => [...prev, ...results]);
                    } catch (err) {
                      console.error("Error compressing dropped images", err);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  className="border-2 border-dashed border-[#C8A96B]/30 hover:border-[#1F3B2F]/60 bg-[#FAF8F3]/40 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 relative group flex flex-col items-center justify-center gap-1.5"
                  onClick={() => document.getElementById('product-images-input')?.click()}
                >
                  <input
                    id="product-images-input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      if (files.length === 0) return;
                      setIsUploading(true);
                      try {
                        const base64Promises = files.map(file => compressImage(file as File));
                        const results = await Promise.all(base64Promises);
                        setNewProdImages(prev => {
                          // Keep unique images or just combine
                          return [...prev, ...results];
                        });
                      } catch (err) {
                        console.error("Error compressing uploaded images", err);
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                  />
                  <div className="text-[#1F3B2F] group-hover:text-[#C8A96B] transition-colors p-2 bg-white rounded-full border border-[#E8DFC9]/30 shadow-xs">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-gray-700 font-medium">Déposez vos images ici ou <span className="text-[#C8A96B] underline font-semibold">parcourez vos fichiers</span></p>
                    <p className="text-[10px] text-gray-400">JPEG, PNG • Compression automatique pour l'officine</p>
                  </div>

                  {isUploading && (
                    <div className="absolute inset-0 bg-[#FAF8F3]/90 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#1F3B2F] border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-serif italic text-gray-700 text-xs">Alchimie et traitement des images du produit...</span>
                    </div>
                  )}
                </div>

                {/* Live Preview List */}
                {newProdImages.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-1">
                    <p className="text-[10px] uppercase font-sans tracking-wider text-gray-500 font-bold">Galerie d'images ({newProdImages.length})</p>
                    <div className="grid grid-cols-5 gap-2.5">
                      {newProdImages.map((imgSrc, idx) => {
                        const isPrimary = idx === 0;
                        return (
                          <div 
                            key={idx}
                            className={`group relative aspect-square rounded-lg overflow-hidden border transition-all ${
                              isPrimary ? 'border-[#C8A96B] ring-2 ring-[#C8A96B]/20' : 'border-[#E8DFC9]/30 hover:border-gray-400'
                            }`}
                          >
                            <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                            
                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1 z-10">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNewProdImages(prev => prev.filter((_, i) => i !== idx));
                                }}
                                className="self-end bg-[#D64545] text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer shadow-xs"
                                title="Supprimer l'image"
                              >
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Move to top to make primary
                                    setNewProdImages(prev => {
                                      const updated = [...prev];
                                      const [target] = updated.splice(idx, 1);
                                      return [target, ...updated];
                                    });
                                  }}
                                  className="w-full bg-[#1F3B2F] text-white text-[9px] py-0.5 rounded font-medium hover:bg-[#556B2F] transition-colors cursor-pointer shadow-xs"
                                >
                                  Principal
                                </button>
                              )}
                            </div>

                            {/* Badges */}
                            {isPrimary && (
                              <span className="absolute bottom-1 left-1 bg-[#C8A96B] text-white text-[8px] px-1.5 py-0.5 rounded font-sans font-semibold z-10 shadow-xs">
                                Couv.
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 border-t border-b border-stone-100 py-3 my-1">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[#1F3B2F]">Contenances / Variantes du produit</label>
                  <span className="text-[10px] text-gray-400 font-sans font-medium">Ajoutez ou supprimez les contenances</span>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none focus:border-[#C8A96B]"
                    placeholder="Ex: 50ml, 100ml, Roll-on 15ml, etc."
                    value={customVariantInput}
                    onChange={(e) => setCustomVariantInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (customVariantInput.trim() && !newProdVariants.includes(customVariantInput.trim())) {
                          setNewProdVariants([...newProdVariants, customVariantInput.trim()]);
                          setCustomVariantInput('');
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customVariantInput.trim() && !newProdVariants.includes(customVariantInput.trim())) {
                        setNewProdVariants([...newProdVariants, customVariantInput.trim()]);
                        setCustomVariantInput('');
                      }
                    }}
                    className="bg-[#1F3B2F] hover:bg-[#556B2F] text-[#FAF8F3] font-serif text-xs px-4 py-2 rounded cursor-pointer transition-colors"
                  >
                    Ajouter
                  </button>
                </div>

                {newProdVariants.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {newProdVariants.map((variant, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-[#FAF8F3] border border-[#E8DFC9] text-[#1F3B2F] font-sans font-semibold text-xs px-2.5 py-1 rounded-full shadow-2xs"
                      >
                        {variant}
                        <button
                          type="button"
                          onClick={() => setNewProdVariants(newProdVariants.filter((_, i) => i !== index))}
                          className="text-gray-400 hover:text-red-500 font-bold font-mono text-[10px] cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10.5px] italic text-amber-600 font-serif mt-1">
                    Attention : Sans variante, le format par défaut "100ml" sera proposé.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Description courte</label>
                <textarea
                  className="border border-[#E8DFC9] px-3 py-1.5 rounded h-16 resize-none focus:outline-none"
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Description détaillée alchimique</label>
                <textarea
                  className="border border-[#E8DFC9] px-3 py-1.5 rounded h-20 resize-none focus:outline-none"
                  value={newProdDetailedDesc}
                  onChange={(e) => setNewProdDetailedDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-5 py-2.5 rounded transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white font-semibold px-6 py-2.5 rounded transition-all"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD BLOG */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3B2F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-[#C8A96B]/20">
            <div className="bg-[#1F3B2F] p-5 text-[#FAF8F3] flex justify-between items-center shrink-0">
              <h3 className="font-serif text-lg font-medium">Rédiger une Note d'Ésotérisme / Botanique</h3>
              <button onClick={() => setShowBlogModal(false)} className="text-[#FAF8F3] hover:text-[#C8A96B] font-bold text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 flex flex-col gap-4 font-sans text-xs overflow-y-auto flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Titre de l'article</label>
                <input
                  type="text"
                  className="border border-[#E8DFC9] px-3 py-2 rounded focus:outline-none"
                  placeholder="La face cachée d'Argan sauvage..."
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Catégorie</label>
                <select
                  className="border border-[#E8DFC9] px-3 py-2 rounded bg-white focus:outline-none"
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value as any)}
                >
                  <option value="Ésotérisme">Ésotérisme</option>
                  <option value="Ritualité">Ritualité</option>
                  <option value="Bien-être">Bien-être</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Résumé court (Excerpt)</label>
                <input
                  type="text"
                  className="border border-[#E8DFC9] px-3 py-2 rounded"
                  placeholder="En quelques phrases..."
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Contenu de l'article (Supports Markdown / Formes)</label>
                <textarea
                  className="border border-[#E8DFC9] px-3 py-2 rounded h-36 resize-none focus:outline-none"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-5 py-2"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white px-5 py-2 rounded font-semibold"
                >
                  Publier de suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};
