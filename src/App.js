import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import './assets/style.css'

// pages
import Pokemon from "./pages/Pokemon";


function App() {
  return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" component={Pokemon}/>
                </Switch>
            </Router>
        </div>
  );
}

export default App;
