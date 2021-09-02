import './App.css';

import Header from './components/header';
import SideMenu from './components/side-menu';
import MainSection from './components/main-section';
import NotificationsContainer from "./components/notifications-container";

function App() {
  return (
    <div className="App">
      <NotificationsContainer />
      <Header />
      <SideMenu />
      <MainSection />
    </div>
  );
}

export default App;
