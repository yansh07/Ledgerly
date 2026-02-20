import { useState, useEffect } from 'react';
import { IndianRupee, Trash2, Calendar, LayoutDashboard, CreditCard, TrendingUp } from 'lucide-react';
import { getAccessToken } from '../utils/auth';

const INITIAL_CHART_DATA = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 60 },
    { label: "Wed", value: 30 },
    { label: "Thu", value: 80 },
    { label: "Fri", value: 55 },
    { label: "Sat", value: 90 },
    { label: "Sun", value: 40 },
];

interface Spend {
    id: number;
    category: string;
    date: string;
    amount: number;
}

export default function App() {
    const [spends, setSpends] = useState<Spend[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = getAccessToken();
            if (!token) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expense`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSpends(data);
                }
            } catch (error) {
                console.error("Failed to fetch expenses", error);
            }
        };

        fetchExpenses();
    }, []);

    // Calculate dynamic totals based on state
    const totalSpent = spends.reduce((acc, curr) => acc + curr.amount, 0);
    const budgetLimit = 20000;
    const remainingBalance = budgetLimit - totalSpent;

    const handleDeleteSpend = async (rowId: number) => {
        const token = getAccessToken();
        if (!token) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expense/${rowId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
                
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            Expense Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">Track and manage your monthly spending</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-400">
                        <Calendar size={16} />
                        <span>February 2026</span>
                    </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Total Spent */}
                    <div className="group relative overflow-hidden border border-gray-800 cursor-pointer p-5 rounded-2xl bg-[#0a0a0a] transition-all hover:border-blue-500/50 hover:bg-[#111]">
                        <div className="absolute top-0 right-0 p-3 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                            <CreditCard size={40} />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">Total Spent</h3>
                        <div className="mt-2 flex items-center gap-1">
                            <IndianRupee className="text-blue-400" size={20} />
                            <span className="text-2xl font-bold text-white">{totalSpent.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">This Month</p>
                    </div>

                    {/* Budget Limit */}
                    <div className="group relative overflow-hidden border border-gray-800 cursor-pointer p-5 rounded-2xl bg-[#0a0a0a] transition-all hover:border-emerald-500/50 hover:bg-[#111]">
                         <div className="absolute top-0 right-0 p-3 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
                            <LayoutDashboard size={40} />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">Budget Limit</h3>
                        <div className="mt-2 flex items-center gap-1">
                            <IndianRupee className="text-emerald-400" size={20} />
                            <span className="text-2xl font-bold text-white">{budgetLimit.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Monthly Ceiling</p>
                    </div>

                    {/* Remaining */}
                    <div className="group relative overflow-hidden border border-gray-800 cursor-pointer p-5 rounded-2xl bg-[#0a0a0a] transition-all hover:border-amber-500/50 hover:bg-[#111]">
                        <div className="absolute top-0 right-0 p-3 text-amber-500/20 group-hover:text-amber-500/40 transition-colors">
                            <TrendingUp size={40} />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">Remaining</h3>
                        <div className="mt-2 flex items-center gap-1">
                            <IndianRupee className="text-amber-400" size={20} />
                            <span className="text-2xl font-bold text-white">{remainingBalance.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Left in Budget</p>
                    </div>

                    {/* Total Entries */}
                    <div className="group relative overflow-hidden border border-gray-800 cursor-pointer p-5 rounded-2xl bg-[#0a0a0a] transition-all hover:border-purple-500/50 hover:bg-[#111]">
                        <h3 className="text-gray-400 text-sm font-medium">Transactions</h3>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="text-2xl font-bold text-white">{spends.length}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Records found</p>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mt-10 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-white text-lg font-semibold tracking-tight">Spending Overview</h2>
                            <p className="text-gray-500 text-sm">Activity over the last 7 days</p>
                        </div>
                        <span className="text-gray-400 text-xs font-mono uppercase tracking-widest bg-gray-800 px-2 py-1 rounded">Feb 12 - Feb 18</span>
                    </div>
                    
                    <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 md:h-64 pt-4">
                        {INITIAL_CHART_DATA.map((item) => (
                            <div key={item.label} className="flex-1 flex flex-col items-center gap-3 h-full">
                                <div className="w-full bg-gray-800/50 rounded-lg flex items-end h-full overflow-hidden">
                                    <div
                                        className="w-full rounded-t-sm transition-all duration-700 ease-out bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300"
                                        style={{ height: `${item.value}%` }}
                                    />
                                </div>
                                <span className="text-[10px] md:text-xs font-medium text-gray-500 uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="mt-10 rounded-2xl border border-gray-800 bg-[#0a0a0a] overflow-hidden">
                    <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                        <h2 className="text-white text-lg font-semibold tracking-tight">Recent Transactions</h2>
                        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-900 bg-gray-900/20">
                                    <th className="py-4 px-6 font-medium">#</th>
                                    <th className="py-4 px-6 font-medium">Category</th>
                                    <th className="py-4 px-6 font-medium">Date</th>
                                    <th className="py-4 px-6 font-medium text-right">Amount</th>
                                    <th className="py-4 px-6 font-medium text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-900">
                                {spends.length > 0 ? (
                                    spends.map((row, index) => (
                                        <tr key={row.id} className="group hover:bg-gray-900/30 transition-colors">
                                            <td className="py-4 px-6 text-gray-600">{index + 1}</td>
                                            <td className="py-4 px-6 font-medium text-gray-200">{row.category}</td>
                                            <td className="py-4 px-6 text-gray-500 font-mono text-xs">{row.date}</td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="inline-flex items-center gap-0.5 font-semibold text-white">
                                                    <IndianRupee size={12} className="text-gray-400" />
                                                    {row.amount.toLocaleString('en-IN')}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    onClick={() => handleDeleteSpend(row.id)}
                                                    className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                    title="Delete transaction"
                                                >
                                                    <Trash2 size={16} className='cursor-pointer'/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-gray-500 italic">
                                            No recent transactions found
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