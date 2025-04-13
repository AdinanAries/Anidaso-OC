import BookingsContainer from "./dashboard-pages/bookings/bookings-container";
import ChannelsContainer from "./dashboard-pages/provider-channels/channels-container";
import SupportContainer from "./dashboard-pages/support/support-container";
import AnalyticsContainer from "./dashboard-pages/analytics/analytics-container";
import CustomersContainer from "./dashboard-pages/customers/customers-container";
import ClientsContainer from "./dashboard-pages/partners/partners-container";
import StaffContainer from "./dashboard-pages/staff/staff-container";
import DealsContainer from "./dashboard-pages/deals/deals-container";
import SalesContainer from "./dashboard-pages/sales/sales-container";
import MarketingContainer from "./dashboard-pages/marketing/marketing-container";
import SettingsContainer from "../../components/settings-container";

let MainSection = (props)=>{

    const {
        userDetails
    } = props;

    return (
        <main>
            <BookingsContainer
                userDetails={userDetails}
            />
            <ChannelsContainer />
            <SupportContainer />
            <AnalyticsContainer />
            <CustomersContainer />
            <ClientsContainer />
            <StaffContainer
                userDetails={userDetails}
            />
            <DealsContainer />
            <SalesContainer />
            <MarketingContainer />
            <SettingsContainer />
        </main>
    );
}

export default MainSection;