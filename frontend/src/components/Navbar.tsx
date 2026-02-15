import { LuReceiptIndianRupee } from "react-icons/lu";

function Navbar() {
  return (
    <div className="pt-6">
      {/* navbar  */}
      <div className="px-3 md:px-6">
        <nav className="flex justify-between text-gray-100">
          <div>
            <a href="/" className="flex gap-3">
              <span>
                <LuReceiptIndianRupee className="text-3xl md:text-4xl" />
              </span>
              <span className="text-2xl md:text-3xl font-bold">Ledgerly</span>
            </a>
          </div>
          <div className="flex items-center space-x-12 text-lg md:text-xl font-semibold">
            <span className="hidden md:inline-block border border-transparent px-2 py-1 rounded-md hover:bg-gray-700">
              <a href="/Login">Login</a>
            </span>

            <span className="border px-2 py-1 rounded-md bg-gradient-to-r from-slate-700 to-gray-900 border-transparent hover:ring-1 hover:transition-all hover:duration-300">
              <a href="/signup">Get Started</a>
            </span>
          </div>
        </nav>
      </div>
      <div className="border-[0.5px] border-gray-500 mt-4" />
    </div>
  );
}

export default Navbar;
