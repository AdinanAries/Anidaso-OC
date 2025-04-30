import Header from '../../components/header';
import SideMenu from '../../components/side-menu';
import MainSection from './main-section';
import NotificationsContainer from "../../components/notifications-container";

const Dashboard = (props) =>  {

    const {
        LogoutOnClick,
        userDetails,
        setUserDetails,
    } = props

    return <>
        <NotificationsContainer />
        <Header
            LogoutOnClick={LogoutOnClick}
            userDetails={userDetails}
        />
        <SideMenu
            userDetails={userDetails}
        />
        <MainSection
            userDetails={userDetails}
            setUserDetails={setUserDetails}
        />
    </>;

}

export default Dashboard;