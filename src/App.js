import './App.css';

import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';

function App() {

  // Verify Login Here
  var loggedIn=false;
  if(localStorage.getItem("usr_token")){
    // Verify Token
    let token=localStorage.getItem("usr_token");
    // if token is still valid then set LOGGED_IN to true
    loggedIn=true;
  }

  const LoginOnClick = (email, pwd) => {
    localStorage.setItem("usr_token", "test-token-1-22-333");
    window.location.reload();
  }

  const LogoutOnClick = () => {
    // 1. Clear Token On Server Side
    localStorage.removeItem("usr_token");
    window.location.reload();
  }

  return (
    <div className="App">
      {
        loggedIn ?
          <Dashboard
            LogoutOnClick={LogoutOnClick}
          /> :
          <LoginPage 
            LoginOnClick={LoginOnClick} 
          />
      }
    </div>
  );
}

export default App;
