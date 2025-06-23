
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
        view_template: 1, // Template for viewing this package on the published page for customers
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
                                <div style={{height: "100vh", background: "white"}}>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: 20, borderBottom: "1px solid rgba(0,0,0,0.1)", background: "rgb(0, 37, 63)"}}>
                                        <h3 style={{maxWidth: 160, color: "yellow"}}>
                                            How Customers Will View This Package!</h3>
                                        <div>
                                            <select style={{padding: 20, border: "none", color: "white", background: "rgba(0,0,0,0.2)", borderRadius: 8}}>
                                                <option style={{color: "black"}}>Classic Page</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
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