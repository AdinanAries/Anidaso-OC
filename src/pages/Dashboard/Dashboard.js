import Header from '../../components/header';
import SideMenu from '../../components/side-menu';
import MainSection from './main-section';
import NotificationsContainer from "../../components/notifications-container";

const Dashboard = (props) =>  {

    const {
        LogoutOnClick,
        userDetails,
        setUserDetails,
        currentDesign,
        setCurrentDesign,
        handleDragStart,
        removeElement,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleDragEnd,
        containerFocusEvent,
        textFocusEvent,
        textHighlightEvent,
        lastSelection,
        setLastSelection,
        lastRange, 
        setLastRange,
        lastFocusedElement, 
        setLastFocusedElement,
        newSettingsSpan, 
        setNewSettingsSpan,
        lastFocusedIcon, 
        setlastFocusedIcon,
        currentElemToolsState,
        setCurrentElemToolsState,
        bindNewsLetterElemEvents,
        applyNewsLetterChanges,
        servicePlanTiersList,
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
            currentDesign={currentDesign}
            setCurrentDesign={setCurrentDesign}
            handleDragStart={handleDragStart}
            removeElement={removeElement}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDragEnd={handleDragEnd}
            containerFocusEvent={containerFocusEvent}
            textFocusEvent={textFocusEvent}
            textHighlightEvent={textHighlightEvent}
            lastSelection={lastSelection}
            setLastSelection={setLastSelection}
            lastRange={lastRange} 
            setLastRange={setLastRange}
            lastFocusedElement={lastFocusedElement} 
            setLastFocusedElement={setLastFocusedElement}
            newSettingsSpan={newSettingsSpan} 
            setNewSettingsSpan={setNewSettingsSpan}
            lastFocusedIcon={lastFocusedIcon} 
            setlastFocusedIcon={setlastFocusedIcon}
            currentElemToolsState={currentElemToolsState} 
            setCurrentElemToolsState={setCurrentElemToolsState}
            bindNewsLetterElemEvents={bindNewsLetterElemEvents}
            applyNewsLetterChanges={applyNewsLetterChanges}
            servicePlanTiersList={servicePlanTiersList}
        />
    </>;

}

export default Dashboard;