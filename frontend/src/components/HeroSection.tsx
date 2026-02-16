import { FaGoogle } from "react-icons/fa";

function HeroSection() {
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
          <button className="px-8 md:px-12 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg md:text-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95">
            <a href="/auth/google" className="no-underline flex items-center justify-center gap-3">
              Continue with <span><FaGoogle className="text-2xl"/></span>
            </a>
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
