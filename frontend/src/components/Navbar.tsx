import { LuReceiptIndianRupee } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { setUserAuthenticated } from "../utils/auth";

function Navbar() {
  return (
    <div className="pt-6">
      <div className="px-6 md:px-12">
        <nav className="flex justify-between items-center text-gray-100">
          <div>
            <a href="/" className="flex gap-2 items-center group">
              <span className="text-3xl md:text-4xl text-amber-400 group-hover:text-amber-300 transition-colors">
                <LuReceiptIndianRupee />
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-tight">Ledgerly</span>
            </a>
          </div>
          <button className="hidden md:block px-2 md:px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm md:text-base hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
            <a
              href="/auth/google"
              onClick={() => setUserAuthenticated(true)}
              className="no-underline flex items-center gap-2 md:text-xl text-lg"
            >
              Continue with <span><FaGoogle className="text-lg"/></span>
            </a>
          </button>
        </nav>
      </div>
      <div className="border-b border-gray-800 mt-6" />
    </div>
  );
}

export default Navbar;
