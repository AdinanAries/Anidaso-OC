import './App.css';

import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import FullPageLoader from './components/FullPageLoader';
import { verifyUserToken } from './services/sessionServices';
import { useEffect, useState } from 'react';
import { dashboardInits } from './helpers/inits';

function App() {

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    // Verify Login Here
  (async()=>{
    if(localStorage.getItem("user_token")){
      // Verify Token
      let res = await verifyUserToken();
      if(res.valid){
        setIsLoggedIn(true);
        dashboardInits();
      }else{
        localStorage.removeItem("user_token");
      }
    }
    setIsLoading(false);
  })();
  });

  return (
    <div className="App">
      { 
        (!isLoading) &&
        (
          loggedIn ?
            <Dashboard /> :
            <LoginPage 
              setFullPageLoading={setIsLoading}
            />
        )
      }
      {
        isLoading && <FullPageLoader />
      }
    </div>
  );
}

export default App;
