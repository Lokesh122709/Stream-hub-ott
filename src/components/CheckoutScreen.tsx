/**
 * Instant UPI QR/WhatsApp Checkout Gateway with 30-second checkout lock
 */
import React, { useEffect, useState } from "react";
import { OTTSubscription, getCustomQrCode, getCustomWhatsapp } from "../data/ottData";
import { GoogleUser } from "../lib/firebase";
import { ArrowLeft, Clock, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

interface CheckoutScreenProps {
  service: OTTSubscription;
  user: GoogleUser | null;
  onBack: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ service, user, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [elapsed, setElapsed] = useState(0); // seconds passed
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [successMode, setSuccessMode] = useState(false);

  // Constants
  const minRequiredTime = 30; // 30 seconds payment hold
  const qrCodeUrl = getCustomQrCode();
  const whatsappNumber = getCustomWhatsapp();

  useEffect(() => {
    // 5-minute Countdown Timer
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 30-second Holding Timer (seconds elapsed since opening checkout)
    const elapsedTimer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
      clearInterval(elapsedTimer);
    };
  }, []);

  // Format countdown into MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePaidConfirm = () => {
    if (elapsed < minRequiredTime) {
      const remaining = minRequiredTime - elapsed;
      setAlertMessage(`First do payment! Please scan the QR Code, complete the pay, and wait ${remaining} more seconds for validation.`);
      
      // Auto-fade alarm message after 5 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      return;
    }

    setSuccessMode(true);

    // Pre-craft URL-encoded WhatsApp message
    const formattedAmt = `₹${service.price}`;
    const userMailStr = user?.email || "Not logged in";
    const userUidStr = user?.uid || "Anonymous_GUEST";

    const customMessage = `Hello Stream Hub Premium Support!\n\nI have successfully paid ${formattedAmt} for "${service.name}" (1 Month Plan).\n\nPlease verify my payment and release my active premium credentials.\n\n-----------------\n📌 USER DETAILS:\n⭐ Account Email: ${userMailStr}\n⭐ Account UID: ${userUidStr}\n-----------------\n\nThank you! Looking forward to my active premium access.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

    // Safely redirect target link
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <div className="relative z-10 p-4 max-w-xl mx-auto py-10">
      {/* Background soft lighting */}
      <div className="netbond-glow-bg top-10 right-10 opacity-10"></div>

      {/* Return button */}
      <button
        id="back-to-details-btn"
        onClick={onBack}
        className="flex items-center space-x-2 text-xs text-slate-500 hover:text-slate-800 mb-6 border border-slate-205 bg-white p-2 px-3.5 rounded-xl hover:border-slate-300 transition cursor-pointer font-bold shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
        <span>Modify Order Choices</span>
      </button>

      {/* Checkout card container */}
      <div className="border border-slate-200 bg-white rounded-3xl p-6 shadow-2xl shadow-indigo-100/50 relative overflow-hidden text-center">
        
        {/* SECURE HEADER */}
        <div className="flex items-center justify-center space-x-1.5 p-2 px-3 bg-indigo-50 border border-indigo-100 rounded-full max-w-xs mx-auto mb-6">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span className="text-[10px] font-mono tracking-widest text-indigo-700 uppercase font-bold">
            SECURE CHECKOUT ENVIRONMENT
          </span>
        </div>

        <h2 className="font-display font-medium text-lg text-slate-800 mb-1.5 font-bold">
          Scan QR Code to Pay
        </h2>
        <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6 font-medium">
          Please open any UPI App (GPay, PhonePe, Paytm) and scan the QR Code below to transfer money instantly.
        </p>

        {/* The Square Box containing the payment QR image */}
        <div className="relative w-72 h-72 mx-auto mb-5 bg-white p-4.5 rounded-2xl shadow-md border border-slate-150 flex items-center justify-center overflow-hidden">
          
          <img
            src={qrCodeUrl}
            alt="Secure UPI Payment Gateway QR Code"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Quick Loading Scanner Bar Animation */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-indigo-500/60 opacity-60 animate-bounce"></div>
        </div>

        {/* Price of Selected subscription directly below the image */}
        <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 max-w-xs mx-auto mb-6">
          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-0.5 font-bold">
            SELECTED SUBSCRIBER AMOUNT
          </p>
          <p className="text-slate-700 font-mono text-sm tracking-wider font-bold">
            {service.name} • <span className="text-indigo-600">₹{service.price}</span>
          </p>
        </div>

        {/* 5-minute Countdown Timer */}
        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 font-mono mb-6 font-semibold">
          <Clock className="w-4 h-4 text-indigo-650 animate-pulse" />
          <span>QR Session Timeout:</span>
          {timeLeft > 0 ? (
            <span className="text-slate-800 font-bold tracking-wider text-sm">
              {formatTimer(timeLeft)}
            </span>
          ) : (
            <span className="text-red-500 font-bold">EXPIRED</span>
          )}
        </div>

        {/* Alarm Banner message */}
        {alertMessage && (
          <div className="flex items-start space-x-2.5 p-3 rounded-xl border border-red-250 bg-red-50 text-[10px] text-red-700 text-left mb-6 animate-pulse font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-650" />
            <span>{alertMessage}</span>
          </div>
        )}

        {/* I Paid Button Section */}
        {successMode ? (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center space-x-2 text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 animate-bounce text-emerald-600" />
            <span>Redirecting to WhatsApp verified support...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              id="confirm-payment-paid-btn"
              onClick={handlePaidConfirm}
              className={`w-full py-4 rounded-xl font-sans font-extrabold text-sm transition-all duration-300 cursor-pointer select-none border-2 flex items-center justify-center space-x-2 ${
                elapsed >= minRequiredTime
                  ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-400/30 animate-pulse scale-[1.01]"
                  : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {elapsed >= minRequiredTime ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                  <span>I Paid (Click to Verify)</span>
                </>
              ) : (
                <span>I Paid</span>
              )}
            </button>

            {/* Waiting status indicator */}
            {elapsed < minRequiredTime ? (
              <p className="text-[10px] font-mono tracking-wider text-slate-400 font-bold">
                Holding check lock: <span className="text-indigo-600 font-extrabold">{minRequiredTime - elapsed}s</span> leftover before I Paid unlocks
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-600 flex items-center justify-center space-x-1 animate-bounce">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Payment unlocked! Please click above to confirm your purchase.</span>
              </p>
            )}
          </div>
        )}

        {/* Helpful secure checklist */}
        <div className="mt-8 pt-6 border-t border-slate-150 text-left space-y-2 text-[10px] text-slate-500 font-medium leading-relaxed">
          <p className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
            <span>Scan QR Code with any payment UPI App (GPay/PhonePe/Paytm).</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
            <span>Confirm standard transaction of ₹{service.price} only.</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
            <span>Once done, wait for the countdown lock to clear, then hit "I Paid".</span>
          </p>
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
