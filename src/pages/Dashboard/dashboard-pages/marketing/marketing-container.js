
import PageNA from '../../../../components/page-not-available';
import PageRestricted from '../../../../components/page-restricted';
import CONSTANTS from '../../../../constants/Constants';

let MarketingContainer = (props)=>{

    const {
        userDetails,
    } = props;
    
    const _pageConstant=CONSTANTS.app_page_constants.marketing;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    return(
         <section id="marketing-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <PageNA />
            }
        </section>
    )
}

export default MarketingContainer;