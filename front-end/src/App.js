import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </Router>
  );
};

export default App;
