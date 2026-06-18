/**
 * Navigation Header and Google Authentication UI Control
 */
import React, { useEffect, useState } from "react";
import { authService, GoogleUser } from "../lib/firebase";
import { Play, LogOut, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onUserChange?: (user: GoogleUser | null) => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onUserChange, onLogoClick }) => {
  const [user, setUser] = useState<GoogleUser | null>(authService.getCurrentUser());
  const [isSignining, setIsSigning] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribe((u) => {
      setUser(u);
      if (onUserChange) {
        onUserChange(u);
      }
    });
    return unsubscribe;
  }, [onUserChange]);

  const handleSignIn = async () => {
    setIsSigning(true);
    try {
      await authService.loginWithGoogle();
    } catch (err) {
      console.warn(err);
    } finally {
      setIsSigning(false);
    }
  };

  const handleSignOut = async () => {
    await authService.logout();
    setShowDropdown(false);
  };

  return (
    <header className="relative z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md sticky top-0 px-4 py-3.5 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div onClick={onLogoClick} className="flex items-center space-x-3 cursor-pointer group select-none">
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-150 group-hover:scale-105 transition duration-300">
            <Play className="w-4.5 h-4.5 text-white fill-current ml-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-slate-800 flex items-center leading-none">
              STREAM HUB<span className="text-indigo-600 ml-0.5">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-0.5 font-bold">
              PREMIUM PRODUCTS
            </span>
          </div>
        </div>

        {/* Auth / Action button */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 tracking-wider">
            <ShieldCheck className="w-4 h-4 text-indigo-650" />
            <span className="font-mono">SECURED ACCESS</span>
          </div>

          {user ? (
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2.5 p-1 px-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100/90 hover:border-slate-300 transition cursor-pointer"
              >
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                  alt="Google User Profile"
                  className="w-7 h-7 rounded-full border border-indigo-500/20"
                  referrerPolicy="no-referrer"
                />
                <span className="hidden sm:block text-xs font-semibold max-w-[120px] truncate text-slate-700">
                  {user.displayName || "User Account"}
                </span>
              </button>

              {/* Account Dropdown */}
              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-indigo-100/40 z-50">
                    <div className="px-2.5 py-2 border-b border-slate-100 mb-2">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <button
                      id="logout-btn"
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-2 p-2 rounded-xl text-xs text-red-650 hover:bg-red-50 hover:text-red-700 font-semibold transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out Session</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              id="google-signin-btn"
              onClick={handleSignIn}
              disabled={isSignining}
              className="px-5 py-2.5 text-xs font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-sans flex items-center space-x-2 transition cursor-pointer shadow-lg shadow-indigo-150 disabled:opacity-50"
            >
              {/* Custom micro Google brand SVG icon */}
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="currentColor"/>
              </svg>
              <span>{isSignining ? "Authenticating..." : "Sign in with Google"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
