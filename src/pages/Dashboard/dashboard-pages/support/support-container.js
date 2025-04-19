
import PageNA from '../../../../components/page-not-available';
import PageRestricted from '../../../../components/page-restricted';
import CONSTANTS from '../../../../constants/Constants';

let SupportContainer = (props) => {
                
    const {
        userDetails,
    } = props;
    
    const _pageConstant=CONSTANTS.app_page_constants.support;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    return(
         <section id="support-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <PageNA />
            }
        </section>
    )
}

export default SupportContainer;