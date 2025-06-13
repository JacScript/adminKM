import react from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Auth from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return(
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route  path="/auth" component={Auth} />
    </Switch>
  </Router>  )
}

export default App;
