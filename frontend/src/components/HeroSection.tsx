import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

declare global {
  interface Window {
    google?: any;
  }
}

function HeroSection() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (resp: { credential?: string }) => {
        if (!resp?.credential) return;

        try {
          const r = await fetch(`${API_BASE_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: resp.credential }),
          });

          if (!r.ok) {
            console.error("Google auth failed:", await r.text());
            return;
          }

          const data = await r.json();
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/dashboard";
        } catch (err) {
          console.error("Auth error:", err);
        }
      },
    });
  }, [API_BASE_URL, GOOGLE_CLIENT_ID]);

  const handleGoogleLogin = () => {
    if (!window.google) return;
    window.google.accounts.id.prompt();
  };

  return (
    <div>
      <div className="md:pt-32 pt-20 text-center">
        <h1 className="text-gray-100 px-4 text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
          Your Money.
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            Our Problem.
          </span>
        </h1>
        
        <p className="text-gray-400 mt-8 font-light text-lg md:text-2xl px-4 max-w-2xl mx-auto leading-relaxed">
          Because your bank app would rather you not know where it all went. We're the sober accountant in the room—minus the judgment, plus the analytics.
        </p>

        <div className="mt-12">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="px-8 md:px-12 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg md:text-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="no-underline flex items-center justify-center gap-3">
              Continue with <FaGoogle className="text-2xl" />
            </span>
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto px-4">
          <div className="text-center">
            <p className="text-amber-400 font-black text-2xl md:text-3xl">JWT</p>
            <p className="text-gray-400 text-xs md:text-sm mt-1">Military Grade</p>
          </div>
          <div className="text-center border-l border-r border-gray-800">
            <p className="text-amber-400 font-black text-2xl md:text-3xl">Analytics</p>
            <p className="text-gray-400 text-xs md:text-sm mt-1">Beautiful Charts</p>
          </div>
          <div className="text-center">
            <p className="text-amber-400 font-black text-2xl md:text-3xl">Export</p>
            <p className="text-gray-400 text-xs md:text-sm mt-1">CSV • PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
