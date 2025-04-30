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
          let usr = await fetchAccountInfo();
          if(usr?.pages_can_access_info){
            usr.pages_can_access_constants = usr?.pages_can_access_info?.map(each=>each?.constant);
            usr.resources_can_access_constants = usr?.resources_can_access_info?.map(each=>each?.constant);
            usr.resources_can_access_actions_constants = usr?.resources_can_access_actions_info?.map(each=>each?.constant);
          }
          setUserDetails(usr);
          setIsLoading(false);
          setTimeout(()=>{
            dashboardInits();
          }, 300);
        }else{
          localStorage.removeItem("user_token");
          setIsLoading(false);
        }
      }else{
        setIsLoading(false);
      }
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
                setUserDetails={setUserDetails}
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
