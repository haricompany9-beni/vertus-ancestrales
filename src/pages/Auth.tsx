/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, User as UserIcon, Lock, Mail, Smartphone, Key, Sparkles, CheckCircle, X } from 'lucide-react';
import { User } from '../types';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  initialTab?: 'login' | 'register';
}

export const Auth: React.FC<AuthProps> = ({ isOpen, onClose, onLogin, initialTab = 'login' }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Register Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Sync with initialTab when the modal state opens
  useEffect(() => {
    if (isOpen) {
      setIsLoginView(initialTab === 'login');
      setErrorMsg('');
      setRegSuccess(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Quick Simulation Accounts Data
  const demoAccounts = [
    {
      label: 'Accès Client de Test',
      email: 'haridjegui@gmail.com',
      badge: 'Client',
      color: 'bg-emerald-50 text-[#1F7A4D] border-emerald-200',
      user: {
        id: 'u-1',
        firstName: 'Hari',
        lastName: 'Djegui',
        email: 'haridjegui@gmail.com',
        phone: '+33 6 12 34 56 78',
        role: 'client' as const,
        createdAt: '2026-06-01T08:00:00Z'
      }
    },
    {
      label: 'Accès Administrateur',
      email: 'admin@vertusancestrales.com',
      badge: 'Admin',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      user: {
        id: 'u-admin',
        firstName: 'Monique',
        lastName: 'Morgat',
        email: 'admin@vertusancestrales.com',
        phone: '+33 1 45 61 23 87',
        role: 'admin' as const,
        createdAt: '2026-01-01T08:00:00Z'
      }
    }
  ];

  const handleDemoSignIn = (demoUser: User) => {
    onLogin(demoUser);
    onClose();
  };

  const handleFormLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (email === 'admin@vertusancestrales.com') {
      handleDemoSignIn(demoAccounts[1].user);
    } else if (email === 'haridjegui@gmail.com') {
      handleDemoSignIn(demoAccounts[0].user);
    } else {
      // Create user on the fly inside sandbox for ease of login
      const newUser: User = {
        id: `u-${Date.now()}`,
        firstName: email.split('@')[0],
        lastName: 'Initié',
        email: email,
        role: 'client',
        createdAt: new Date().toISOString()
      };
      onLogin(newUser);
      onClose();
    }
  };

  const handleFormRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !password) return;

    const registeredUser: User = {
      id: `u-${Date.now()}`,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      role: 'client',
      createdAt: new Date().toISOString()
    };

    setRegSuccess(true);
    setTimeout(() => {
      onLogin(registeredUser);
      onClose();
    }, 2000);
  };

  // Google Social Auth Simulation
  const handleGoogleAuth = () => {
    const googleUser: User = {
      id: `u-g-${Date.now()}`,
      firstName: 'Initiateur',
      lastName: 'Google',
      email: 'google.user@vertusancestrales.com',
      role: 'client',
      createdAt: new Date().toISOString()
    };
    onLogin(googleUser);
    onClose();
  };

  // Apple Social Auth Simulation
  const handleAppleAuth = () => {
    const appleUser: User = {
      id: `u-a-${Date.now()}`,
      firstName: 'Initié',
      lastName: 'Apple',
      email: 'apple.user@vertusancestrales.com',
      role: 'client',
      createdAt: new Date().toISOString()
    };
    onLogin(appleUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      <div className="max-w-[480px] w-full bg-[#FAF8F3] rounded-2xl border border-[#E8DFC9] p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col gap-5 overflow-y-auto max-h-[95vh] animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1F3B2F]/60 hover:text-[#1F3B2F] p-1.5 rounded-full hover:bg-black/5 transition-all cursor-pointer"
          title="Fermer"
        >
          <X size={18} />
        </button>

        <div className="text-center flex flex-col items-center gap-1">
          <div className="w-10 h-10 border border-[#C8A96B]/50 rounded-full flex items-center justify-center text-[#1F3B2F] bg-[#FAF8F3]">
            <Key size={18} />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-[#1F3B2F] font-semibold mt-1">
            {isLoginView ? 'Se connecter au Temple' : 'Créer un espace d\'initié'}
          </h2>
          <p className="text-[11px] sm:text-xs text-[#6B7280] font-sans">
            {isLoginView ? 'Accédez à vos commandes, soins et fiches conseils d\'éveil.' : 'Rejoignez la communauté de prestige naturelle.'}
          </p>
        </div>

        {/* SOCIAL AUTHENTICATION (Google & Apple) */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-3">
            {/* Google Integration */}
            <button
              onClick={handleGoogleAuth}
              className="flex items-center justify-center border border-[#E8DFC9] bg-white hover:bg-[#FAF8F3] text-gray-700 text-xs py-2.5 px-3 rounded-lg font-medium transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2.5" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Apple Integration */}
            <button
              onClick={handleAppleAuth}
              className="flex items-center justify-center border border-[#E8DFC9] bg-[#1F3B2F] hover:bg-[#12241C] text-white text-xs py-2.5 px-3 rounded-lg font-medium transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2.5 fill-current text-white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="flex items-center my-1.5">
            <div className="flex-grow border-t border-[#E8DFC9]"></div>
            <span className="px-3.5 text-[10px] uppercase tracking-wider text-gray-400 font-sans font-medium bg-[#FAF8F3]">Ou par e-mail</span>
            <div className="flex-grow border-t border-[#E8DFC9]"></div>
          </div>
        </div>

        {regSuccess ? (
          <div className="bg-white border border-emerald-200 rounded-lg p-6 py-8 text-center flex flex-col items-center gap-3 animate-fade-in shadow-inner">
            <CheckCircle size={28} className="text-emerald-700" />
            <h4 className="font-serif font-bold text-sm text-[#1F3B2F]">Compte initié créé avec succès !</h4>
            <p className="text-xs text-[#6B7280]">Connexion automatique en cours vers votre temple d'ancrage...</p>
          </div>
        ) : (
          <form 
            onSubmit={isLoginView ? handleFormLoginSubmit : handleFormRegisterSubmit}
            className="flex flex-col gap-3.5 font-sans text-xs"
          >
            {/* Register specific naming fields */}
            {!isLoginView && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Prénom</label>
                  <input
                    type="text"
                    className="border border-[#E8DFC9] px-3 py-2 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1F3B2F]"
                    placeholder="Hari"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-gray-700">Nom</label>
                  <input
                    type="text"
                    className="border border-[#E8DFC9] px-3 py-2 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#1F3B2F]"
                    placeholder="Djegui"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-700">Adresse e-mail</label>
              <div className="flex border border-[#E8DFC9] rounded bg-white focus-within:ring-1 focus-within:ring-[#1F3B2F] overflow-hidden p-0.5">
                <span className="p-2.5 text-gray-400">
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  className="bg-transparent px-2 py-2.5 w-full focus:outline-none"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Register specific telephone field */}
            {!isLoginView && (
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-700">Téléphone portable</label>
                <div className="flex border border-[#E8DFC9] rounded bg-white focus-within:ring-1 focus-within:ring-[#1F3B2F] overflow-hidden p-0.5">
                  <span className="p-2.5 text-gray-400">
                    <Smartphone size={14} />
                  </span>
                  <input
                    type="tel"
                    className="bg-transparent px-2 py-2.5 w-full focus:outline-none"
                    placeholder="+33 6 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-700">Mot de passe</label>
              <div className="flex border border-[#E8DFC9] rounded bg-white focus-within:ring-1 focus-within:ring-[#1F3B2F] overflow-hidden p-0.5">
                <span className="p-2.5 text-gray-400">
                  <Lock size={14} />
                </span>
                <input
                  type="password"
                  className="bg-transparent px-2 py-2.5 w-full focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit action */}
            <button
              type="submit"
              className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-semibold py-3.5 rounded-lg transition-colors cursor-pointer mt-1"
            >
              {isLoginView ? 'Se connecter' : 'Valider mon inscription'}
            </button>
          </form>
        )}

        {/* Footnote Toggle */}
        <div className="pt-3 border-t border-[#E8DFC9]/40 text-center text-xs text-[#6B7280]">
          {isLoginView ? (
            <p>
              Nouveau sur la plateforme ?{' '}
              <button 
                onClick={() => setIsLoginView(false)}
                className="text-[#C8A96B] hover:underline font-bold font-sans cursor-pointer ml-1"
              >
                Créer un compte d'initié
              </button>
            </p>
          ) : (
            <p>
              Vous possédez déjà un compte d'initié ?{' '}
              <button 
                onClick={() => setIsLoginView(true)}
                className="text-[#C8A96B] hover:underline font-bold font-sans cursor-pointer ml-1"
              >
                Se connecter
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
