
import PageRestricted from '../../../../components/page-restricted';
import CONSTANTS from '../../../../constants/Constants';
import AgentCustomers from "../staff/components/AgentCustomers";

let CustomersContainer = (props) => {

    const {
        userDetails,
    } = props;
    
    const _pageConstant=CONSTANTS.app_page_constants.customers;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    return(
         <section id="customers-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <AgentCustomers 
                    userDetails={userDetails}
                />
            }
        </section>
    )
}

export default CustomersContainer;