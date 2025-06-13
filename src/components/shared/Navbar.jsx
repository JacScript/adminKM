import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import logo from "../../assets/logotop.png";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useDispatch, useSelector } from "react-redux"
import { IoLogOut } from "react-icons/io5";
// import { useMutation } from "@tanstack/react-query";
// import { removeUser } from "../../redux/slices/userSlice";
// import { enqueueSnackbar } from "notistack";
// import { logout } from "../../https/index";


const Header = () => {
  // const userInfo = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const history = useHistory();
  // // console.log(userInfo)

  // const handleClick = () => {
  //   history.push("/");
  // };

  // const logoutMutation = useMutation({
  //   mutationFn: () => logout(),
  //   onSuccess: (data) => {
  //     console.log(data);
  //     dispatch(removeUser());
  //           enqueueSnackbar(data.message, { variant: "success" });
  //   },
  //   onError : (error) => {
  //     console.log(error);
  //   }
  // })

  // const handleLogout = () => {
  //    logoutMutation.mutate();
  //    history.push("/auth");
  // }


  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a] w-full">
      {/* LOGO */}
      <div
        // onClick={handleClick}
        className="flex items-center cursor-pointer gap-2"
      >
        <img src={logo} alt="logo" className="h-8 w-8" />
        <h1 className="text-lg max-md:hidden font-semibold text-[#f5f5f5]">
          MILES
        </h1>
      </div>
      {/* SEARCH */}
      {/* <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] max-lg:w-[400px] max-sm:w-[250px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#f5f5f5] max-sm:hidden" />
        <input
          type="text"
          placeholder="search"
          className="bg-[#1f1f1f] outline-none max-sm:text-xs text-[#f5f5f5]"
        />
      </div> */}

      {/* LOGGED_USER DETAILS */}

      <div className="flex items-center  gap-4 max-md:gap-1">
        {/* {userInfo.role === "admin" && (
          <div
            className="bg-[#1f1f1f] rounded-[15px] p-3 max-md:p-[6px] cursor-pointer"
            onClick={() => history.push("/dashboard")} // ✅ Fix: Proper function call inside onClick
          >
            <MdDashboard className="text-[#f5f5f5] text-2xl max-md:text-lg" />
          </div>
        )} */}
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 max-md:p-[6px] cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl max-md:text-lg" />
        </div>
        <div className="flex items-center gap-3  max-md:gap-1 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-2xl max-md:text-lg" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] max-md:text-xs font-semibold">
              {/* {userInfo?.username || "Name"}{" "} */}
              Miles
            </h1>
            <p className="text-xs text-[#ababab] font-medium max-md:hidden">
              {/* {userInfo?.role || "role"} */}
            </p>
          </div>
          <IoLogOut
            // onClick={handleLogout}
            className="text-[#f5f5f5] text-2xl max-md:text-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;