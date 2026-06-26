/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, X, Trash2, Plus, Minus, CreditCard, 
  CheckCircle2, User as UserIcon, Sparkles, Package, Clock, ArrowRight 
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Page Views
import { Home } from './pages/Home';
import { Boutique } from './pages/Boutique';
import { ProductDetails } from './pages/ProductDetails';
import { Consultations } from './pages/Consultations';
import { Booking } from './pages/Booking';
import { NotreHistoire } from './pages/NotreHistoire';
import { RencontreMonique } from './pages/RencontreMonique';
import { Blog } from './pages/Blog';
import { BlogDetails } from './pages/BlogDetails';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';

import { DashboardClient } from './components/DashboardClient';
import { DashboardAdmin } from './components/DashboardAdmin';

// Mock Data & Types
import { 
  Product, BlogArticle, Testimonial, Consultation, 
  ConsultationBooking, Order, ContactMessage, User, CartItem, AdviceDocument,
  ProductReview 
} from './types';
import { 
  mockProducts, mockArticles, mockTestimonials, 
  mockConsultations, mockOrders, mockAdviceDocuments 
} from './data/mockData';
import { getVariantPrice } from './utils/productHelpers';

export default function App() {
  // Page routing state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentPageParams, setCurrentPageParams] = useState<any>(null);

  // Core Entity States (persisted in localStorage or loaded from mockData)
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [adviceDocs, setAdviceDocs] = useState<AdviceDocument[]>([]);

  // User session state
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Product Reviews State
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);

  // Shopping Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Auth Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register'>('login');

  // Simulated stripe checkout states
  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCountry, setShippingCountry] = useState('France');
  const [cardNumber, setCardNumber] = useState('');
  const [checkoutSuccessOrder, setCheckoutSuccessOrder] = useState<Order | null>(null);

  // Setup Initial Database on Mount
  useEffect(() => {
    // 1. Products
    const storedProducts = localStorage.getItem('va_products');
    if (storedProducts) {
      let parsed = JSON.parse(storedProducts) as Product[];
      // auto-migrate broken image
      let changed = false;
      parsed = parsed.map(p => {
        if (p.id === 'savon-ancestral' && p.image !== 'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=600&auto=format&fit=crop') {
          p.image = 'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=600&auto=format&fit=crop';
          changed = true;
        }
        if (p.id === 'lotion-aura' && (p.image === 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop' || !p.image)) {
          p.image = 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop';
          if (p.images && p.images[0] === 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop') {
            p.images[0] = 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop';
          }
          changed = true;
        }
        if (p.id === 'rituel-protection' && (p.image === 'https://images.unsplash.com/photo-1605264964522-374ec3658e16?q=80&w=600&auto=format&fit=crop' || !p.image)) {
          p.image = 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop';
          if (p.images && p.images[0] === 'https://images.unsplash.com/photo-1605264964522-374ec3658e16?q=80&w=600&auto=format&fit=crop') {
            p.images[0] = 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop';
          }
          changed = true;
        }
        return p;
      });
      if (changed) {
        localStorage.setItem('va_products', JSON.stringify(parsed));
      }
      setProducts(parsed);
    } else {
      localStorage.setItem('va_products', JSON.stringify(mockProducts));
      setProducts(mockProducts);
    }

    // 2. Articles
    const storedArticles = localStorage.getItem('va_articles');
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    } else {
      localStorage.setItem('va_articles', JSON.stringify(mockArticles));
      setArticles(mockArticles);
    }

    // 3. Testimonials
    const storedTestimonials = localStorage.getItem('va_testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      localStorage.setItem('va_testimonials', JSON.stringify(mockTestimonials));
      setTestimonials(mockTestimonials);
    }

    // 4. Consultations Types
    setConsultations(mockConsultations);

    // 5. Bookings
    const storedBookings = localStorage.getItem('va_bookings');
    if (storedBookings) {
      let bookingsList = JSON.parse(storedBookings) as ConsultationBooking[];
      let changed = false;
      bookingsList = bookingsList.map(b => {
        if (b.userName && b.userName.includes('Herbert')) {
          b.userName = b.userName.replace(/Herbert/g, 'Hari');
          changed = true;
        }
        if (b.userEmail && b.userEmail.includes('herbertdjegui')) {
          b.userEmail = b.userEmail.replace(/herbertdjegui/g, 'haridjegui');
          changed = true;
        }
        return b;
      });
      if (changed) {
        localStorage.setItem('va_bookings', JSON.stringify(bookingsList));
      }
      setBookings(bookingsList);
    } else {
      const initialBookings: ConsultationBooking[] = [
        {
          id: 'b-1',
          userId: 'u-1',
          userEmail: 'haridjegui@gmail.com',
          userName: 'Hari Djegui',
          consultationType: 'general',
          consultationTitle: 'Consultation Générale Intuitive',
          price: 70,
          date: '2026-06-25',
          timeSlot: '14:00',
          status: 'Confirmée',
          notes: 'Recherche de clarté énergétique sur mon teint.'
        }
      ];
      localStorage.setItem('va_bookings', JSON.stringify(initialBookings));
      setBookings(initialBookings);
    }

    // 6. Orders
    const storedOrders = localStorage.getItem('va_orders');
    if (storedOrders) {
      let ordersList = JSON.parse(storedOrders) as Order[];
      let changed = false;
      ordersList = ordersList.map(o => {
        if (o.customerName && o.customerName.includes('Herbert')) {
          o.customerName = o.customerName.replace(/Herbert/g, 'Hari');
          changed = true;
        }
        if (o.customerEmail && o.customerEmail.includes('herbertdjegui')) {
          o.customerEmail = o.customerEmail.replace(/herbertdjegui/g, 'haridjegui');
          changed = true;
        }
        return o;
      });
      if (changed) {
        localStorage.setItem('va_orders', JSON.stringify(ordersList));
      }
      setOrders(ordersList);
    } else {
      localStorage.setItem('va_orders', JSON.stringify(mockOrders));
      setOrders(mockOrders);
    }

    // 7. Messages
    const storedMessages = localStorage.getItem('va_messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const initialMessages: ContactMessage[] = [
        {
          id: 'm-1',
          name: 'Jean-Baptiste M.',
          email: 'jb@example.com',
          subject: 'Question sur la livraison internationale',
          message: 'Bonjour, expédiez-vous vers le Canada avec suivi DHL ?',
          date: '18 Juin 2026',
          status: 'Non lu'
        }
      ];
      localStorage.setItem('va_messages', JSON.stringify(initialMessages));
      setMessages(initialMessages);
    }

    // 8. User Session
    const storedUser = localStorage.getItem('va_user');
    if (storedUser) {
      let userObj = JSON.parse(storedUser) as User;
      let changed = false;
      if (userObj.firstName === 'Herbert') {
        userObj.firstName = 'Hari';
        changed = true;
      }
      if (userObj.email === 'herbertdjegui@gmail.com') {
        userObj.email = 'haridjegui@gmail.com';
        changed = true;
      }
      if (changed) {
        localStorage.setItem('va_user', JSON.stringify(userObj));
      }
      setCurrentUser(userObj);
    }

    // 9. Shopping Cart
    const storedCart = localStorage.getItem('va_cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // 10. Product Reviews
    const storedReviews = localStorage.getItem('va_product_reviews');
    if (storedReviews) {
      setProductReviews(JSON.parse(storedReviews));
    }

    // 11. Advice Documents
    const storedAdviceDocs = localStorage.getItem('va_advice_docs');
    if (storedAdviceDocs) {
      setAdviceDocs(JSON.parse(storedAdviceDocs));
    } else {
      localStorage.setItem('va_advice_docs', JSON.stringify(mockAdviceDocuments));
      setAdviceDocs(mockAdviceDocuments);
    }
  }, []);

  // Sync state modifications with localStorage
  const updateStoredProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('va_products', JSON.stringify(newProducts));
  };

  const updateStoredOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('va_orders', JSON.stringify(newOrders));
  };

  const updateStoredBookings = (newBookings: ConsultationBooking[]) => {
    setBookings(newBookings);
    localStorage.setItem('va_bookings', JSON.stringify(newBookings));
  };

  const updateStoredTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    localStorage.setItem('va_testimonials', JSON.stringify(newTestimonials));
  };

  const updateStoredMessages = (newMessages: ContactMessage[]) => {
    setMessages(newMessages);
    localStorage.setItem('va_messages', JSON.stringify(newMessages));
  };

  const updateStoredUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('va_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('va_user');
    }
  };

  const updateStoredCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('va_cart', JSON.stringify(newCart));
  };

  // State handlers helper functions
  const handlePageRouting = (page: string, params: any = null) => {
    if (page === 'login') {
      setAuthModalInitialTab('login');
      setIsAuthModalOpen(true);
      return;
    }
    if (page === 'register') {
      setAuthModalInitialTab('register');
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentPage(page);
    setCurrentPageParams(params);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent, quantity = 1, variant = 'Flacon Nomade - 30 ml') => {
    e.stopPropagation();
    
    // Find if already exists
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.variant === variant);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        variant
      });
    }

    updateStoredCart(updatedCart);
    setIsCartOpen(true); // Pop cart drawer instantly for elegant luxury experience
  };

  const handleUpdateCartQuantity = (id: string, newAmt: number) => {
    if (newAmt < 1) return;
    const updated = cart.map(item => item.id === id ? { ...item, quantity: newAmt } : item);
    updateStoredCart(updated);
  };

  const handleRemoveFromCart = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    updateStoredCart(updated);
  };

  const handleAddProductReview = (review: ProductReview) => {
    const updated = [review, ...productReviews];
    setProductReviews(updated);
    localStorage.setItem('va_product_reviews', JSON.stringify(updated));
  };

  const handleBookConsultation = (newBooking: ConsultationBooking) => {
    const updated = [newBooking, ...bookings];
    updateStoredBookings(updated);
  };

  const handleAddTestimonial = (testimonial: Testimonial) => {
    const updated = [testimonial, ...testimonials];
    updateStoredTestimonials(updated);
  };

  const handleAddContactMessage = (msg: ContactMessage) => {
    const updated = [msg, ...messages];
    updateStoredMessages(updated);
  };

  // Calculates financial balances in shopping basket
  const cartSubtotal = (cart || []).reduce((acc, item) => {
    const itemPrice = getVariantPrice(item.product.price, item.variant || '100ml');
    return acc + itemPrice * item.quantity;
  }, 0);

  // SIMULATED STRIPE CHECKOUT PLACING AN AUTHENTIC ORDER IN LOCALSTORAGE QUEUE
  const handleSimulatePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if ((cart || []).length === 0) return;
    if (!shippingAddress || !shippingCity || !shippingZip || !shippingCountry) {
      alert("Veuillez renseigner toutes les coordonnées d'expédition.");
      return;
    }

    // Capture standard customer identity
    const clientName = currentUser 
      ? `${currentUser.firstName} ${currentUser.lastName}` 
      : 'Hari Djegui';
    const clientEmail = currentUser 
      ? currentUser.email 
      : 'haridjegui@gmail.com';
    const clientID = currentUser 
      ? currentUser.id 
      : 'u-1';

    // 1. Map products placed order
    const orderedProducts = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }));

    // 2. Draft target order
    const freshOrder: Order = {
      id: `ORD-${Math.floor(12502 + Math.random() * 80000)}`,
      userId: clientID,
      customerEmail: clientEmail,
      customerName: clientName,
      createdAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: orderedProducts,
      totalAmount: cartSubtotal,
      status: 'Payée', // Real paid transactions simulations
      shippingAddress: {
        street: shippingAddress,
        city: shippingCity,
        postalCode: shippingZip,
        country: shippingCountry
      },
      trackingNumber: `DHL-${Math.floor(10050402 + Math.random() * 90020050)}`
    };

    // 3. Update database states
    const updatedOrders = [freshOrder, ...orders];
    updateStoredOrders(updatedOrders);

    // 4. Subtract product stocks
    const updatedProductsList = products.map((prod) => {
      const matchInBasket = cart.find(item => item.product.id === prod.id);
      if (matchInBasket) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - matchInBasket.quantity)
        };
      }
      return prod;
    });
    updateStoredProducts(updatedProductsList);

    // 5. Clear basket and display success
    updateStoredCart([]);
    setCheckoutSuccessOrder(freshOrder);
    setIsCheckoutFormOpen(false);
  };

  const handleDismissOrderToast = () => {
    setCheckoutSuccessOrder(null);
    handlePageRouting('dashboard_client');
  };

  return (
    <div className="font-sans text-[#3B2F2F] bg-[#FAF8F3] min-h-screen flex flex-col justify-between selection:bg-[#C8A96B] selection:text-white">
      
      {/* Dynamic Header Navbar navigation */}
      <Navbar 
        currentPage={currentPage} 
        setPage={handlePageRouting} 
        currentUser={currentUser} 
        onLogout={() => {
          updateStoredUser(null);
          handlePageRouting('home');
        }}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Viewport Routing Switcher */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home 
            setPage={handlePageRouting} 
            featuredProducts={products} 
            testimonials={testimonials}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'boutique' && (
          <Boutique 
            products={products} 
            setPage={handlePageRouting} 
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'product_details' && currentPageParams?.product && (
          <ProductDetails 
            product={currentPageParams.product} 
            setPage={handlePageRouting} 
            onAddToCart={handleAddToCart}
            reviews={productReviews.filter(r => r.productId === currentPageParams.product.id)}
            onAddReview={handleAddProductReview}
          />
        )}

        {currentPage === 'consultations' && (
          <Consultations 
            consultations={consultations} 
            currentUser={currentUser} 
            onBookConsultation={handleBookConsultation}
            setPage={handlePageRouting}
          />
        )}

        {currentPage === 'booking' && (
          <Booking 
            consultations={consultations}
            currentUser={currentUser}
            onBookConsultation={handleBookConsultation}
            setPage={handlePageRouting}
            initialSelectedID={currentPageParams?.initialSelectedID}
          />
        )}

        {currentPage === 'history' && (
          <NotreHistoire setPage={handlePageRouting} />
        )}

        {currentPage === 'monique' && (
          <RencontreMonique />
        )}

        {currentPage === 'blog' && (
          <Blog 
            articles={articles} 
            setPage={handlePageRouting}
          />
        )}

        {currentPage === 'blog_details' && currentPageParams?.article && (
          <BlogDetails 
            article={currentPageParams.article} 
            allArticles={articles} 
            setPage={handlePageRouting}
          />
        )}

        {currentPage === 'testimonials_page' && (
          <TestimonialsPage 
            testimonials={testimonials} 
            onAddTestimonial={handleAddTestimonial}
            setPage={handlePageRouting}
          />
        )}

        {currentPage === 'contact' && (
          <Contact onAddMessage={handleAddContactMessage} />
        )}



        {currentPage === 'dashboard_client' && (
          <DashboardClient 
            currentUser={currentUser || {
              id: 'u-1',
              firstName: 'Hari',
              lastName: 'Djegui',
              email: 'haridjegui@gmail.com',
              phone: '+33 6 12 34 56 78',
              role: 'client',
              createdAt: '2026-06-01T08:00:00Z'
            }} 
            orders={orders} 
            bookings={bookings} 
            adviceDocs={adviceDocs}
            onLogout={() => {
              updateStoredUser(null);
              handlePageRouting('home');
            }}
            onUpdateUser={(userData) => {
              const current = currentUser || {
                id: 'u-1',
                firstName: 'Hari',
                lastName: 'Djegui',
                email: 'haridjegui@gmail.com',
                phone: '+33 6 12 34 56 78',
                role: 'client',
                createdAt: '2026-06-01T08:00:00Z'
              };
              updateStoredUser({ ...current, ...userData });
            }}
          />
        )}

        {currentPage === 'dashboard_admin' && (
          <DashboardAdmin 
            currentUser={currentUser || {
              id: 'u-admin',
              firstName: 'Monique',
              lastName: 'Morgat',
              email: 'admin@vertusancestrales.com',
              phone: '+33 1 45 61 23 87',
              role: 'admin',
              createdAt: '2026-01-01T08:00:00Z'
            }} 
            products={products} 
            orders={orders} 
            bookings={bookings} 
            articles={articles}
            testimonials={testimonials}
            users={[
              {
                id: 'u-1',
                firstName: 'Hari',
                lastName: 'Djegui',
                email: 'haridjegui@gmail.com',
                phone: '+33 6 12 34 56 78',
                role: 'client',
                createdAt: '2026-06-01T08:00:00Z'
              },
              {
                id: 'u-2',
                firstName: 'Monique',
                lastName: 'Morgat',
                email: 'admin@vertusancestrales.com',
                phone: '+33 1 45 61 23 87',
                role: 'admin',
                createdAt: '2026-01-01T08:00:00Z'
              }
            ]}
            contacts={messages}
            onAddProduct={(prod) => updateStoredProducts([...products, prod])}
            onEditProduct={(prod) => updateStoredProducts(products.map(p => p.id === prod.id ? prod : p))}
            onDeleteProduct={(id) => updateStoredProducts(products.filter(p => p.id !== id))}
            onUpdateOrderStatus={(orderId, status, tracking) => updateStoredOrders(orders.map(o => o.id === orderId ? { ...o, status, trackingNumber: tracking } : o))}
            onUpdateBookingStatus={(bookingId, status) => updateStoredBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b))}
            onAddArticle={(art) => {
              const updated = [...articles, art];
              setArticles(updated);
              localStorage.setItem('va_articles', JSON.stringify(updated));
            }}
            onDeleteArticle={(id) => {
              const updated = articles.filter(a => a.id !== id);
              setArticles(updated);
              localStorage.setItem('va_articles', JSON.stringify(updated));
            }}
            onApproveTestimonial={() => {}}
            onDeleteTestimonial={(id) => updateStoredTestimonials(testimonials.filter(t => t.id !== id))}
            onReplyContact={(id) => {
              const updated = messages.map(m => m.id === id ? { ...m, status: 'Lu' as const } : m);
              updateStoredMessages(updated);
            }}
            setPage={handlePageRouting}
          />
        )}
      </main>

      {/* Elegant Editorial Footer */}
      <Footer 
        setPage={handlePageRouting} 
        onQuickLogin={(role) => {
          if (role === 'admin') {
            updateStoredUser({
              id: 'u-admin',
              firstName: 'Monique',
              lastName: 'Morgat',
              email: 'admin@vertusancestrales.com',
              phone: '+33 1 45 61 23 87',
              role: 'admin',
              createdAt: '2026-01-01T08:00:00Z'
            });
            handlePageRouting('dashboard_admin');
          } else {
            updateStoredUser({
              id: 'u-1',
              firstName: 'Hari',
              lastName: 'Djegui',
              email: 'haridjegui@gmail.com',
              phone: '+33 6 12 34 56 78',
              role: 'client',
              createdAt: '2026-06-01T08:00:00Z'
            });
            handlePageRouting('dashboard_client');
          }
        }}
      />

      {/* =========================================================================
                             6. PORTAL SHOPPING CART DRAWER
         ========================================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans text-xs animate-fade-in">
          {/* Backdrop overlay */}
          <div 
            onClick={() => { setIsCartOpen(false); setIsCheckoutFormOpen(false); }}
            className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity" 
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-[#E8DFC9] flex flex-col justify-between relative shadow-2xl animate-slide-left">
              
              {/* Header basket title */}
              <div className="p-5 border-b border-[#E8DFC9]/30 bg-[#FAF8F3] flex items-center justify-between">
                <h3 className="font-serif text-base font-semibold text-[#1F3B2F] flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#C8A96B]" />
                  <span>Votre Panier Sacré</span>
                </h3>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckoutFormOpen(false); }}
                  className="p-1 rounded-full text-gray-500 hover:bg-[#E8DFC9]/30 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {isCheckoutFormOpen ? (
                  /* STRIPE CHECKOUT FORM PANEL */
                  <form onSubmit={handleSimulatePlaceOrder} className="flex flex-col gap-4 animate-fade-in">
                    <span className="text-[9px] uppercase tracking-wider text-[#C8A96B] font-bold">Étape Finale</span>
                    <h4 className="font-serif text-lg font-semibold text-[#1F3B2F] mb-1">Renseigner Votre Expédition</h4>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold text-gray-700">Adresse de Livraison (Rue)</label>
                      <input
                         type="text"
                         className="border border-[#E8DFC9] p-2.5 rounded bg-stone-50 focus:bg-white text-xs focus:outline-none"
                         placeholder="Ex: 14 Rue de Fleurus"
                         value={shippingAddress}
                         onChange={(e) => setShippingAddress(e.target.value)}
                         required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-semibold text-[#1F3B2F] text-xs">Pays de Livraison</label>
                      <select
                        className="border border-[#E8DFC9] p-2.5 rounded bg-stone-50 focus:bg-white text-xs focus:outline-none cursor-pointer text-[#1F3B2F]"
                        value={shippingCountry}
                        onChange={(e) => setShippingCountry(e.target.value)}
                        required
                      >
                        <option value="France">🇫🇷 France</option>
                        <option value="Belgique">🇧🇪 Belgique</option>
                        <option value="Suisse">🇨🇭 Suisse</option>
                        <option value="Canada">🇨🇦 Canada</option>
                        <option value="Luxembourg">🇱🇺 Luxembourg</option>
                        <option value="Monaco">🇲🇨 Monaco</option>
                        <option value="Autre">🌍 Autre pays</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-gray-700">Ville</label>
                        <input
                          type="text"
                          className="border border-[#E8DFC9] p-2.5 rounded bg-stone-50 focus:bg-white text-xs focus:outline-none"
                          placeholder="Paris"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-gray-700">Code Postal</label>
                        <input
                          type="text"
                          className="border border-[#E8DFC9] p-2.5 rounded bg-stone-50 focus:bg-white text-xs focus:outline-none"
                          placeholder="75006"
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* FAKE CREDIT CARD DETAIL MOCK */}
                    <div className="border border-[#E8DFC9] rounded-lg p-4 bg-[#FAF8F3] flex flex-col gap-3 mt-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#1F3B2F] font-bold flex items-center gap-1">
                        <CreditCard size={12} className="text-[#C8A96B]" />
                        Paiement sécurisé par Stripe
                      </span>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-gray-600 text-[10px]">Numéro de carte</label>
                        <input
                          type="text"
                          className="border border-[#E8DFC9] p-2 rounded bg-white text-xs tracking-widest text-center"
                          placeholder="4242 •••• •••• 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-semibold py-4 rounded-lg transition-colors cursor-pointer w-full mt-4 flex items-center justify-center gap-2"
                    >
                      <span>Valider & Commander • {cartSubtotal.toFixed(2)} €</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsCheckoutFormOpen(false)}
                      className="text-center text-[10px] uppercase font-bold text-gray-400 hover:text-[#1F3B2F] mt-1"
                    >
                      Retourner au panier
                    </button>
                  </form>
                ) : (
                  /* BUCKET PRODUCTS LIST */
                  <>
                    {cart.length === 0 ? (
                      <div className="py-20 text-center flex flex-col items-center gap-3">
                        <ShoppingBag size={35} className="text-[#E8DFC9] stroke-[1.2]" />
                        <p className="text-xs text-gray-400 italic">Votre panier est encore vide d'onguents.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div 
                            key={item.id}
                            className="flex items-center gap-4 p-3 bg-stone-50 border border-[#E8DFC9]/20 rounded-lg"
                          >
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-12 h-12 rounded object-cover border bg-white"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif font-bold text-xs text-[#1F3B2F] truncate leading-tight">
                                {item.product.name}
                              </h4>
                              <p className="text-[10px] text-[#C8A96B] font-sans mt-0.5 truncate">{item.variant}</p>
                              <p className="font-serif text-xs font-semibold text-[#1F3B2F] mt-1">
                                {(getVariantPrice(item.product.price, item.variant || '100ml') * item.quantity).toFixed(2)} €
                              </p>
                            </div>
                            
                            {/* Counter actions */}
                            <div className="flex flex-col items-center gap-2.5">
                              <div className="flex border border-gray-200 bg-white rounded overflow-hidden text-[10px]">
                                <button 
                                  onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1.5 hover:bg-stone-50 text-gray-600 cursor-pointer"
                                  type="button"
                                >
                                  <Minus size={9} />
                                </button>
                                <span className="px-2.5 py-1.5 font-mono font-bold flex items-center justify-center">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1.5 hover:bg-stone-50 text-gray-600 cursor-pointer"
                                  type="button"
                                >
                                  <Plus size={9} />
                                </button>
                              </div>
                              <button 
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-gray-400 hover:text-[#D64545] cursor-pointer"
                                title="Enlever"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Basket Drawer subtotal footer */}
              {!isCheckoutFormOpen && cart.length > 0 && (
                <div className="p-5 border-t border-[#E8DFC9]/40 bg-[#FAF8F3] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-sm font-semibold text-[#1F3B2F]">Sous-total de la commande</span>
                    <span className="font-serif text-base font-bold text-[#1F3B2F]">{cartSubtotal.toFixed(2)} €</span>
                  </div>
                  <div className="text-[11px] text-[#556B2F] leading-none flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 bg-[#C8A96B] rounded-full shrink-0" />
                    <span>Livraison suivie par DHL Express internationale offerte.</span>
                  </div>
                  
                  <button
                    onClick={() => setIsCheckoutFormOpen(true)}
                    className="w-full bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform cursor-pointer"
                  >
                    <CreditCard size={13} />
                    <span>Procéder au paiement (Stripe)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ORDER SUCCESS MODAL CELEBRATION (HIGH PRESTIGE SUCCESS FEEDBACK) */}
      {checkoutSuccessOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans text-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-[#E8DFC9] max-w-md w-full p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center gap-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-[#1F7A4D]/10 text-[#1F7A4D] border border-[#1F7A4D]/25 flex items-center justify-center">
              <CheckCircle2 size={24} className="stroke-[2.5]" />
            </div>
            
            <h3 className="font-serif text-2xl text-[#1F3B2F] font-bold">Commande Validée avec Succès !</h3>
            <p className="text-xs text-[#6B7280] font-sans leading-relaxed max-w-sm">
              Votre paiement de <strong>{checkoutSuccessOrder.totalAmount.toFixed(2)} €</strong> a été authentifié de manière sécurisée par Stripe. Monique et son équipe préparent vos onguents avec amour.
            </p>

            <div className="w-full bg-[#FAF8F3] p-4 rounded border border-[#E8DFC9]/35 text-left flex flex-col gap-2 font-mono text-[10px] text-[#3B2F2F]">
              <p>🧾 No Facture : <strong>{checkoutSuccessOrder.id}</strong></p>
              <p>📍 Expédié à : <span className="text-[#1F3B2F]">{checkoutSuccessOrder.shippingAddress.street}, {checkoutSuccessOrder.shippingAddress.postalCode} {checkoutSuccessOrder.shippingAddress.city} ({checkoutSuccessOrder.shippingAddress.country})</span></p>
              <p>📦 Transporteur : <span className="text-[#556B2F]">DHL Express Cargo</span></p>
              <p>🔗 Suivi DHL : <span className="text-[#C8A96B] font-bold">{checkoutSuccessOrder.trackingNumber}</span></p>
            </div>

            <button
              onClick={handleDismissOrderToast}
              className="bg-[#1F3B2F] hover:bg-[#556B2F] text-white text-xs tracking-widest uppercase font-semibold py-3.5 rounded-lg w-full mt-2 cursor-pointer transition-colors"
            >
              Suivre l'expédition sur mon tableau de bord
            </button>
          </div>
        </div>
      )}

      {/* GLOBAL LUXURY AUTH OVERLAY POPUP */}
      <Auth
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalInitialTab}
        onLogin={(user) => {
          updateStoredUser(user);
          setIsAuthModalOpen(false);
          // Redirect dynamically based on role
          if (user.role === 'admin') {
            handlePageRouting('dashboard_admin');
          } else {
            handlePageRouting('dashboard_client');
          }
        }}
      />
    </div>
  );
}
