import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { login } from '../http';
import { enqueueSnackbar} from 'notistack'
import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { setCredentials } from '../redux/slices/userSlice';

// Auth Component
const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    // Your login logic here
    loginMutation.mutate(formData) 
  }

  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (res) => {
      const { data}  = res;
      //  console.log(data);
       const { _id, username, email,role} = data.data;
       dispatch(setCredentials({ _id, username, email,role} ));
       enqueueSnackbar(data.message, { variant: "success"});
       history.push("/dashboard")
    },
    onError : (error) => {
      const { response} = error;
      enqueueSnackbar(response.data.message, { variant: "error"});
      // console.log(error)
    }
  })

  return (
    <div 
      className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: `url('https://res.cloudinary.com/dwkivuqts/image/upload/v1750552564/WhatsApp_Image_2025-06-21_at_18.24.54_1_ogdubn.jpg')`,
        backgroundAttachment: 'fixed'
      }}
    >
{/* Option 6: Overlay with higher opacity for better contrast */}
<div className="absolute inset-0 bg-black/40"></div>

      {/* Perfectly Centered Form Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-4">
        <div className="bg-transparent bg-opacity-80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-800">
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
                Enter your Email:
              </label>
              <input
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                name="email"
                type="email"
                placeholder="Enter your Email"
                disabled={loginMutation.isPending}
                className="w-full p-3 rounded-lg outline-none border border-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-200 text-gray-800 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={loginMutation.isPending}
                className="w-full p-3 rounded-lg outline-none border border-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-200 text-gray-800 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-3 uppercase font-bold rounded-lg mt-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center"
            >
              {loginMutation.isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                'Log In'
              )}
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