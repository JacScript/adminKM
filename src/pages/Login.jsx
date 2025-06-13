import { useState } from 'react'

// Auth Component
const Auth = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Your login logic here
  }

  return (
    <div 
      className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>
      
      {/* Perfectly Centered Form Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-4">
        <div className="bg-black bg-opacity-80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-800">
          {/* Header Section */}
          <div className="flex flex-col justify-center items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">KM</span>
            </div>
            <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center">LOG IN</h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Phone Number Field */}
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Enter your number:
              </label>
              <input
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                name="phoneNumber"
                type="tel"
                placeholder="Enter your number"
                className="w-full p-3 rounded-lg outline-none border border-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-200 text-gray-800 bg-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Enter your password:
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                required
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg outline-none border border-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-200 text-gray-800 bg-white"
              />
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-3 uppercase font-bold rounded-lg mt-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
            >
              Log In
            </button>
          </div>

          {/* Optional: Forgot Password Link */}
          <div className="text-center mt-6">
            <a href="#" className="text-gray-300 hover:text-yellow-400 text-sm transition-colors duration-200 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
