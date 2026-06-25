/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, HelpCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactProps {
  onAddMessage: (msg: ContactMessage) => void;
}

export const Contact: React.FC<ContactProps> = ({ onAddMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'Demande de renseignement de prestige',
      message,
      date: 'Aujourd\'hui',
      status: 'Non lu'
    };

    onAddMessage(newMessage);
    setSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF8F3]/30 min-h-screen text-[#3B2F2F] pb-16"
    >
      {/* Editorial banner header */}
      <section className="bg-[#FAF8F3] py-14 sm:py-20 border-b border-[#E8DFC9]/40 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-semibold">Le Liens Terrestre</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1F3B2F] font-medium tracking-wide">
            Entrer En Relation Secrète
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] font-sans max-w-xl italic mt-1 leading-relaxed">
            Une interrogation sur nos onguents, nos expéditions DHL ou vos rituels ? Monique et son équipe se tiennent à votre écoute bienveillante.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Form and Information */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Contacts details Column left */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-xl font-bold text-[#1F3B2F]">Informations de la Maison</h3>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              Nos bureaux alchimiques et laboratoires d'apothicaires sont installés dans les campagnes françaises. Nos rendez-vous privés se déroulent également à Paris.
            </p>
          </div>

          <div className="flex flex-col gap-5 text-xs text-[#3B2F2F] font-sans">
            <div className="flex items-center gap-4">
              <span className="p-3 bg-[#1F3B2F]/5 text-[#1F3B2F] rounded-full border border-[#1F3B2F]/10">
                <MapPin size={16} />
              </span>
              <div>
                <h4 className="font-serif font-semibold text-[#1F3B2F]">L'Atelier Confidentiel</h4>
                <p className="text-gray-500 mt-0.5">14 Rue de l'Arrivée, 75015 Paris, France</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="p-3 bg-[#1F3B2F]/5 text-[#1F3B2F] rounded-full border border-[#1F3B2F]/10">
                <Mail size={16} />
              </span>
              <div>
                <h4 className="font-serif font-semibold text-[#1F3B2F]">Écrivez-nous</h4>
                <p className="text-gray-500 mt-0.5">contact@vertusancestrales.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="p-3 bg-[#1F3B2F]/5 text-[#1F3B2F] rounded-full border border-[#1F3B2F]/10">
                <Phone size={16} />
              </span>
              <div>
                <h4 className="font-serif font-semibold text-[#1F3B2F]">Secrétariat de consultations</h4>
                <p className="text-gray-500 mt-0.5">+33 1 45 61 23 87 (9h - 18h en jours ouvrés)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Form Column Right */}
        <div className="md:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E8DFC9]/45 shadow-sm">
            
            {success ? (
              <div className="bg-[#1F7A4D]/5 border border-[#1F7A4D]/20 rounded p-6 text-center flex flex-col items-center gap-3 animate-fade-in">
                <CheckCircle size={24} className="text-[#1F7A4D]" />
                <h4 className="font-serif text-lg font-bold text-[#1F3B2F]">Onde de bienveillance reçue !</h4>
                <p className="text-xs text-[#6B7280] font-sans leading-relaxed max-w-xs">
                  Votre message a été transmis avec succès à Monique. Notre secrétariat d'éthique vous répondra sous 24h ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex flex-col gap-4 font-sans text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-gray-700">Votre Prénom et Nom</label>
                    <input
                      type="text"
                      className="border border-[#E8DFC9] px-4 py-3 rounded bg-[#FAF8F3]/30 focus:bg-white focus:outline-none"
                      placeholder="Ex: Sophonie"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-gray-700">Adresse de messagerie</label>
                    <input
                      type="email"
                      className="border border-[#E8DFC9] px-4 py-3 rounded bg-[#FAF8F3]/30 focus:bg-white focus:outline-none"
                      placeholder="Ex: haridjegui@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Objet de votre relation</label>
                  <input
                    type="text"
                    className="border border-[#E8DFC9] px-4 py-3 rounded bg-[#FAF8F3]/30 focus:bg-white focus:outline-none"
                    placeholder="Ex: Question de dosage sur l'élixir de Vénus..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Votre message sacré</label>
                  <textarea
                    className="border border-[#E8DFC9] p-4 rounded h-32 resize-none focus:outline-none focus:border-[#C8A96B]"
                    placeholder="Écrivez ici votre demande..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-semibold py-4 rounded transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={12} />
                  <span>Envoyer la missive</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
