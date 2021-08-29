import BookingsContainer from "./bookings-container";
import ChannelsContainer from "./channels-container";
import SupportContainer from "./support-container";
import AnalyticsContainer from "./analytics-container";
import CustomersContainer from "./customers-container";
import ClientsContainer from "./clients-container";
import StaffContainer from "./staff-container";

let MainSection = ()=>{
    return (
        <main>
            <BookingsContainer />
            <ChannelsContainer />
            <SupportContainer />
            <AnalyticsContainer />
            <CustomersContainer />
            <ClientsContainer />
            <StaffContainer />
        </main>
    );
}

export default MainSection;