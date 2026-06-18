/**
 * Premium Stream Hub OTT Subscription Application Base Component
 * High quality performance, modular layout.
 */
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ServiceGrid } from "./components/ServiceGrid";
import { ServiceDetails } from "./components/ServiceDetails";
import { CheckoutScreen } from "./components/CheckoutScreen";
import { 
  OTTSubscription, 
  getUpdatedSubscribers, 
  setCustomPrice, 
  getCustomQrCode, 
  setCustomQrCode, 
  getCustomWhatsapp, 
  setCustomWhatsapp 
} from "./data/ottData";
import { authService, GoogleUser } from "./lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck, Mail, Settings, Save, Phone, QrCode } from "lucide-react";

export default function App() {
  const [view, setView] = useState<"grid" | "details" | "checkout">("grid");
  const [selectedService, setSelectedService] = useState<OTTSubscription | null>(null);
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(authService.getCurrentUser());
  const [showWelcome, setShowWelcome] = useState(false);

  // Admin Customization States
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [services, setServices] = useState<OTTSubscription[]>(() => getUpdatedSubscribers());
  
  // Local temp inputs for the Admin Panel
  const [priceInputs, setPriceInputs] = useState<{ [id: string]: string }>({});
  const [qrInput, setQrInput] = useState("");
  const [whatsappInput, setWhatsappInput] = useState("");

  useEffect(() => {
    // Unsubscribe listener when app unmounts
    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // Initialize inputs when opening Admin Panel
  useEffect(() => {
    if (showAdminPanel) {
      const initialPrices: { [id: string]: string } = {};
      services.forEach(s => {
        initialPrices[s.id] = s.price.toString();
      });
      setPriceInputs(initialPrices);
      setQrInput(getCustomQrCode());
      setWhatsappInput(getCustomWhatsapp());
    }
  }, [showAdminPanel, services]);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdminPanel(true);
        return 0;
      }
      return next;
    });
  };

  const handleSaveAdminSettings = () => {
    // Save QR Code and Whatsapp
    setCustomQrCode(qrInput);
    setCustomWhatsapp(whatsappInput);

    // Save customized prices
    Object.keys(priceInputs).forEach((id) => {
      const val = priceInputs[id];
      const parsedNum = parseFloat(val);
      if (!isNaN(parsedNum)) {
        setCustomPrice(id, parsedNum);
      }
    });

    // Reload active services & close
    const updated = getUpdatedSubscribers();
    setServices(updated);
    
    // Update selected service reference if user is currently looking at description page
    if (selectedService) {
      const freshSelect = updated.find(s => s.id === selectedService.id);
      if (freshSelect) {
        setSelectedService(freshSelect);
      }
    }

    setShowAdminPanel(false);
  };

  const handleSelectService = (service: OTTSubscription) => {
    setSelectedService(service);
    setView("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      // Prompt user to sign in first with a gorgeous elegant banner/notification
      // Instead of jarring alert, let's show an clean automatic Google dialog selector/trigger
      setShowWelcome(true);
      
      // Auto-trigger the login simulator to keep flow extremely fluid and frictionless
      setTimeout(() => {
        authService.loginWithGoogle().then((user) => {
          setCurrentUser(user);
          setShowWelcome(false);
          setView("checkout");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }, 1500);
    } else {
      setView("checkout");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between selection:bg-indigo-600/20 overflow-x-hidden">
      
      {/* Visual Ambient Space Glow Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-violet-500/5 rounded-full filter blur-[80px] pointer-events-none z-0"></div>

      {/* Modern Header Navigation */}
      <Header onUserChange={(u) => setCurrentUser(u)} onLogoClick={handleLogoClick} />

      {/* Main Container screen transitions */}
      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: THE CATALOGUE GRID */}
          {view === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
            >
              <ServiceGrid services={services} onSelectService={handleSelectService} />
            </motion.div>
          )}

          {/* SCREEN 2: SERVICE DESCRIPTION & DETAILS */}
          {view === "details" && selectedService && (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <ServiceDetails
                service={selectedService}
                onBack={() => setView("grid")}
                onBuy={handleBuyNow}
              />
            </motion.div>
          )}

          {/* SCREEN 3: PAYMENT CHECKOUT */}
          {view === "checkout" && selectedService && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              <CheckoutScreen
                service={selectedService}
                user={currentUser}
                onBack={() => setView("details")}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Hide the Admin Panel trigger from general users, only unhiding for administrator email list */}
      {currentUser?.email === "dhariwal.antriksh10@gmail.com" && (
        <button
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-slate-900 border border-slate-700 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-300 flex items-center justify-center cursor-pointer hover:rotate-45"
          title="Open Admin Config Panel"
        >
          <Settings className="w-5 h-5 text-indigo-400" />
        </button>
      )}

      {/* Secret Admin panel modal */}
      <AnimatePresence>
        {showAdminPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-2xl relative my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      Secret Administrative Suite
                    </h3>
                    <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                      Fully hidden from public general audience
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="p-1 px-2.5 py-1 text-slate-400 hover:text-slate-600 transition text-xs border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Form contents */}
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                
                {/* Contact configurations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WhatsApp contact number */}
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 font-extrabold block mb-2">
                      WHATSAPP RECIPIENT PHONE (WITH COUNTRY CODE)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={whatsappInput}
                        onChange={(e) => setWhatsappInput(e.target.value)}
                        placeholder="e.g. 919024885265"
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9.5 pr-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600 transition"
                      />
                    </div>
                  </div>

                  {/* UPI QR image link */}
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 font-extrabold block mb-2">
                      UPI GATEWAY QR CODE RECIPIENT IMAGE URL
                    </label>
                    <div className="relative">
                      <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={qrInput}
                        onChange={(e) => setQrInput(e.target.value)}
                        placeholder="Image URL link"
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9.5 pr-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Subscriptions section */}
                <div>
                  <h4 className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-extrabold mb-4">
                    ACTIVE SUBSCRIPTION VAULT UNIT PRICING (INR)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((sub) => (
                      <div key={sub.id} className="border border-slate-150 p-3 rounded-xl bg-white flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-slate-700 truncate block mb-1">
                          {sub.name}
                        </span>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={priceInputs[sub.id] || ""}
                            onChange={(e) => setPriceInputs({
                              ...priceInputs,
                              [sub.id]: e.target.value
                            })}
                            className="w-full bg-slate-50 border border-slate-150 rounded-lg py-1.5 pl-6 pr-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-500 transition text-right"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAdminPanel(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAdminSettings}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-100 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Floating Google SignIn Required Prompt */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-indigo-150 relative text-center"
            >
              <div className="mx-auto w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase block mb-1 font-bold">
                MEMBERSHIP CHECKPOINT
              </span>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">
                Authentication Required
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                To purchase premium subscriptions securely and register your order, please log in using your Google account.
              </p>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center space-x-2 text-xs text-slate-600 mb-6 font-medium">
                <Mail className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span>Redirecting you to Google login...</span>
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 transition text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
