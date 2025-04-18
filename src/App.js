import './App.css';

import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import FullPageLoader from './components/FullPageLoader';
import CreatePasswordPage from "./pages/CreatePasswordPage";
import { verifyUserToken } from './services/sessionServices';
import { fetchAccountInfo } from './services/accountServices';
import { useEffect, useState } from 'react';
import { dashboardInits } from './helpers/inits';

function App() {

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  useEffect(()=>{
    // Verify Login Here
    (async()=>{
      if(localStorage.getItem("user_token")){
        // Verify Token
        let res = await verifyUserToken();
        if(res.valid){
          setIsLoggedIn(true);
          dashboardInits();
          let usr = await fetchAccountInfo();
          setUserDetails(usr);
        }else{
          localStorage.removeItem("user_token");
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="App">
      {
        (!isLoading) &&
        (
          loggedIn ?
            (
              !userDetails?.make_new_password ?
              <Dashboard 
                userDetails={userDetails}
              /> : 
              <CreatePasswordPage 
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            ) :
            <LoginPage />
        )
      }
      {
        isLoading && <FullPageLoader />
      }
    </div>
  );
}

export default App;
