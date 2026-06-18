/**
 * Service Details View component showcasing OTT benefits and features
 */
import React from "react";
import { OTTSubscription, getLogo } from "../data/ottData";
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

interface ServiceDetailsProps {
  service: OTTSubscription;
  onBack: () => void;
  onBuy: () => void;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack, onBuy }) => {
  const logoBase64 = getLogo(service.logoKey);

  return (
    <div className="relative z-10 p-4 max-w-2xl mx-auto py-10">
      {/* Background radial soft light */}
      <div className="netbond-glow-bg top-1/4 left-1/3 opacity-15"></div>

      {/* Navigation Return Button */}
      <button
        id="back-to-catalog-btn"
        onClick={onBack}
        className="flex items-center space-x-2 text-xs text-slate-500 hover:text-slate-800 mb-8 border border-slate-205 bg-white p-2 px-3.5 rounded-xl hover:border-slate-300 transition cursor-pointer font-bold shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
        <span>Return to Marketplace</span>
      </button>

      {/* Main Container Card */}
      <div className="border border-slate-200 bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-indigo-100/50 relative overflow-hidden">
        
        {/* Subtle decorative glow ring */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl transform translate-x-8 -translate-y-8"></div>

        {/* Logo and Name at Top Center */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-28 h-28 p-1 rounded-3xl border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center p-4.5 mb-5 hover:border-slate-200 transition-all duration-300">
            <div className="absolute inset-x-0 h-[100px] w-[1px] bg-indigo-500/5 left-1/2 -translate-x-1/2 filter blur-sm"></div>
            {logoBase64 ? (
              <img
                src={logoBase64}
                alt={service.name}
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-indigo-50 text-indigo-650 text-2xl flex items-center justify-center font-display font-medium">
                {service.name.substring(0, 2)}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-indigo-600 font-mono tracking-widest uppercase mb-1 font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>PREMIUM METRICS</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800 tracking-tight">
            {service.name}
          </h2>
          <p className="text-slate-500 text-xs tracking-wide max-w-md mt-2 font-medium">
            {service.tagline}
          </p>
        </div>

        {/* Description Text */}
        <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl mb-8">
          <h4 className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-1.5 font-bold">
            PRODUCT SYNOPSIS
          </h4>
          <p className="text-xs text-slate-650 leading-relaxed font-sans font-semibold">
            {service.description}
          </p>
        </div>

        {/* Benefits Checklist */}
        <div className="mb-8">
          <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4 font-bold">
            INCLUSIONS & BENEFITS
          </h3>
          <div className="space-y-3.5">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3.5 text-xs">
                <div className="mt-0.5 relative flex items-center justify-center">
                  <div className="absolute w-4 h-4 rounded-full bg-indigo-50 filter blur-xs"></div>
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 relative z-10" />
                </div>
                <span className="text-slate-600 font-semibold">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-1 font-bold">
              SUBSCRIPTION RATE
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-display font-extrabold text-2xl tracking-tight text-slate-800">
                ₹{service.price}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                / {service.duration}
              </span>
            </div>
          </div>

          <button
            id="buy-now-submit-btn"
            onClick={onBuy}
            className="w-full sm:w-auto px-7 py-3.5 text-xs font-sans font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-150 transition cursor-pointer"
          >
            Buy Now
          </button>
        </div>

        {/* Footnote Warning */}
        <div className="mt-8 flex items-start space-x-2.5 p-3 rounded-xl border border-amber-500/10 bg-amber-50/50 text-[10px] text-amber-700 font-semibold leading-relaxed">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <span>Notice: Accounts are set up with direct premium login authorization. Immediate processing guarantee. Non-refundable after delivery.</span>
        </div>
      </div>

      {/* Dislaimer Section */}
      <footer className="mt-10 text-center">
        <p className="text-[10px] text-slate-400 tracking-wide font-medium">
          Disclaimer: All third-party product brand names, assets, and logos featured on this platform are used purely for identification and context purposes.
        </p>
      </footer>
    </div>
  );
};
