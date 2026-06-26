import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Check, 
  Leaf,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Consultation, ConsultationBooking, User } from '../types';

interface BookingProps {
  consultations: Consultation[];
  currentUser: User | null;
  onBookConsultation: (booking: ConsultationBooking) => void;
  setPage: (page: string, params?: any) => void;
  initialSelectedID?: string;
}

export const Booking: React.FC<BookingProps> = ({
  consultations,
  currentUser,
  onBookConsultation,
  setPage,
  initialSelectedID = 'générale'
}) => {
  const [selectedID, setSelectedID] = useState<string>(initialSelectedID);
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-25');
  const [selectedDayLabel, setSelectedDayLabel] = useState<string>('Jeudi 25 Juin 2026');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00');
  const [clientNotes, setClientNotes] = useState<string>('');
  
  // Custom contact info if no logged-in user is detected
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Simulated credit card state
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Multi-step state: 1 = Choose date, 2 = Choose hour, 3 = Intention, 4 = Confirmation & Payment
  const [activeStep, setActiveStep] = useState<number>(1);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [successBookingData, setSuccessBookingData] = useState<ConsultationBooking | null>(null);

  // Sync initial setup parameters
  useEffect(() => {
    if (initialSelectedID) {
      setSelectedID(initialSelectedID);
    }
  }, [initialSelectedID]);

  // Find active consultation details
  const activeConsultation = consultations.find(c => c.id === selectedID) || consultations[0] || {
    id: 'générale',
    type: 'general',
    title: 'Consultation Générale Holistique',
    duration: '45 min',
    price: 70,
    shortDescription: 'Un rituels global en visioconférence pour harmoniser votre derme vibratoire et recevoir les guidances de vos ancêtres.',
    description: 'Une séance globale pour faire le point sur votre situation, comprendre vos blocages et recevoir des conseils personnalisés adaptés à vos besoins.',
    benefits: ['Bilan énergétique global', 'Guidance et conseils personnalisés', 'Recommandations de plantes & rituels', 'Fiche conseil PDF sous 24h'],
    image: '/src/assets/images/monique_morgat_1782122440112.jpg'
  };

  // Calendar Juin 2026 dates list
  const calendarDays = [
    { day: 1, active: false }, { day: 2, active: false }, { day: 3, active: false }, { day: 4, active: false }, { day: 5, active: false }, { day: 6, active: false }, { day: 7, active: false },
    { day: 8, active: false }, { day: 9, active: false }, { day: 10, active: false }, { day: 11, active: false }, { day: 12, active: false }, { day: 13, active: false }, { day: 14, active: false },
    { day: 15, active: false }, { day: 16, active: false }, { day: 17, active: false }, { day: 18, active: false }, { day: 19, active: false }, { day: 20, active: true, label: 'Samedi 20 Juin 2026' }, { day: 21, active: true, label: 'Dimanche 21 Juin 2026' },
    { day: 22, active: true, label: 'Lundi 22 Juin 2026' }, { day: 23, active: true, label: 'Mardi 23 Juin 2026' }, { day: 24, active: true, label: 'Mercredi 24 Juin 2026' }, { day: 25, active: true, label: 'Jeudi 25 Juin 2026' }, { day: 26, active: true, label: 'Vendredi 26 Juin 2026' }, { day: 27, active: true, label: 'Samedi 27 Juin 2026' }, { day: 28, active: true, label: 'Dimanche 28 Juin 2026' },
    { day: 29, active: true, label: 'Lundi 29 Juin 2026' }, { day: 30, active: true, label: 'Mardi 30 Juin 2026' }
  ];

  const timeSlots = ['09:30', '11:00', '14:00', '15:30', '17:00'];

  // Quick suggestions of intentions to easily populate notes
  const intentionSuggestions = [
    "Harmonisation de mon derme vibratoire (Acné spirituelle)",
    "Apaisement d'eczéma karmique et reconnexion au soi",
    "Bilan spirituel et rééquilibrage de mes énergies",
    "Guidance des ancêtres pour choix de vie professionnel",
    "Rituel d'alignement divin et purification d'aura"
  ];

  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userName = currentUser 
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : `${guestFirstName || 'Client'} ${guestLastName || 'Anonyme'}`;
    const userEmail = currentUser ? currentUser.email : (guestEmail || 'email@invite.com');
    const userId = currentUser ? currentUser.id : `guest-${Date.now()}`;

    const newBooking: ConsultationBooking = {
      id: `book-${Date.now()}`,
      userId,
      userEmail,
      userName,
      consultationType: activeConsultation.id === 'médiumnique' ? 'medium' : 'general',
      consultationTitle: activeConsultation.title,
      price: activeConsultation.price,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'Confirmée',
      notes: clientNotes
    };

    onBookConsultation(newBooking);
    setSuccessBookingData(newBooking);
    setBookingSuccess(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#FAF8F3]/60 min-h-screen text-[#3B2F2F] antialiased py-12 px-4 sm:px-6 lg:px-8 mt-16"
    >
      <div className="max-w-[1240px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-2">
        <button 
          onClick={() => setPage('consultations')}
          className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest text-[#1F3B2F] hover:text-[#C8A96B] font-sans font-extrabold uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> <span className="hidden sm:inline">Retour de consultations</span><span className="sm:hidden">Retour</span>
        </button>
        <span className="font-mono text-[8px] sm:text-[9px] text-[#C8A96B] tracking-[0.2em] uppercase hidden sm:inline">Réseau d'Éveil Sacré Monique Morgat</span>
      </div>

      {bookingSuccess && successBookingData ? (
        <div className="bg-[#1F3B2F] border border-[#C8A96B]/20 rounded-[32px] p-8 sm:p-14 max-w-[760px] mx-auto text-center flex flex-col items-center gap-6 shadow-2xl animate-fade-in text-white select-none mt-8">
          <span className="w-20 h-20 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/40 flex items-center justify-center text-[#C8A96B] animate-bounce">
            <CheckCircle size={36} />
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F3] font-light">Connexion sacrée programmée !</h3>
          <p className="text-[13.5px] text-white/80 font-sans leading-relaxed max-w-lg font-light">
            Votre rendez-vous pour la <strong>{successBookingData.consultationTitle}</strong> est confirmé pour le <strong className="text-[#C8A96B]">{selectedDayLabel} à {successBookingData.timeSlot}</strong>. 
          </p>

          <div className="w-full bg-[#12241C] p-5 rounded-2xl border border-white/5 text-left flex flex-col gap-3 font-mono text-[10.5px] text-white/90">
            <p>🧾 N° Facture : <strong className="text-[#C8A96B]">{successBookingData.id}</strong></p>
            <p>👤 Consultant : <span>{successBookingData.userName} ({successBookingData.userEmail})</span></p>
            <p>📅 Date & Heure : <strong className="text-white">{selectedDayLabel} @ {successBookingData.timeSlot}</strong></p>
            <p>📍 Support Visioconférence : <span className="text-[#C8A96B]">Lien unique Google Meet / Zoom envoyé 24h avant</span></p>
            {successBookingData.notes && (
              <p className="border-t border-white/5 pt-2.5 mt-1.5 text-white/60">📝 Intention spécifiée : <span className="italic">"{successBookingData.notes}"</span></p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <button 
              onClick={() => setPage('dashboard_client')}
              className="bg-[#C8A96B] hover:bg-[#b09257] text-[#1F3B2F] text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase px-8 py-4 rounded-lg shadow-md transition-all cursor-pointer hover:text-white"
            >
              ACCÉDER À MON CALENDRIER
            </button>
            <button 
              onClick={() => {
                setBookingSuccess(false);
                setSuccessBookingData(null);
                setActiveStep(1);
                setClientNotes('');
              }}
              className="border border-white/20 bg-white/5 text-white text-[11px] font-sans tracking-[0.2em] font-extrabold uppercase px-8 py-4 rounded-lg transition-all cursor-pointer hover:bg-white/10"
            >
              RÉSERVER UNE AUTRE SÉANCE
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-[#E8DFC9] overflow-hidden shadow-xl max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[660px]">
          
          {/* LEFT COLUMN: Premium Dark Section exactly matching user capture */}
          <div className="lg:col-span-4 bg-[#1F3B2F] p-8 sm:p-11 text-white flex flex-col justify-between text-left relative overflow-hidden">
            {/* Decortive floating leaf outlines at bottom corner matching mockup */}
            <div className="absolute -bottom-12 -right-12 opacity-[0.06] pointer-events-none select-none">
              <Leaf className="w-56 h-auto text-white rotate-12" />
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C8A96B] font-extrabold block">
                RÉSERVEZ VOTRE GUIDANCE SACRÉE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light leading-snug text-[#FAF8F3]">
                Choisissez <br />
                votre moment
              </h3>
              <p className="text-[13px] font-sans text-white/75 font-light leading-relaxed mt-2">
                Toutes les consultations se déroulent en visio (Zoom ou Google Meet). Le lien vous sera envoyé 24h avant la séance.
              </p>

              {/* Separating Divider */}
              <div className="w-full h-[1px] bg-white/10 my-4" />

              {/* Left Column trust elements */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-5 text-left text-xs font-sans text-white/90">
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C8A96B]">
                    <ShieldCheck size={14} />
                  </span>
                  <div>
                    <p className="font-medium leading-tight">Paiement sécurisé</p>
                    <p className="text-[10px] text-white/50">Stripe</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C8A96B]">
                    <Clock size={14} />
                  </span>
                  <div>
                    <p className="font-medium leading-tight">Rappel automatique</p>
                    <p className="text-[10px] text-white/50">24h avant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="pt-8 border-t border-white/10 text-[11px] font-sans text-white/50 leading-relaxed font-light mt-12 relative z-10">
              La finesse d'une guidance dépend de l'intention qui y est mise. Prenez quelques instants pour respirer avant de remplir ce formulaire.
            </div>
          </div>

          {/* RIGHT COLUMN: Stepper form steps */}
          <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between gap-8 text-left bg-white">
            
            {/* Stepper Horizontal Header */}
            <div>
              {/* Mobile compact stepper */}
              <div className="sm:hidden border-b border-gray-100 pb-3 text-center select-none">
                <span className="text-[10px] font-sans tracking-wider font-extrabold uppercase text-[#1F3B2F]">
                  Étape {activeStep}/4
                </span>
                <div className="flex justify-center gap-1.5 mt-2">
                  {[1,2,3,4].map(step => (
                    <div 
                      key={step}
                      onClick={() => {
                        if (step === 1 || (step === 2 && selectedDate) || (step === 3 && selectedTimeSlot) || (step === 4 && clientNotes)) setActiveStep(step);
                      }}
                      className={`w-8 h-1 rounded-full transition-all cursor-pointer ${
                        step === activeStep ? 'bg-[#1F3B2F]' : step < activeStep ? 'bg-[#C8A96B]' : 'bg-gray-200'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              {/* Desktop full stepper */}
              <div className="hidden sm:grid grid-cols-4 border-b border-gray-100 pb-4 text-center select-none">
                <span 
                  onClick={() => setActiveStep(1)}
                  className={`text-[9.5px] font-sans tracking-wider font-extrabold uppercase pb-4 cursor-pointer transition-all border-b-2 ${
                    activeStep === 1 
                      ? 'text-[#1F3B2F] border-[#1F3B2F]' 
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  1. DATE & SOIN
                </span>
                <span 
                  onClick={() => selectedDate && setActiveStep(2)}
                  className={`text-[9.5px] font-sans tracking-wider font-extrabold uppercase pb-4 cursor-pointer transition-all border-b-2 ${
                    activeStep === 2 
                      ? 'text-[#1F3B2F] border-[#1F3B2F]' 
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  2. L'HEURE
                </span>
                <span 
                  onClick={() => selectedTimeSlot && setActiveStep(3)}
                  className={`text-[9.5px] font-sans tracking-wider font-extrabold uppercase pb-4 cursor-pointer transition-all border-b-2 ${
                    activeStep === 3 
                      ? 'text-[#1F3B2F] border-[#1F3B2F]' 
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  3. INTENTION
                </span>
                <span 
                  onClick={() => clientNotes && setActiveStep(4)}
                  className={`text-[9.5px] font-sans tracking-wider font-extrabold uppercase pb-4 cursor-pointer transition-all border-b-2 ${
                    activeStep === 4 
                      ? 'text-[#1F3B2F] border-[#1F3B2F]' 
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  4. CONFIRMATION
                </span>
              </div>

              {/* Form step transitions panel */}
              <div className="mt-8">
                
                {/* STEP 1 LAYOUT: Choose Date and Care */}
                {activeStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fade-in">
                    
                    {/* Calendar grid (col-span-7) */}
                    <div className="md:col-span-7 select-none">
                      <div className="flex items-center justify-between mb-4.5">
                        <span className="font-serif text-[#1F3B2F] text-sm font-semibold tracking-wide">JUIN 2026</span>
                        <div className="flex items-center gap-1 text-gray-400">
                          <ChevronLeft size={16} className="cursor-pointer hover:text-[#1F3B2F]" />
                          <ChevronRight size={16} className="cursor-pointer hover:text-[#1F3B2F]" />
                        </div>
                      </div>

                      {/* Days Header */}
                      <div className="grid grid-cols-7 gap-2.5 text-center mb-2">
                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, ix) => (
                          <span key={day + ix} className="text-[10px] font-sans font-extrabold text-gray-400 uppercase py-1">{day}</span>
                        ))}
                      </div>

                      {/* Days Grid June 2026 */}
                      <div className="grid grid-cols-7 gap-2.5 text-center">
                        {calendarDays.map((dayObj, index) => {
                          const isSelected = selectedDate === `2026-06-${dayObj.day.toString().padStart(2, '0')}`;
                          return (
                            <button
                              key={index}
                              type="button"
                              disabled={!dayObj.active}
                              onClick={() => {
                                setSelectedDate(`2026-06-${dayObj.day.toString().padStart(2, '0')}`);
                                setSelectedDayLabel(dayObj.label || `Jeudi ${dayObj.day} Juin 2026`);
                              }}
                              className={`aspect-square rounded-full flex items-center justify-center text-xs transition-all tracking-tight font-sans cursor-pointer focus:outline-none ${
                                !dayObj.active 
                                  ? 'text-gray-300 pointer-events-none font-light' 
                                  : isSelected
                                    ? 'bg-[#1F3B2F] text-white font-extrabold border border-[#C8A96B] shadow-inner scale-105'
                                    : 'text-gray-700 bg-[#FAF8F3] hover:bg-[#E8DFC9]/40 border border-[#E8DFC9]/20 font-medium'
                              }`}
                            >
                              {dayObj.day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right column within Step 1 (col-span-5) */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                      
                      {/* Selection of consultation */}
                      <div>
                        <label className="text-[9.5px] uppercase tracking-widest text-[#1F3B2F] font-extrabold font-sans mb-3.5 block">
                          CONSULTATION
                        </label>
                        <div className="flex flex-col gap-3">
                          {/* Radio Card 1 */}
                          <div 
                            onClick={() => setSelectedID('générale')}
                            className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition-all select-none ${
                              selectedID === 'générale' 
                                ? 'border-[#C8A96B] bg-[#FAF8F3] shadow-xs' 
                                : 'border-[#E8DFC9]/40 hover:border-[#C8A96B]/55'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedID === 'générale' ? 'border-[#1F3B2F]' : 'border-gray-300'}`}>
                              {selectedID === 'générale' && <div className="w-2 h-2 rounded-full bg-[#C8A96B]" />}
                            </div>
                            <div className="text-left">
                              <h5 className="text-[12px] font-sans font-bold text-[#1F3B2F] leading-tight">Consultation Générale Holistique</h5>
                              <p className="text-[10px] text-[#556B2F] font-sans tracking-wide mt-0.5">45 min – 70 €</p>
                            </div>
                          </div>

                          {/* Radio Card 2 */}
                          <div 
                            onClick={() => setSelectedID('médiumnique')}
                            className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition-all select-none ${
                              selectedID === 'médiumnique' 
                                ? 'border-[#C8A96B] bg-[#FAF8F3] shadow-xs' 
                                : 'border-[#E8DFC9]/40 hover:border-[#C8A96B]/55'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedID === 'médiumnique' ? 'border-[#1F3B2F]' : 'border-gray-300'}`}>
                              {selectedID === 'médiumnique' && <div className="w-2 h-2 rounded-full bg-[#C8A96B]" />}
                            </div>
                            <div className="text-left">
                              <h5 className="text-[12px] font-sans font-bold text-[#1F3B2F] leading-tight">Consultation Médiumnique</h5>
                              <p className="text-[10px] text-[#556B2F] font-sans tracking-wide mt-0.5">1 heure – 90 €</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Display Selected Date */}
                      <div>
                        <label className="text-[9.5px] uppercase tracking-widest text-[#1F3B2F] font-extrabold font-sans mb-3.5 block">
                          DATE SÉLECTIONNÉE
                        </label>
                        <p className="text-[13px] text-[#1F3B2F] font-serif font-semibold border-b border-gray-100 pb-3">{selectedDayLabel}</p>
                      </div>

                    </div>

                  </div>
                )}

                {/* STEP 2 LAYOUT: Choose Time Slot */}
                {activeStep === 2 && (
                  <div className="flex flex-col gap-6 items-start animate-fade-in">
                    <span className="flex items-center gap-1.5 text-xs text-[#556B2F] font-sans">
                      <Clock size={16} /> Étape 2 sur 4 : Sélection de l'horaire
                    </span>
                    <h4 className="font-serif text-xl font-light text-[#1F3B2F]">Choisissez l'heure de votre séance</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-xl">
                      Une consultation authentique requiert calme et réceptivité. Sélectionnez l'un des horaires conseillés ci-dessous pour le <strong>{selectedDayLabel}</strong> :
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      {timeSlots.map((time) => {
                        const isSelected = selectedTimeSlot === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(time)}
                            className={`px-6 py-4 rounded-xl border text-sm transition-all font-mono tracking-wide cursor-pointer flex flex-col items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#1F3B2F] text-white border-[#C8A96B] shadow-md font-extrabold'
                                : 'border-[#E8DFC9] text-gray-600 bg-stone-50 hover:border-[#1F3B2F] hover:bg-white'
                            }`}
                          >
                            <span className="text-base">{time}</span>
                            <span className="text-[8.5px] opacity-75 font-sans uppercase">Disponible</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="w-full bg-[#FAF8F3] p-5 rounded-2xl border border-[#E8DFC9]/35 text-xs text-[#556B2F] font-sans mt-6">
                      ✨ <strong>Rappel holistique</strong> : Les consultations sont effectuées en direct par Monique Morgat et durent {activeConsultation.duration}. Le prix de cette séance est de {activeConsultation.price} €.
                    </div>
                  </div>
                )}

                {/* STEP 3 LAYOUT: Enter Intention */}
                {activeStep === 3 && (
                  <div className="flex flex-col gap-6 items-start animate-fade-in w-full">
                    <span className="flex items-center gap-1.5 text-xs text-[#556B2F] font-sans">
                      <Sparkles size={16} /> Étape 3 sur 4 : Vos intentions d'éveil
                    </span>
                    <h4 className="font-serif text-xl font-light text-[#1F3B2F]">Décrivez vos intentions ou maux vibratoires</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-xl">
                      Monique utilise vos mots pour initier la focalisation énergétique avant votre séance. Partagez librement ce que vous souhaitez aborder (acné, eczéma spirituel, peurs karmiques, harmonisation, etc.) :
                    </p>

                    <div className="w-full flex flex-col gap-2 mt-2">
                      <label className="text-[9.5px] font-sans font-extrabold uppercase tracking-widest text-[#1F3B2F]">
                        Votre message intime
                      </label>
                      <textarea
                        className="w-full border border-[#E8DFC9] p-4 text-xs rounded-2xl resize-none h-32 text-gray-700 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#C8A96B] transition-all"
                        placeholder="Écrivez brièvement des informations à l’intention de Monique..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                      />
                    </div>

                    {/* Intention suggestions triggers */}
                    <div className="w-full">
                      <p className="text-[9px] font-sans uppercase tracking-widest text-gray-400 font-bold mb-3">Suggestions rapides d'appui :</p>
                      <div className="flex flex-wrap gap-2">
                        {intentionSuggestions.map((suggestion, ix) => (
                          <button
                            key={ix}
                            type="button"
                            onClick={() => setClientNotes(prev => prev ? `${prev}\n- ${suggestion}` : `- ${suggestion}`)}
                            className="text-[10px] font-sans text-gray-600 bg-stone-50 hover:bg-[#FAF8F3] border border-gray-100 hover:border-[#C8A96B]/50 px-3 py-1.5 rounded-full transition-all cursor-pointer text-left"
                          >
                            + {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 LAYOUT: Guest data + Stripe simulated payment */}
                {activeStep === 4 && (
                  <form onSubmit={handleBookingSubmit} className="flex flex-col gap-6 items-start animate-fade-in w-full">
                    
                    <span className="flex items-center gap-1.5 text-xs text-[#556B2F] font-sans">
                      <Lock size={16} /> Étape 4 sur 4 : Paiement haut de gamme sécurisé
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-2">
                      
                      {/* Left: Client recap & contact */}
                      <div className="flex flex-col gap-4">
                        <h5 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C8A96B] font-extrabold">COORDONNÉES REQUISES</h5>
                        
                        {currentUser ? (
                          <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8DFC9]/40 text-xs text-gray-600">
                            <p className="font-semibold text-[#1F3B2F] font-serif mb-1">Compte connecté avec éclat :</p>
                            <p>👤 Nom complet : <strong>{currentUser.firstName} {currentUser.lastName}</strong></p>
                            <p>📧 Adresse E-mail : <strong>{currentUser.email}</strong></p>
                            <p>📞 Téléphone : <strong>{currentUser.phone || 'Non renseigné'}</strong></p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3.5 bg-[#FAF8F3]/50 p-5 rounded-2xl border border-[#E8DFC9]/40">
                            <p className="text-[10px] text-gray-400 font-sans italic leading-tight">Aucun compte connecté détecté. Renseignez ces champs pour planifier en tant qu'invité :</p>
                            
                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-bold text-[#1F3B2F]">Prénom</label>
                                <input 
                                  type="text" 
                                  className="border border-[#E8DFC9] text-xs p-2.5 rounded bg-white" 
                                  placeholder="Votre prénom" 
                                  value={guestFirstName}
                                  onChange={(e) => setGuestFirstName(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-bold text-[#1F3B2F]">Nom</label>
                                <input 
                                  type="text" 
                                  className="border border-[#E8DFC9] text-xs p-2.5 rounded bg-white" 
                                  placeholder="Votre nom" 
                                  value={guestLastName}
                                  onChange={(e) => setGuestLastName(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[9px] font-bold text-[#1F3B2F]">Adresse E-mail</label>
                              <input 
                                type="email" 
                                className="border border-[#E8DFC9] text-xs p-2.5 rounded bg-white" 
                                placeholder="votre@email.com" 
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                required
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[9px] font-bold text-[#1F3B2F]">Téléphone (Rappels SMS)</label>
                              <input 
                                type="tel" 
                                className="border border-[#E8DFC9] text-xs p-2.5 rounded bg-white" 
                                placeholder="06 12 34 56 78" 
                                value={guestPhone}
                                onChange={(e) => setGuestPhone(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {/* Order info receipt box */}
                        <div className="border border-dashed border-[#E8DFC9] p-4 rounded-xl mt-2">
                          <p className="text-[10px] uppercase font-bold text-[#1F3B2F] mb-2 tracking-wider">Récapitulatif de séance</p>
                          <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                            <span>{activeConsultation.title} ({activeConsultation.duration})</span>
                            <span className="font-mono font-bold text-[#1F3B2F]">{activeConsultation.price} €</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Soin en visioconférence instantanée</span>
                            <span className="font-mono text-[#556B2F]">Gratuit</span>
                          </div>
                          <div className="w-full h-[1px] bg-gray-100 my-2.5" />
                          <div className="flex justify-between items-center text-xs font-bold text-[#1F3B2F]">
                            <span>TOTAL À PAYER</span>
                            <span className="font-mono text-sm text-[#C8A96B]">{activeConsultation.price} €</span>
                          </div>
                        </div>

                      </div>

                      {/* Right: Stripe integrated mock layout */}
                      <div className="flex flex-col gap-4 bg-stone-50 p-5 rounded-2xl border border-gray-100 shadow-xs">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C8A96B] font-extrabold">MODULE STRIPE SECURE</h5>
                          <span className="text-[10px] text-[#556B2F] font-bold flex items-center gap-1 bg-[#1F3B2F]/5 px-2 py-0.5 rounded-full"><Lock size={9} /> Crypté SSL</span>
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-[9px] uppercase font-bold text-gray-500">Nom du titulaire de carte</label>
                            <input
                              type="text"
                              className="border border-[#E8DFC9] p-2.5 rounded bg-white text-xs focus:outline-none focus:border-[#C8A96B]"
                              placeholder="Ex: Sophie Laurent"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-[9px] uppercase font-bold text-gray-500 flex justify-between">
                              <span>Numéro de carte de crédit</span>
                              <CreditCard size={12} className="text-[#C8A96B]" />
                            </label>
                            <input
                              type="text"
                              maxLength={19}
                              className="border border-[#E8DFC9] p-2.5 rounded bg-white text-xs focus:outline-none focus:border-[#C8A96B] font-mono"
                              placeholder="4242 4242 4242 4242"
                              value={cardNumber}
                              onChange={(e) => {
                                let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                let matches = v.match(/\d{4,16}/g);
                                let match = matches && matches[0] || ''
                                let parts = []
                                for (let i=0, len=match.length; i<len; i+=4) {
                                  parts.push(match.substring(i, i+4))
                                }
                                if (parts.length > 0) {
                                  setCardNumber(parts.join(' '))
                                } else {
                                  setCardNumber(v)
                                }
                              }}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3.5">
                            <div className="flex flex-col gap-1.5 text-left">
                              <label className="text-[9px] uppercase font-bold text-gray-500">Expiration</label>
                              <input
                                type="text"
                                maxLength={5}
                                className="border border-[#E8DFC9] p-2.5 rounded bg-white text-xs focus:outline-none focus:border-[#C8A96B] font-mono text-center"
                                placeholder="MM/AA"
                                value={cardExpiry}
                                onChange={(e) => {
                                  let v = e.target.value;
                                  if (v.length === 2 && !v.includes('/')) {
                                    setCardExpiry(v + '/');
                                  } else {
                                    setCardExpiry(v);
                                  }
                                }}
                                required
                              />
                            </div>

                            <div className="flex flex-col gap-1.5 text-left">
                              <label className="text-[9px] uppercase font-bold text-gray-500">Code CVC</label>
                              <input
                                type="text"
                                maxLength={3}
                                className="border border-[#E8DFC9] p-2.5 rounded bg-white text-xs focus:outline-none focus:border-[#C8A96B] font-mono text-center"
                                placeholder="123"
                                value={cardCVC}
                                onChange={(e) => setCardCVC(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-[10px] text-gray-400 leading-normal flex items-start gap-2.5 p-3.5 bg-stone-100 rounded-xl">
                          <Check size={14} className="text-[#C8A96B] shrink-0 mt-0.5" />
                          <span>En cliquant sur confirmer, vous autorisez notre comptoir de rituels à finaliser le virement sécurisé de {activeConsultation.price} € auprès de Stripe. Aucun prélèvement additionnel.</span>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#1F3B2F] hover:bg-[#152a21] text-white text-[11px] font-sans font-extrabold tracking-[0.2em] uppercase px-6 py-4 rounded-lg shadow-md transition-colors cursor-pointer text-center mt-2.5"
                        >
                          CONFIRMER ET RÉGLER ({activeConsultation.price} €)
                        </button>
                      </div>

                    </div>
                  </form>
                )}

              </div>
            </div>

            {/* Sticky/Responsive Footer Controller Buttons */}
            {activeStep < 4 && (
              <div className="pt-6 border-t border-[#E8DFC9]/35 flex items-center justify-between w-full">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 text-xs tracking-widest text-[#1F3B2F] hover:text-[#C8A96B] font-sans font-extrabold uppercase transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Retour
                  </button>
                ) : (
                  <div /> // spacing placeholder
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-[#1F3B2F] hover:bg-[#152a21] text-white text-[11px] font-sans font-extrabold tracking-[0.2em] uppercase px-10 py-4 rounded-lg shadow-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>{activeStep === 1 ? 'VOIR LES DISPONIBILITÉS' : activeStep === 2 ? 'SAISIR MON INTENTION' : 'COORDONNÉES & PAIEMENT'}</span>
                  <ArrowRight size={13} className="text-[#C8A96B]" />
                </button>
              </div>
            )}

          </div>

        </div>
      )}
    </motion.div>
  );
};
