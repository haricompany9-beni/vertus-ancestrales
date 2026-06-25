/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Calendar, FileText, User as UserIcon, LogOut, CheckCircle2, ChevronRight, Package, Truck, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { User, Order, ConsultationBooking, AdviceDocument } from '../types';

interface DashboardClientProps {
  currentUser: User;
  orders: Order[];
  bookings: ConsultationBooking[];
  adviceDocs: AdviceDocument[];
  onLogout: () => void;
  onUpdateUser: (userData: Partial<User>) => void;
}

export const DashboardClient: React.FC<DashboardClientProps> = ({
  currentUser,
  orders,
  bookings,
  adviceDocs,
  onLogout,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'consultations' | 'docs' | 'profile'>('overview');
  
  // States for profile editing
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Filter lists to only show the logged-in user's content
  const userOrders = orders.filter((o) => o.customerEmail === currentUser.email);
  const userBookings = bookings.filter((b) => b.userEmail === currentUser.email);
  const userDocs = adviceDocs.filter((d) => d.userId === currentUser.id);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ firstName, lastName, phone });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmée':
      case 'Livrée':
      case 'Payée':
        return 'bg-[#1F7A4D]/10 text-[#1F7A4D] border-[#1F7A4D]/25';
      case 'En attente':
      case 'En préparation':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Expédiée':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12"
    >
      {/* Banner introduction with beautiful background */}
      <div className="bg-[#1F3B2F] rounded-2xl p-6 sm:p-10 mb-10 text-[#FAF8F3]/90 relative overflow-hidden shadow-lg shadow-[#1F3B2F]/10">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-1/3">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#C8A96B]">
            <path d="M50 15 C35 15, 15 35, 15 50 C15 65, 35 85, 50 85 C65 85, 85 65, 85 50 C85 35, 65 15, 50 15 Z M50 25 C60 25, 75 40, 75 50 C75 60, 60 75, 50 75 C40 75, 25 60, 25 50 C25 40, 40 25, 50 25 Z" />
          </svg>
        </div>
        <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold">Terre d'ancrage</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide mt-2">
          Bienvenue dans votre temple, {currentUser.firstName}
        </h1>
        <p className="text-xs sm:text-sm text-[#FAF8F3]/70 font-sans mt-3 max-w-xl leading-relaxed">
          Retrouvez ici le suivi de vos onguents ancestraux DHL, vos rituels d'éveil spirituels personnalisés de Monique ainsi que vos notes de soins holistiques.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-[#FAF8F3]/60 rounded-xl border border-[#E8DFC9]/35 p-5 flex flex-col gap-1 shadow-sm">
          <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-sans px-3 mb-3">Navigation Espace</p>
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'overview'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#F3EEE3]/50 hover:text-[#1F3B2F]'
            }`}
          >
            <Package size={15} />
            <span>Vue d'ensemble</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'orders'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#F3EEE3]/50 hover:text-[#1F3B2F]'
            }`}
          >
            <ShoppingBag size={15} />
            <span>Mes Commandes ({userOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'consultations'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#F3EEE3]/50 hover:text-[#1F3B2F]'
            }`}
          >
            <Calendar size={15} />
            <span>Mes Rendez-vous ({userBookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'docs'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#F3EEE3]/50 hover:text-[#1F3B2F]'
            }`}
          >
            <FileText size={15} />
            <span>Fiches & Conseils ({userDocs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-3.5 ${
              activeTab === 'profile'
                ? 'bg-[#1F3B2F] text-white shadow-sm shadow-[#1F3B2F]/10'
                : 'text-[#6B7280] hover:bg-[#F3EEE3]/50 hover:text-[#1F3B2F]'
            }`}
          >
            <UserIcon size={15} />
            <span>Mon Profil</span>
          </button>
          
          <button
            onClick={onLogout}
            className="w-full text-left px-3.5 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold text-[#D64545] hover:bg-red-50 transition-all flex items-center gap-3.5 mt-6 border-t border-[#E8DFC9]/30 pt-4"
          >
            <LogOut size={15} />
            <span>Se déconnecter</span>
          </button>
        </aside>

        {/* Content detail area */}
        <div className="lg:col-span-9 bg-white sm:p-8 p-6 rounded-xl border border-[#E8DFC9]/35 shadow-sm min-h-[500px]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold">
                Votre état de veille spirituelle
              </h2>
              
              {/* Stats card grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#FAF8F3] border border-[#E8DFC9]/30 rounded-xl p-5 relative">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Commandes passées</span>
                  <p className="font-serif text-3xl font-bold text-[#1F3B2F] mt-1.5">{userOrders.length}</p>
                  <p className="text-xs text-[#556B2F] font-sans mt-1">Expédiées sous scellés DHL</p>
                </div>
                <div className="bg-[#FAF8F3] border border-[#E8DFC9]/30 rounded-xl p-5">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Consultations réservées</span>
                  <p className="font-serif text-3xl font-bold text-[#1F3B2F] mt-1.5">{userBookings.length}</p>
                  <p className="text-xs text-[#556B2F] font-sans mt-1">Avec Monique Morgat</p>
                </div>
                <div className="bg-[#FAF8F3] border border-[#E8DFC9]/30 rounded-xl p-5">
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-sans">Méditations & Fiches</span>
                  <p className="font-serif text-3xl font-bold text-[#1F3B2F] mt-1.5">{userDocs.length}</p>
                  <p className="text-xs text-[#556B2F] font-sans mt-1">Sagesse ancestrale PDF</p>
                </div>
              </div>

              {/* Order quick highlights */}
              <div className="border border-[#E8DFC9]/30 rounded-xl p-6 bg-[#FAF8F3]/30">
                <h3 className="font-serif text-base font-semibold text-[#1F3B2F] mb-4.5 flex items-center justify-between">
                  <span>Dernière activité de commande</span>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#C8A96B] hover:underline font-sans cursor-pointer">Voir tout</button>
                </h3>
                
                {userOrders.length > 0 ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-[#E8DFC9]/35 bg-white rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#1F3B2F]/10 flex items-center justify-center text-[#1F3B2F]">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-[#1F3B2F]">Détails du colis #{userOrders[0].id}</p>
                        <p className="text-[11px] text-[#6B7280] font-sans mt-0.5">Nbre d'articles : {userOrders[0].items.length} • Montant : {userOrders[0].totalAmount.toFixed(2)} €</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <span className={`text-[10px] uppercase font-bold px-3 py-1 border rounded-full ${getStatusColor(userOrders[0].status)}`}>
                        {userOrders[0].status}
                      </span>
                      {userOrders[0].trackingNumber && (
                        <span className="text-[10px] text-[#556B2F] font-sans flex items-center gap-1 mt-1">
                          <Truck size={12} /> DHL : {userOrders[0].trackingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#6B7280] font-sans italic text-center py-4">
                    Aucune commande passée ou panier en cours.
                  </p>
                )}
              </div>

              {/* Consultation highlights */}
              <div className="border border-[#E8DFC9]/30 rounded-xl p-6 bg-[#FAF8F3]/30">
                <h3 className="font-serif text-base font-semibold text-[#1F3B2F] mb-4.5 flex items-center justify-between">
                  <span>Prochaine consultation programmée</span>
                  <button onClick={() => setActiveTab('consultations')} className="text-xs text-[#C8A96B] hover:underline font-sans cursor-pointer">Voir tout</button>
                </h3>

                {userBookings.length > 0 ? (
                  <div className="p-4 border border-[#E8DFC9]/35 bg-white rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-[#FAF8F3] border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B]">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-[#1F3B2F]">{userBookings[0].consultationTitle}</p>
                        <p className="text-[11px] text-[#6B7280] font-sans mt-0.5">Le {userBookings[0].date} à {userBookings[0].timeSlot}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-bold px-3 py-1 border rounded-full ${getStatusColor(userBookings[0].status)}`}>
                        {userBookings[0].status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#6B7280] font-sans italic text-center py-4">
                    Aucun soin ou consultation prévus. Accédez au calendrier complet pour réserver votre séance.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold">
                Historique de vos commandes d'onguents
              </h2>
              <p className="text-xs text-[#6B7280] font-sans">
                Tous les colis de la boutique sont scellés hermétiquement, purifiés à la sauge de montagne avant expédition par nos services de prestige ou DHL International.
              </p>

              {userOrders.length > 0 ? (
                <div className="flex flex-col gap-5 mt-4">
                  {userOrders.map((order) => (
                    <div key={order.id} className="border border-[#E8DFC9]/30 bg-[#FAF8F3]/20 hover:bg-white rounded-xl p-5 sm:p-6 transition-all duration-300">
                      {/* Header block info */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#E8DFC9]/20">
                        <div>
                          <p className="text-xs font-sans font-semibold text-[#1F3B2F]">
                            Numéro de commande : <span className="font-mono text-[#C8A96B]">{order.id}</span>
                          </p>
                          <p className="text-[11px] text-[#6B7280] font-sans mt-0.5">
                            Passée le : {new Date(order.createdAt).toLocaleDateString('fr-FR')} à {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1">
                          <span className={`text-[10px] uppercase font-bold px-3 py-1 border rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="py-4 flex flex-col gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-[#3B2F2F] font-sans">
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#1F3B2F]/10 text-[#1F3B2F] flex items-center justify-center font-bold text-[10px]">{item.quantity}x</span>
                              <span className="font-semibold">{item.productName}</span>
                            </span>
                            <span className="text-[#6B7280]">{item.price.toFixed(2)} € / u</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer block */}
                      <div className="pt-4 border-t border-[#E8DFC9]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="text-xs text-[#6B7280] font-sans">
                          <strong>Adresse de livraison :</strong> {order.shippingAddress.street}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <p className="text-xs text-[#6B7280] font-sans">Total payé :</p>
                          <p className="font-serif text-lg font-bold text-[#1F3B2F]">{order.totalAmount.toFixed(2)} €</p>
                          {order.trackingNumber && (
                            <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded mt-2 flex items-center gap-1 font-medium select-all">
                              <Truck size={12} /> DHL : {order.trackingNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-[#E8DFC9]/30 rounded-lg p-10 text-center bg-[#FAF8F3]/10">
                  <p className="text-xs text-[#6B7280] font-sans italic">Vous n'avez pas encore passé de commande d'onguent.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold">
                Vos séances médiumniques & énergétiques
              </h2>
              <p className="text-xs text-[#6B7280] font-sans">
                Retrouvez les détails de vos rendez-vous programmés avec Monique Morgat. Le lien de visioconférence sécurisé sera disponible 15 minutes avant le début de la séance.
              </p>

              {userBookings.length > 0 ? (
                <div className="flex flex-col gap-5 mt-4">
                  {userBookings.map((booking) => (
                    <div key={booking.id} className="border border-[#E8DFC9]/30 bg-[#FAF8F3]/20 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#C8A96B]/50 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#1F3B2F] text-[#C8A96B] flex items-center justify-center font-serif text-base border border-[#C8A96B]/30 shrink-0 mt-0.5">
                          M
                        </div>
                        <div>
                          <h3 className="font-serif text-base font-semibold text-[#1F3B2F]">{booking.consultationTitle}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-[#6B7280] font-sans">
                            <span>Praticien : <strong>Monique Morgat</strong></span>
                            <span>Date : <strong>{booking.date}</strong></span>
                            <span>Heure : <strong>{booking.timeSlot}</strong></span>
                            <span>Prix : <strong>{booking.price}€</strong></span>
                          </div>
                          {booking.notes && (
                            <p className="text-xs bg-[#FAF8F3] border border-[#E8DFC9]/30 rounded p-2.5 mt-3 text-[#3B2F2F] font-sans italic leading-relaxed">
                              <strong>Notes soumises :</strong> "{booking.notes}"
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:items-end items-start gap-3 shrink-0">
                        <span className={`text-[10px] uppercase font-bold px-3 py-1 border rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {booking.status === 'Confirmée' && (
                          <button 
                            className="text-[10px] tracking-widest uppercase font-semibold text-[#1F3B2F] bg-[#C8A96B] hover:bg-[#1F3B2F] hover:text-[#FAF8F3] px-3.5 py-2.5 rounded transition-all font-sans cursor-pointer flex items-center gap-1.5"
                            onClick={() => alert("Tentative de lancement sécurisée... Le salon crypté de visioconférence avec Monique n'est pas encore actif. Vous recevrez l'accès direct par mail ou sms.")}
                          >
                            <span>Lancer l'Espace</span>
                            <ExternalLink size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-[#E8DFC9]/30 rounded-lg p-10 text-center bg-[#FAF8F3]/10">
                  <p className="text-xs text-[#6B7280] font-sans italic">Aucun rendez-vous planifié.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADVICE DOCUMENTS (PDFs) */}
          {activeTab === 'docs' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold">
                Vos Fiches d'Éveil et Recettes Ancestrales
              </h2>
              <p className="text-xs text-[#6B7280] font-sans">
                Ces documents d'éveil confidentiels ont été personnellement rédigés par Monique Morgat à la suite de vos consultations ou bilans d'aura. Ils contiennent vos mantras de guidance, vos diagrammes et rituels divins.
              </p>

              {userDocs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                  {userDocs.map((doc) => (
                    <div key={doc.id} className="border border-[#E8DFC9]/20 hover:border-[#C8A96B]/50 bg-[#FAF8F3]/30 hover:bg-white rounded-lg p-5 transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="p-2.5 rounded bg-[#FAF8F3] border border-[#C8A96B]/30 text-[#C8A96B]">
                            <FileText size={18} />
                          </span>
                          <div>
                            <h3 className="font-serif text-sm font-semibold text-[#1F3B2F] leading-snug">{doc.title}</h3>
                            <span className="text-[10px] text-[#6B7280] font-sans mt-0.5 block">Document PDF ({doc.fileSize})</span>
                          </div>
                        </div>
                        <p className="text-xs text-[#6B7280] font-sans leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#E8DFC9]/20 flex items-center justify-between">
                        <span className="text-[10px] text-[#556B2F] font-sans">Rédigé le {doc.date}</span>
                        <button
                          onClick={() => alert(`Téléchargement de la fiche "${doc.title}"...`)}
                          className="text-[10px] tracking-widest font-bold uppercase text-[#1F3B2F] hover:text-[#C8A96B] transition-colors font-sans cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Télécharger</span>
                          <ExternalLink size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-[#E8DFC9]/30 rounded-lg p-10 text-center bg-[#FAF8F3]/10">
                  <p className="text-xs text-[#6B7280] font-sans italic">Aucun document n'a encore été mis en ligne pour votre compte.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold">
                Vos informations personnelles
              </h2>
              <p className="text-xs text-[#6B7280] font-sans">
                Maintenez vos coordonnées à jour pour faciliter le suivi de vos consultations en direct et l'acheminement de vos livraisons d'huiles rares.
              </p>

              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5 mt-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#1F3B2F] font-semibold font-sans">Prénom</label>
                    <input
                      type="text"
                      className="border border-[#E8DFC9]/60 px-3.5 py-3 text-xs rounded bg-[#FAF8F3]/40 focus:bg-white focus:outline-none focus:border-[#C8A96B]"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#1F3B2F] font-semibold font-sans">Nom de famille</label>
                    <input
                      type="text"
                      className="border border-[#E8DFC9]/60 px-3.5 py-3 text-xs rounded bg-[#FAF8F3]/40 focus:bg-white focus:outline-none focus:border-[#C8A96B]"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#1F3B2F] font-semibold font-sans">Adresse de messagerie</label>
                  <input
                    type="email"
                    className="border border-[#E8DFC9]/60 px-3.5 py-3 text-xs rounded bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                    value={currentUser.email}
                    disabled
                  />
                  <span className="text-[9px] text-[#6B7280]">L'adresse email de connexion ne peut être modifiée à des fins de sécurité.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#1F3B2F] font-semibold font-sans">Numéro de téléphone</label>
                  <input
                    type="tel"
                    className="border border-[#E8DFC9]/60 px-3.5 py-3 text-xs rounded bg-[#FAF8F3]/40 focus:bg-white focus:outline-none focus:border-[#C8A96B]"
                    placeholder="+33 6 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-medium px-8 py-3.5 rounded transition-colors cursor-pointer"
                  >
                    Enregistrer les modifications
                  </button>
                  {profileSuccess && (
                    <p className="text-xs text-[#1F7A4D] font-sans font-medium animate-fade-in flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Profil sauvegardé avec succès.
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
