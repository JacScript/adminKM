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
      if (userInfo && userInfo.isAuth && userInfo.userInfo.role === 'admin') {
        return <Component {...props} />;
      } else if (userInfo && userInfo.isAuth && userInfo.userInfo.role !== 'admin') {
        // User is authenticated but not admin - redirect to unauthorized page
        return <Redirect to="/unauthorized" />;
      } else {
        // User is not authenticated - redirect to login
        return <Redirect to="/" />;
      }
    }}
  />
);

// Public Route Component (redirects authenticated users away from login)
const PublicRoute = ({ component: Component, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // If user is authenticated, redirect to dashboard
      if (userInfo && userInfo.isAuth) {
        return <Redirect to="/dashboard" />;
      } else {
        // User is not authenticated, show the login page
        return <Component {...props} />;
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
  const userInfo = useSelector(state => state.auth);
  console.log(userInfo);

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
        <PublicRoute 
          path="/" 
          component={Auth} 
          userInfo={userInfo}
        />
      </Switch>
    </Router>
  );
}

export default App;