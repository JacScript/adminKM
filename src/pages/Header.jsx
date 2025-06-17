import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    const userInfo = useSelector(state => state.user);
    console.log(userInfo)
  return (
   <header className="relative z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">KM GROUP Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <span className="text-gray-300">{userInfo.username || "Admin"}</span>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header