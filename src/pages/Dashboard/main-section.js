import BookingsContainer from "./dashboard-pages/bookings/bookings-container";
import ChannelsContainer from "./dashboard-pages/provider-channels/channels-container";
import SupportContainer from "./dashboard-pages/support/support-container";
import AnalyticsContainer from "./dashboard-pages/analytics/analytics-container";
import CustomersContainer from "./dashboard-pages/customers/customers-container";
import PartnersContainer from "./dashboard-pages/partners/partners-container";
import StaffContainer from "./dashboard-pages/staff/staff-container";
import DealsContainer from "./dashboard-pages/deals/deals-container";
import SalesContainer from "./dashboard-pages/sales/sales-container";
import MarketingContainer from "./dashboard-pages/marketing/marketing-container";
import SettingsContainer from "../../components/settings-container";

let MainSection = (props)=>{

    const {
        userDetails,
        setUserDetails,
        currentDesign,
        setCurrentDesign,
        buttonUrlOnInput,
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
    } = props;

    return (
        <main>
            <BookingsContainer
                userDetails={userDetails}
            />
            <ChannelsContainer
                userDetails={userDetails}
            />
            <SupportContainer 
                userDetails={userDetails}
            />
            <AnalyticsContainer 
                userDetails={userDetails}
            />
            <CustomersContainer 
                userDetails={userDetails}
            />
            <PartnersContainer 
                userDetails={userDetails}
            />
            <StaffContainer
                userDetails={userDetails}
                setUserDetails={setUserDetails}
            />
            <DealsContainer 
                userDetails={userDetails}
            />
            <SalesContainer 
                userDetails={userDetails}
            />
            <MarketingContainer 
                userDetails={userDetails}
                currentDesign={currentDesign}
                setCurrentDesign={setCurrentDesign}
                buttonUrlOnInput={buttonUrlOnInput}
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
            />
            <SettingsContainer 
                userDetails={userDetails}
            />
        </main>
    );
}

export default MainSection;