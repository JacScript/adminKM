import React, { useState, useEffect } from "react";
import { MdCategory, MdTableBar, MdDashboard, MdAssessment, MdShoppingCart , MdHolidayVillage} from "react-icons/md";
import { IoIosGitPullRequest } from "react-icons/io";
import { TbPackages } from "react-icons/tb";
import { FaComment } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { FiPlus, FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi";
import Testimonial from "../components/dashboard/Testimonial";
import Request from "../components/dashboard/Request";
import HolidayHome from "../components/dashboard/HolidayHome";
import Package from "../components/dashboard/Package";



const tabs = [
  { name: "Testimonial", icon: <FaComment />, description: "Overview & Analytics" },
  { name: "Request", icon: <IoIosGitPullRequest />, description: "Recent Orders" },
  { name: "Holiday Home", icon: <MdHolidayVillage />, description: "Detailed Reports" },
  { name: "Package", icon: <TbPackages />, description: "Detailed Reports" }
];



const Dashboard = () => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Testimonial");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);



  const renderTabContent = () => {
    switch (activeTab) {
      case "Testimonial":
        return <Testimonial />;
      case "Request":
        return <Request />;
      case "Holiday Home":
        return <HolidayHome />;
      default:
        return <Package />;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900  overflow-hidden flex flex-col">
    {/* <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden flex flex-col"> */}
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">KM GROUP Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <span className="text-gray-300">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col px-6 py-4 overflow-hidden">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/*  */}
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-gray-800/50 backdrop-blur-sm p-1 rounded-xl border border-gray-700/50">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`
                  relative px-4 py-2 cursor-pointer rounded-lg font-semibold text-sm
                  flex items-center gap-2 transition-all duration-300
                  ${activeTab === tab.name 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }
                `}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`flex-1 overflow-auto transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {renderTabContent()}
        </div>
      </div>

      {/* Modal Placeholder */}
      {isTableModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scale-in">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Table</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Table Number"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Capacity"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsTableModalOpen(false)}
                className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsTableModalOpen(false)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg rounded-lg text-white font-semibold transition-all"
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;