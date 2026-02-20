import { LuReceiptIndianRupee } from "react-icons/lu";

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
        </nav>
      </div>
      <div className="border-b border-gray-800 mt-6" />
    </div>
  );
}

export default Navbar;
