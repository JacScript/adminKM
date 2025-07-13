import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../http';
import { enqueueSnackbar } from 'notistack';
import { clearCredentials } from '../redux/slices/userSlice';

const Header = () => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const dispatch = useDispatch();
    const history = useHistory();

 
    const logoutMutation = useMutation({
      mutationFn: () => logout(),
      onSuccess: (data) => {
        // console.log(data);
        dispatch(clearCredentials());
         enqueueSnackbar(data.message, { variant: "success"});
      },
      onError: (error) => {
        const { response } = error;
        enqueueSnackbar(response.data.message, { variant: "error"});
        // console.log(error);
      }
    })

    const handleLogout = () => {
     logoutMutation.mutate();
     history.push("/auth");
  }


    // console.log(userInfo)
  return (
   <header className="relative z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 flex-shrink-0">
        <div className="px-6 py-4 w-[80%] mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">KM GROUP Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <span className="text-gray-300">{userInfo.username || "Admin"}</span>
              <div className='cursor-pointer text-white hover:text-red-500 transition-colors duration-200'>
                 <IoIosLogOut
                  onClick={handleLogout}
                  // className='text-gray-300 hover:text-red-500 transition-colors duration-200'
                 className='' size={30} title='logout'/>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header