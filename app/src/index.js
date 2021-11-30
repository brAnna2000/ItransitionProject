import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  // MainPage,
  // UserPage
} from './pages';

ReactDOM.render(
  // <Router>
  //   <Routes>
      <App>
        {/* <Route path='/mainpage' element={<MainPage/>} /> */}
        {/* <Route path='/userpage' element={<UserPage/>} /> */}
      </App>,
      document.getElementById('root')
    /* </Routes>
  </Router>, */
  
);
