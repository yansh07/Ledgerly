import { 
  IndianRupee,  
  LogOut, 
  Plus, 
  CloudDownload, 
  X 
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../utils/auth";

// Auth utility mockups
const getAccessToken = () => localStorage.getItem("access_token");
const setUserAuthenticated = (val: string) => localStorage.setItem("auth", val);

// Safe environment variable access for non-Vite or older targets
const getApiBaseUrl = () => {
  try {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  } catch (e) {
    return "http://localhost:8000";
  }
};

function UserNav() {
  const navigate = useNavigate();
  const [showAddSpendForm, setShowAddSpendForm] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
    useEffect(() => {
      const userData = getUserData();
      if (userData) {
        setProfile({
          name: userData.name,
          email: userData.email,
          avatarUrl: userData.profile_pic,
          memberSince: "Jun 2024",
          lastLogin: "Feb 18, 2026",
          plan: "Starter",
          status: "Active",
          location: "Delhi, IN",
        });
      }
    }, []);
  
  const [formData, setFormData] = useState({
    category: "",
    date: new Date().toISOString().split('T')[0],
    amount: "",
  });

  const API_BASE_URL = getApiBaseUrl();

  const humoriousSlogans = [
    "💸 Where did my money go?",
    "🤑 Spending like it's going out of style!",
    "💰 Budget? Never heard of her.",
    "🎲 YOLO - Track it anyway!",
    "📉 Watch your wallet cry in real-time!",
    "🛒 One more purchase won't hurt... right?",
  ];

  const [randomSlogans] = useState(() =>
    [...humoriousSlogans].sort(() => Math.random() - 0.5).slice(0, 2),
  );

  // Dashboard refresh trigger karne ke liye helper
  const triggerRefresh = () => {
    window.dispatchEvent(new Event("expenseAdded"));
  };

  const handleDownload = async (format: string) => {
    const token = getAccessToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/report/download?format=${format}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ledgerly_report_${new Date().getTime()}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Failed to download ${format}`, error);
    }
    setShowDownloadModal(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSpend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        }),
      });

      if (response.ok) {
        setFormData({ category: "", date: new Date().toISOString().split('T')[0], amount: "" });
        setShowAddSpendForm(false);
        triggerRefresh();
      }
    } catch (error) {
      console.error("Failed to add spend", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUserAuthenticated("false");
    navigate("/");
  };

  if(!profile) {
    return <div>Loading ...</div>
  }

  return (
    <div className="pt-6 overflow-x-clip">
      <div className="px-5 sm:px-4 md:px-10">
        <nav className="flex justify-between items-center text-gray-100">
          <div>
            <a href="/" className="flex gap-1.5 sm:gap-2 items-center group">
              <span className="text-4xl sm:text-3xl md:text-4xl text-amber-400 group-hover:text-amber-300 transition-colors">
                <IndianRupee />
              </span>
              <span className="text-2xl sm:text-2xl md:text-3xl font-black tracking-tight">
                Ledgerly
              </span>
            </a>
          </div>
          <div className="mx-8 md:mx-0">
            <div className="flex gap-2 sm:gap-3 md:gap-5">
              {/* <NavButton icon={profile.avatarUrl} label="Profile avatar" onClick={() => navigate("/profile")} /> */}
              <img src={profile.avatarUrl} alt="Profile Avatar" className="object-cover rounded-full" onClick={() => navigate("/profile")}/>
              <NavButton icon={<Plus />} label="Add spend" onClick={() => setShowAddSpendForm(true)} />
              <NavButton icon={<CloudDownload />} label="Download Report" onClick={() => setShowDownloadModal(true)} />
              <div className="hidden md:block">
                <NavButton icon={<LogOut />} label="Logout" onClick={handleLogout} />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="border-b border-gray-800 mt-6" />

      {/* Download Modal */}
      {showDownloadModal && (
        <Modal title="Choose Format" onClose={() => setShowDownloadModal(false)}>
            <div className="flex flex-col gap-4">
              <button onClick={() => handleDownload('csv')} className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition duration-300">
                📊 Download as CSV
              </button>
              <button onClick={() => handleDownload('pdf')} className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition duration-300">
                📄 Download as PDF
              </button>
            </div>
        </Modal>
      )}

      {/* Add Spend Form Modal */}
      {showAddSpendForm && (
        <Modal title="Track Your Spend" onClose={() => setShowAddSpendForm(false)}>
            <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-gray-700">
              {randomSlogans.map((slogan, idx) => (
                <p key={idx} className="text-xs text-gray-400 italic mb-2 last:mb-0">{slogan}</p>
              ))}
            </div>

            <form onSubmit={handleSubmitSpend} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleFormChange} required
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-xl text-gray-200 focus:border-amber-500 outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="food">🍕 Food & Dining</option>
                  <option value="transport">🚗 Transport</option>
                  <option value="entertainment">🎬 Entertainment</option>
                  <option value="shopping">🛍️ Shopping</option>
                  <option value="utilities">💡 Utilities</option>
                  <option value="health">🏥 Health</option>
                  <option value="other">📌 Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange} required
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-xl text-gray-200 focus:border-amber-500 outline-none invert" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Amount</label>
                  <input type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleFormChange} required step="0.01" min="0"
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-xl text-gray-200 focus:border-amber-500 outline-none" />
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full py-4 mt-2 bg-amber-600 hover:bg-amber-700 text-white font-black uppercase tracking-widest rounded-xl transition duration-300">
                {loading ? "Adding..." : "Add Spend 💸"}
              </button>
            </form>
        </Modal>
      )}
    </div>
  );
}

function NavButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button onClick={onClick} className="relative text-2xl border p-3 rounded-xl bg-slate-800/50 cursor-pointer border-gray-800 transition-all duration-300 hover:border-amber-400 group">
            {icon}
            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 mb-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-slate-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 pointer-events-none z-50">
                {label}
            </span>
        </button>
    );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-slate-900 border border-gray-800 rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-amber-500">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white bg-slate-800 p-2 rounded-full transition"><X size={20}/></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default UserNav;