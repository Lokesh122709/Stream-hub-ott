/**
 * Responsive Subscription Catalog Grid with category tabs and fast fuzzy-search filters
 */
import React, { useState } from "react";
import { OTTSubscription, OTT_SUBSCRIBERS, getLogo } from "../data/ottData";
import { Search, Compass, Tv, Music, Briefcase, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceGridProps {
  onSelectService: (service: OTTSubscription) => void;
  services: OTTSubscription[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onSelectService, services }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "entertainment" | "music" | "productivity">("all");
  
  // Local state to track which card is currently performing the pop-up logo transition
  const [animatingService, setAnimatingService] = useState<OTTSubscription | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (service: OTTSubscription) => {
    // Start step 1: triggering the popup animation of the logo
    setAnimatingService(service);
    
    // Step 2: after a beautiful timeline duration (800ms), advance to page 2 (description page)
    setTimeout(() => {
      setAnimatingService(null);
      onSelectService(service);
    }, 1100);
  };

  const categories = [
    { id: "all", name: "All Vaults", icon: Compass },
    { id: "entertainment", name: "Cinema & Live TV", icon: Tv },
    { id: "music", name: "Music Audio", icon: Music },
    { id: "productivity", name: "Premium SaaS", icon: Briefcase },
  ] as const;

  return (
    <div className="relative z-10 p-4 max-w-6xl mx-auto py-10">
      {/* Visual background lights */}
      <div className="netbond-glow-bg top-10 left-10 opacity-15"></div>
      <div className="netbond-glow-bg bottom-10 right-10 opacity-15"></div>

      {/* Intro hero text */}
      <div className="text-center mb-10">
        <span className="px-3.5 py-1 rounded-full border border-indigo-150 bg-indigo-50 text-[11px] font-mono tracking-widest text-indigo-700 uppercase inline-block mb-3.5 font-bold shadow-sm">
          ★ EXCLUSIVE PREMIUM SUBSCRIPTIONS ★
        </span>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-none mb-3">
          OTT Marketplace for Elite Accounts
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Unlock premium access to premium products. Direct automatic setups, ad-free viewing, and extreme clarity, delivered instantly.
        </p>
      </div>

      {/* Navigation search & Filter section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl mb-8 shadow-sm">
        {/* Toggle Category filter tab */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none scrollbar-thin">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-1.5 p-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-150"
                    : "text-slate-550 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Live Search Inputs */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="subscription-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subscriptions..."
            className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9.5 pr-4 text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all font-semibold"
          />
        </div>
      </div>

      {/* Grid items */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {filteredServices.map((service, index) => {
            const logoBase64 = getLogo(service.logoKey);
            return (
              <div
                key={service.id}
                id={`product-card-${service.id}`}
                onClick={() => handleCardClick(service)}
                className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-4.5 flex flex-col justify-between hover:border-slate-350 cyber-card-glow h-[190px] transition-all duration-300 overflow-hidden shadow-sm"
              >
                {/* Visual subtle corner lines */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-indigo-650"></div>
                </div>

                {/* Grid Item Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="relative w-12 h-12 p-0.5 rounded-xl border border-slate-100 bg-slate-50 group-hover:border-slate-200 transition overflow-hidden shadow-sm flex items-center justify-center">
                    {logoBase64 ? (
                      <img
                        src={logoBase64}
                        alt={service.name}
                        className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-50 text-indigo-650 text-xs flex items-center justify-center font-bold">
                        {service.name.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-650 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>

                {/* Grid Item Content & Title */}
                <div>
                  <h3 className="font-display font-medium text-xs text-slate-800 tracking-normal group-hover:text-indigo-600 transition-colors line-clamp-1 mb-0.5 font-bold">
                    {service.name}
                  </h3>
                  <p className="text-[10px] text-slate-550 font-sans line-clamp-1 group-hover:text-slate-700 transition-colors">
                    {service.tagline}
                  </p>
                </div>

                {/* Pricing / CTA Section */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-wider text-slate-450 uppercase block leading-none mb-0.5 font-bold">
                      STARTING AT
                    </span>
                    <span className="text-[13px] font-mono font-bold text-slate-850 tracking-widest flex items-baseline">
                      ₹{service.price}
                      <span className="text-[9px] text-slate-500 font-sans ml-1 tracking-normal font-normal">
                        /{service.duration.split(" ")[1]}
                      </span>
                    </span>
                  </div>
                  
                  {/* Subtle hover mini button */}
                  <div className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-600 font-bold transition-colors">
                    GO PRM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white shadow-sm">
          <p className="text-slate-550 text-xs">No active vaults match your active searches.</p>
        </div>
      )}

      {/* Disclaimer Section */}
      <footer className="mt-16 text-center border-t border-slate-200 pt-6">
        <p className="text-[10px] text-slate-450 tracking-wide">
          Disclaimer: All third-party product brand names, assets, and logos featured on this platform are used purely for identification and context purposes. They remain the sole copyright of their respective owners.
        </p>
      </footer>

      {/* Logo Graphic Pop-up Animation Overlay - Triggered on Card Click */}
      <AnimatePresence>
        {animatingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[9999] backdrop-blur-lg"
          >
            {/* Ambient light ring around logo */}
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.1, y: 50, rotate: -45 }}
                animate={{ 
                  scale: [0.1, 1.2, 1], 
                  y: [50, -20, 0],
                  rotate: [-45, 10, 0]
                }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-44 h-44 rounded-3xl bg-black border-2 border-blue-500 shadow-[0_0_80px_rgba(59,130,246,0.35)] flex items-center justify-center p-6 bg-gradient-to-tr from-gray-950 to-gray-900"
              >
                {/* Interactive particle rings */}
                <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse filter blur-sm"></div>
                <div className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse filter blur-sm"></div>

                <img
                  src={getLogo(animatingService.logoKey)}
                  alt={animatingService.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Subtitle Text displaying name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 0, 1], y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <div className="flex items-center justify-center space-x-2 text-blue-400 font-mono text-xs tracking-widest uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>INITIALIZING VAULT</span>
                </div>
                <h2 className="font-display font-medium text-lg text-white">
                  {animatingService.name}
                </h2>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
