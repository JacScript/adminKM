// import react from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from "react-router-dom";
// import "./App.css";
// import Auth from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import { useSelector } from "react-redux";

// function App() {

//   // console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
//     const userInfo = useSelector(state => state.user)
//   return(
//   <Router>
//     <Switch>
//       <Route exact path="/dashboard" component={Dashboard} />
//       <Route  path="/" component={Auth} />
//     </Switch>
//   </Router>  )
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Auth from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";

// Protected Route Component for Admin Access
const ProtectedRoute = ({ component: Component, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // Check if user is authenticated and has admin role
      if (userInfo && userInfo.isAuth && userInfo.role === 'admin') {
        return <Component {...props} />;
      } else if (userInfo && userInfo.isAuth && userInfo.role !== 'admin') {
        // User is authenticated but not admin - redirect to unauthorized page or login
        return <Redirect to="/unauthorized" />;
      } else {
        // User is not authenticated - redirect to login
        return <Redirect to="/" />;
      }
    }}
  />
);

// Unauthorized Access Component
const Unauthorized = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Access Denied</h2>
    <p>You don't have permission to access this page. Admin role required.</p>
    <button onClick={() => window.location.href = '/'}>
      Go to Login
    </button>
  </div>
);

function App() {
  const userInfo = useSelector(state => state.user);
  console.log({"userInfo": userInfo})

  return (
    <Router>
      <Switch>
        <ProtectedRoute 
          exact 
          path="/dashboard" 
          component={Dashboard} 
          userInfo={userInfo}
        />
        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
