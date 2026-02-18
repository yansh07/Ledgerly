import { TbCurrencyRupee } from "react-icons/tb";


function MoneyOptions() {
  return (
    <div className="pt-12 items-center px-6 md:px-10 md:justify-items-center">
        {/* options grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 lg:gap-6 lg:grid-cols-4 gap-6 ">
            {/* total spent */}
            <div className="border border-transparent cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-b from-gray-700 via-gray-900 to-gray-950 hover:border-blue-300">
                <h1 className="text-white font-bold text-lg">Total Spent</h1>
                <span className="text-gray-200 "><span className="flex items-center"><TbCurrencyRupee className="text-xl"/><span className="text-lg">12,000</span></span></span>
                <p className="text-gray-400">This Month</p>
            </div>

            {/* budget limit */}
            <div className="border border-transparent cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-b from-gray-700 via-gray-900 to-gray-950 hover:border-blue-300">
                <h1 className="text-white font-bold text-lg">Budget Limit</h1>
                <span className="text-gray-200 "><span className="flex items-center"><TbCurrencyRupee className="text-xl"/><span className="text-lg">20,000</span></span></span>
                <p className="text-gray-400">Monthly Limit</p>
            </div>

            {/* remaining balance */}
            <div className="border border-transparent cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-b from-gray-700 via-gray-900 to-gray-950 hover:border-blue-300">
                <h1 className="text-white font-bold text-lg">Remaining Balance</h1>
                <span className="text-gray-200 "><span className="flex items-center"><TbCurrencyRupee className="text-xl"/><span className="text-lg">7,550</span></span></span>
                <p className="text-gray-400">Left in Budget</p>
            </div>

            {/* total transaction */}
            <div className="border border-transparent cursor-pointer px-3 py-2 rounded-lg bg-gradient-to-b from-gray-700 via-gray-900 to-gray-950 hover:border-blue-300">
                <h1 className="text-white font-bold text-lg">Total Transaction</h1>
                <span className="text-gray-200 "><span className="flex items-center"><TbCurrencyRupee className="text-xl"/><span className="text-lg"></span>42</span></span>
                <p className="text-gray-400">Entries</p>
            </div>
        </div>
    </div>
  )
}

export default MoneyOptions