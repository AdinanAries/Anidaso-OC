
import PageRestricted from '../../../../components/page-restricted';
import NewDealPackageForm from './components/NewDealPackageForm';
import DealPackageInfo from './components/DealPackageInfo';
import DealsPackagesList from './components/DealsPackagesList';
import OtherInfo from './components/OtherInfo';
import { useState } from 'react';
import CONSTANTS from '../../../../constants/Constants';

let DealsContainer = (props)=>{

    const {
        userDetails
    } = props;

    const INCLUDE_ITEMS = {
        flight: "flight",
        stay: "stay",
        rental_car: "rental_car",
        event: "event",
        cruise: "cruise",
        bus_tour: "bus_tour",
        restaurant: "restaurant",
    }

    // helper function
    const return_new_package_item_props = (name) => {
        let _obj = {
            name: INCLUDE_ITEMS[name],
            image_url: "",
            price_currency: "",
            price: "",
        }
        if(name==="flight"){
            
        } else if (name==="rental_cars"){

        }
        return _obj;
    }

    const _pageConstant=CONSTANTS.app_page_constants.packges_and_deals;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));
    const [selectedDealPackage, setSelectedDealPackage] = useState({});
    const [ createNewPackageData, setCreateNewPackageData ] = useState({
        type: 1, // ["1 => Package", "2 => Deal"]
        title: "",
        total_price: "",
        items: []
    });
    const [ newPackageCurrentEditItem, setNewPackageCurrentEditItem ] = useState({
        name: "general",
    })

    const viewDealPackageInfo = (staff) => {
        setSelectedDealPackage(staff);
    }
    window.__viewDealPackageInfo=viewDealPackageInfo;

    const unSelectDealPackage = () => {
        setSelectedDealPackage({});
    }

    return(
         <section id="deals-container" style={{display: "none"}}>
            {
                (has_access_this_page) ? 
                <>
                    {
                        (selectedDealPackage?.id) ? 
                        <div id="selected-staff-container">
                            <DealPackageInfo 
                                unSelectDealPackage={unSelectDealPackage}
                                createNewPackageData={createNewPackageData}
                                setCreateNewPackageData={setCreateNewPackageData}
                                INCLUDE_ITEMS={INCLUDE_ITEMS}
                                return_new_package_item_props={return_new_package_item_props}
                            />
                        </div> :
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{width: "55%"}}>
                                <OtherInfo 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    return_new_package_item_props={return_new_package_item_props}
                                    newPackageCurrentEditItem={newPackageCurrentEditItem}
                                    setNewPackageCurrentEditItem={setNewPackageCurrentEditItem}
                                />
                                <NewDealPackageForm
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    return_new_package_item_props={return_new_package_item_props}
                                    newPackageCurrentEditItem={newPackageCurrentEditItem}
                                    setNewPackageCurrentEditItem={setNewPackageCurrentEditItem}
                                />
                            </div>
                            <div style={{width: "calc(45% - 7px)"}}>
                                <DealsPackagesList
                                    viewDealPackageInfo={viewDealPackageInfo}
                                />
                            </div>
                        </div>
                    }
                </> :
                <PageRestricted />
            }
        </section>
    )
}

export default DealsContainer;