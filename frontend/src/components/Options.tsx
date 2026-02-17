import { GrAdd } from "react-icons/gr";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import React, { useState } from "react";

function Options() {
  const [showAddSpendForm, setShowAddSpendForm] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    date: "",
    amount: "",
  });

  const humoriousSlogans = [
    "💸 Where did my money go?",
    "🤑 Spending like it's going out of style!",
    "💰 Budget? Never heard of her.",
    "🎲 YOLO - Track it anyway!",
    "📉 Watch your wallet cry in real-time!",
    "🛒 One more purchase won't hurt... right?",
  ];

  const randomSlogans = humoriousSlogans.sort(() => Math.random() - 0.5).slice(0, 2);

  const handleDownloadCSV = () => {
    // API call will be handled here
    console.log("Download CSV");
    setShowDownloadModal(false);
  };

  const handleDownloadPDF = () => {
    // API call will be handled here
    console.log("Download PDF");
    setShowDownloadModal(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitSpend = (e: React.FormEvent) => {
    e.preventDefault();
    // API call will be handled here
    console.log("Submit spend:", formData);
    setFormData({ category: "", date: "", amount: "" });
    setShowAddSpendForm(false);
  };

  return (
    <div className="text-gray-200 flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 pt-4 px-3 sm:px-0">
      {/* Download Button */}
      <div
        className="flex items-center gap-3 border px-3 sm:px-4 py-2 rounded-lg border-gray-800 bg-slate-900 hover:shadow-[0_2px_8px] cursor-pointer hover:shadow-amber-500 transition-all duration-400"
        onClick={() => setShowDownloadModal(true)}
      >
        <span className="text-sm sm:text-md font-normal">Download Your Report</span>
        <span>
          <LiaCloudDownloadAltSolid className="text-lg sm:text-xl" />
        </span>
      </div>

      {/* Add Spend Button */}
      <div
        className="flex items-center gap-3 border px-3 sm:px-4 py-2 rounded-lg border-gray-800 bg-slate-900 hover:shadow-[0_2px_8px] cursor-pointer hover:shadow-amber-500 transition-all duration-400"
        onClick={() => setShowAddSpendForm(true)}
      >
        <span className="text-sm sm:text-md font-normal">Add a spend</span>
        <span>
          <GrAdd className="text-lg sm:text-lg" />
        </span>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-gray-800 rounded-lg p-4 sm:p-6 w-full sm:w-96 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-500">Choose Format</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <MdClose className="text-xl sm:text-2xl" />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <button
                onClick={handleDownloadCSV}
                className="w-full px-4 py-2 sm:py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition duration-300"
              >
                📊 Download as CSV
              </button>
              <button
                onClick={handleDownloadPDF}
                className="w-full px-4 py-2 sm:py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition duration-300"
              >
                📄 Download as PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Spend Form Modal */}
      {showAddSpendForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-gray-800 rounded-lg p-4 sm:p-6 w-full sm:w-96 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-500">Track Your Spend</h3>
              <button
                onClick={() => setShowAddSpendForm(false)}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <MdClose className="text-xl sm:text-2xl" />
              </button>
            </div>

            {/* Humorous Slogans */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-800 rounded-md border border-gray-700">
              {randomSlogans.map((slogan, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-gray-400 italic mb-2 last:mb-0">
                  {slogan}
                </p>
              ))}
            </div>

            <form onSubmit={handleSubmitSpend} className="flex flex-col gap-4">
              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 sm:py-2 bg-slate-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
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

              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 sm:py-2 bg-slate-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleFormChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 sm:py-2 bg-slate-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 sm:py-3 mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Add Spend 💸
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Options;