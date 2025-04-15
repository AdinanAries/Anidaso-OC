import Header from '../../components/header';
import SideMenu from '../../components/side-menu';
import MainSection from './main-section';
import NotificationsContainer from "../../components/notifications-container";

const Dashboard = (props) =>  {

    const {
        LogoutOnClick,
        userDetails,
    } = props

    return <>
        <NotificationsContainer />
        <Header
            LogoutOnClick={LogoutOnClick}
        />
        <SideMenu
            userDetails={userDetails}
        />
        <MainSection
            userDetails={userDetails}
        />
    </>;

}

export default Dashboard;