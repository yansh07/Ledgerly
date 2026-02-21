import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Calendar, LayoutDashboard, CreditCard, TrendingUp } from 'lucide-react';

// Authentication utility mock - since we cannot resolve local files in this environment
const getAccessToken = () => {
    try {
        return localStorage.getItem("access_token");
    } catch (e) {
        return null;
    }
};

// Safe API URL access
const getApiBaseUrl = () => {
    try {
        // Checking for Vite environment variable safely
        return (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";
    } catch (e) {
        return "http://localhost:8000";
    }
};

interface Spend {
    id: number;
    category: string;
    date: string;
    amount: number;
}

export default function App() {
    const [spends, setSpends] = useState<Spend[]>([]);
    const API_URL = `${getApiBaseUrl()}/expenses`;

    const fetchExpenses = async () => {
        const token = getAccessToken();
        if (!token) return;

        try {
            const response = await fetch(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSpends(data);
            }
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    };

    useEffect(() => {
        // Initial fetch
        (async () => {
            await fetchExpenses();
        })();

        // Sync Logic: Listen for 'expenseAdded' event from UserNav
        const handleRefresh = () => {
            console.log("New expense detected! Syncing dashboard...");
            fetchExpenses();
        };

        window.addEventListener("expenseAdded", handleRefresh);
        return () => window.removeEventListener("expenseAdded", handleRefresh);
    }, []);

    // --- ASLI CHART DATA LOGIC (Real Data) ---
    const chartData = useMemo(() => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const last7Days: { label: string; dateStr: string; value: number; displayHeight: number }[] = [];
        
        // Pichle 7 dino ke labels taiyaar karein
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            last7Days.push({
                label: days[d.getDay()],
                dateStr: d.toISOString().split('T')[0],
                value: 0,
                displayHeight: 0
            });
        }

        // Asli spending data ko chart mein bharein
        spends.forEach(spend => {
            const dayMatch = last7Days.find(d => d.dateStr === spend.date);
            if (dayMatch) {
                dayMatch.value += Number(spend.amount);
            }
        });

        // CSS height normalize karein (max height 100%)
        const maxSpend = Math.max(...last7Days.map(d => d.value), 1);
        return last7Days.map(d => ({
            ...d,
            displayHeight: (d.value / maxSpend) * 100
        }));
    }, [spends]);

    const totalSpent = spends.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const budgetLimit = 20000; // Customizable limit
    const remainingBalance = budgetLimit - totalSpent;

    const handleDeleteSpend = async (rowId: number) => {
        const token = getAccessToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/${rowId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setSpends(prev => prev.filter(row => row.id !== rowId));
            }
        } catch (error) {
            console.error("Failed to delete expense", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-500/30">
            <div className="max-w-6xl mx-auto pt-12 pb-20 px-6 md:px-10">
                
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic tracking-tighter">
                            LEDGERLY DASHBOARD
                        </h1>
                        <p className="text-gray-500 mt-1">Real-time data for your spending habits.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-400 font-mono">
                        <Calendar size={14} />
                        <span>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* Stat Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <StatBox icon={<CreditCard size={32}/>} label="Total Spent" value={totalSpent} color="text-blue-400" />
                    <StatBox icon={<LayoutDashboard size={32}/>} label="Budget Limit" value={budgetLimit} color="text-emerald-400" />
                    <StatBox icon={<TrendingUp size={32}/>} label="Remaining" value={remainingBalance} color="text-amber-400" />
                    <div className="border border-gray-800 p-6 rounded-3xl bg-[#0a0a0a] flex flex-col justify-center">
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Transactions</h3>
                        <div className="mt-2 text-2xl font-bold text-white tracking-tight">{spends.length}</div>
                    </div>
                </div>

                {/* Chart Section - ASLI DATA (Weekly Overview) */}
                <div className="mt-10 rounded-[2.5rem] border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black p-8 md:p-10 shadow-2xl">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-white text-xl font-bold tracking-tight">Spending Overview</h2>
                            <p className="text-gray-500 text-sm">Damage report of the last 7 days</p>
                        </div>
                    </div>
                    
                    <div className="flex items-end justify-between gap-3 sm:gap-6 h-48 md:h-72 pt-4">
                        {chartData.map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-4 h-full group">
                                <div className="relative w-full bg-gray-800/20 rounded-2xl flex items-end h-full overflow-hidden border border-gray-800/50">
                                    <div
                                        className="w-full rounded-t-lg transition-all duration-700 ease-out bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                        style={{ height: `${item.displayHeight}%` }}
                                    />
                                    {/* Tooltip on Hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-[2px]">
                                        <span className="text-xs font-black text-white">₹{item.value}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table Section (Transaction History) */}
                <div className="mt-10 rounded-[2.5rem] border border-gray-800 bg-[#0a0a0a] overflow-hidden shadow-xl">
                    <div className="p-8 border-b border-gray-800 bg-gray-900/10">
                        <h2 className="text-white text-lg font-bold uppercase tracking-tight italic">Recent History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-gray-600 border-b border-gray-900 bg-gray-900/20">
                                <tr>
                                    <th className="py-5 px-8 font-black uppercase text-[10px] tracking-widest">#</th>
                                    <th className="py-5 px-8 font-black uppercase text-[10px] tracking-widest">Category</th>
                                    <th className="py-5 px-8 font-black uppercase text-[10px] tracking-widest text-center">Date</th>
                                    <th className="py-5 px-8 font-black uppercase text-[10px] tracking-widest text-right">Amount</th>
                                    <th className="py-5 px-8 font-black uppercase text-[10px] tracking-widest text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-900/50">
                                {spends.length > 0 ? (
                                    spends.map((row, index) => (
                                        <tr key={row.id} className="group hover:bg-gray-900/30 transition-all duration-300">
                                            <td className="py-6 px-8 text-gray-700 font-mono">{index + 1}</td>
                                            <td className="py-6 px-8">
                                                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    {row.category}
                                                </span>
                                            </td>
                                            <td className="py-6 px-8 text-center text-gray-500 font-mono text-xs">{row.date}</td>
                                            <td className="py-6 px-8 text-right font-black text-white">₹{row.amount.toLocaleString('en-IN')}</td>
                                            <td className="py-6 px-8 text-center">
                                                <button 
                                                    onClick={() => handleDeleteSpend(row.id)} 
                                                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                                                    title="Mitao Is Kharche Ko"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-24 text-center text-gray-600 italic font-medium">
                                            Abhi tak koi kharcha nahi mila. Saving mode on!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
    return (
        <div className="group relative border border-gray-800 p-6 rounded-3xl bg-[#0a0a0a] hover:border-gray-700 transition-all duration-300 overflow-hidden shadow-lg">
            <div className={`absolute -top-2 -right-2 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 ${color}`}>{icon}</div>
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{label}</h3>
            <div className="mt-2 flex items-center gap-1">
                <span className="text-2xl font-bold text-white tracking-tight">₹{value.toLocaleString('en-IN')}</span>
            </div>
        </div>
    );
}