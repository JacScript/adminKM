// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
//   useHistory
// } from "react-router-dom";
// import "./App.css";
// import Auth from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import { useSelector, useDispatch } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// // import { logout } from "./api"; // <-- your logout API call
// // import { removeUser } from "./redux/slices/authSlice"; // <-- make sure this is your actual action
// import { enqueueSnackbar } from "notistack";
// import { logout } from "./http";
// import { clearCredentials } from "./redux/slices/userSlice";

// // Protected Route Component for Admin Access
// const ProtectedRoute = ({ component: Component, userInfo, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       if (userInfo && userInfo.isAuth && userInfo.userInfo.role === "admin") {
//         return <Component {...props} />;
//       } else if (userInfo && userInfo.isAuth) {
//         return <Redirect to="/admin/unauthorized" />;
//       } else {
//         return <Redirect to="/admin/" />;
//       }
//     }}
//   />
// );

// // Public Route Component
// const PublicRoute = ({ component: Component, userInfo, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       userInfo && userInfo.isAuth ? (
//         <Redirect to="/admin/dashboard" />
//       ) : (
//         <Component {...props} />
//       )
//     }
//   />
// );

// // Unauthorized Access Component
// const Unauthorized = ({ onLogout }) => (
//   <div style={{ textAlign: "center", marginTop: "50px" }}>
//     <h2>Access Denied</h2>
//     <p>You don't have permission to access this page. Admin role required.</p>
//     <button
//       onClick={onLogout}
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#f44336",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//       }}
//     >
//       Go to Login
//     </button>
//   </div>
// );

// function App() {
//   const userInfo = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const logoutMutation = useMutation({
//     mutationFn: logout,
//     onSuccess: (data) => {
//       dispatch(clearCredentials());
//       enqueueSnackbar(data?.message || "Logged out successfully", {
//         variant: "success",
//       });
//       history.push("/admin/");
//     },
//     onError: (error) => {
//       console.error("Logout error:", error);
//       enqueueSnackbar("Logout failed", { variant: "error" });
//     },
//   });

//   const handleLogout = () => {
//     logoutMutation.mutate();
//   };

//   return (
//     <Router>
//       <Switch>
//         <ProtectedRoute
//           exact
//           path="/admin/dashboard"
//           component={Dashboard}
//           userInfo={userInfo}
//         />
//         <Route
//           path="/admin/unauthorized"
//           render={() => <Unauthorized onLogout={handleLogout} />}
//         />
//         <PublicRoute path="/" component={Auth} userInfo={userInfo} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Auth from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout } from "./http";
import { clearCredentials } from "./redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";

// Protected Route Component for Admin Access
const ProtectedRoute = ({ component: Component, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (userInfo && userInfo.isAuth && userInfo.userInfo.role === "admin") {
        return <Component {...props} />;
      } else if (userInfo && userInfo.isAuth) {
        return <Redirect to="/admin/unauthorized" />;
      } else {
        return <Redirect to="/admin/" />;
      }
    }}
  />
);

// Public Route Component
const PublicRoute = ({ component: Component, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userInfo && userInfo.isAuth ? (
        <Redirect to="/admin/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

// Unauthorized Access Component
const Unauthorized = ({ onLogout }) => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h2>Access Denied</h2>
    <p>You don't have permission to access this page. Admin role required.</p>
    <button
      onClick={onLogout}
      style={{
        padding: "10px 20px",
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Go to Login
    </button>
  </div>
);

// ✅ The part moved *inside* Router so useHistory works
const AppRoutes = () => {
  const userInfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory(); // ✅ safe here

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      dispatch(clearCredentials());
      enqueueSnackbar(data?.message || "Logged out successfully", {
        variant: "success",
      });
      history.push("/admin/");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      enqueueSnackbar("Logout failed", { variant: "error" });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/admin/dashboard"
        component={Dashboard}
        userInfo={userInfo}
      />
      <Route
        path="/admin/unauthorized"
        render={() => <Unauthorized onLogout={handleLogout} />}
      />
      <PublicRoute path="/" component={Auth} userInfo={userInfo} />
    </Switch>
  );
};

// ✅ Wrap the AppRoutes in <Router>
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
