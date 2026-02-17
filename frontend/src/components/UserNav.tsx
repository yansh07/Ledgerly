import { LuReceiptIndianRupee } from "react-icons/lu";
import { FaUserAstronaut } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

function UserNav() {
  return (
    <div className="pt-6">
      <div className="px-6 md:px-12">
        <nav className="flex justify-between items-center text-gray-100">
          <div>
            <a href="/" className="flex gap-2 items-center group">
              <span className="text-3xl md:text-4xl text-amber-400 group-hover:text-amber-300 transition-colors">
                <LuReceiptIndianRupee />
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-tight">
                Ledgerly
              </span>
            </a>
          </div>
          <div  className="flex gap-12">
            <button className="border p-2 rounded-lg bg-indigo-700 cursor-pointer transition-all duration-300 border-transparent hover:border-indigo-300">
              <a href="/profile">
                <FaUserAstronaut className="text-2xl" />
              </a>
            </button>
            <div className="hidden md:block">
                <button className="flex items-center gap-3 border rounded-lg px-2 py-2 bg-red-700 border-transparent text-white cursor-pointer transition-all duration-300 hover:border-red-500">
              <span className="text-lg font-medium">Logout</span>
              <span><TbLogout className="text-xl"/></span>
            </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="border-b border-gray-800 mt-6" />
    </div>
  );
}

export default UserNav;
