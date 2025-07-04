
import PageRestricted from '../../../../components/page-restricted';
import NewDealPackageForm from './components/NewDealPackageForm';
import DealPackageInfo from './components/DealPackageInfo';
import DealsPackagesList from './components/DealsPackagesList';
import OtherInfo from './components/OtherInfo';
import { useState } from 'react';
import CONSTANTS from '../../../../constants/Constants';
import DealsPackagesPreviewPage from './components/DealsPackagesPreviewPage';
import { 
    createNewDealPackage,
} from '../../../../services/dealPackageServices';

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
            image_url: 'https://welldugo-oc-53db16692066.herokuapp.com/static/media/news-letter-bg1.f922fef0.jpg',
            html_details: "",
            text_editor_content: {},
        }
        if(name===INCLUDE_ITEMS?.flight){
            _obj = {
                ..._obj,
                departure_airport: "",
                destination_airport: "",
                airlines: "",
                departure_date: "",
                return_date: "",

            }
        } else if (name===INCLUDE_ITEMS?.stay){
            _obj = {
                ..._obj,
                hotel_address: "",
                brand_name: "",
                check_in_date: "",
                check_out_date: "",
                rating: 5,
                room_amenities: [],
                room_types: [],
            }
        } else if (name===INCLUDE_ITEMS?.bus_tour){
            _obj = {
                ..._obj,
                tour_company_name: "",
                start_location: "",
                start_date: "",
                start_time: "",
            }
        } else if (name===INCLUDE_ITEMS?.cruise){
            _obj = {
                ..._obj,
                cruise_line_and_ship: "",
                departure_ports: "",
                arrival_ports: "",
                start_date: "",
                start_time: "",
                cruise_duration: "",
                cabin_type: "",
            }
        } else if (name===INCLUDE_ITEMS?.event){
            _obj = {
                ..._obj,
                event_name_and_tagline: "",
                venue_location: "",
                event_start_date: "",
                event_start_time: "",
                event_website_and_registration_link: "",
                event_format: "",
            }
        } else if (name===INCLUDE_ITEMS?.rental_car){
            _obj = {
                ..._obj,
                rental_company: "",
                pick_up_location: "",
                drop_off_location: "",
                pick_up_date: "",
                drop_off_date: "",
                pick_up_time: "",
                drop_off_time: "",
                vehicle_type: "",
            }
        } else if (name===INCLUDE_ITEMS?.restaurant){
            _obj = {
                ..._obj,
                restaurant_name: "",
                location_address: "",
                rating: 5,
                website_link: "",
                price_range_value: "",
            }
        }
        return _obj;
    }

    const _pageConstant=CONSTANTS.app_page_constants.packges_and_deals;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));
    const [selectedDealPackage, setSelectedDealPackage] = useState({});
    const [ createNewPackageData, setCreateNewPackageData ] = useState({
        oc_user_id: userDetails?._id,
        type: 1, // ["1 => Package", "2 => Deal"]
        view_template: "highlighter", // Template for viewing this package on the published page for customers
        view_theme: "sunshine",
        title: "",
        total_price: 0,
        price_currency: "usd",
        travel_destination: "",
        start_date: "",
        end_date: "",
        include_adults: true,
        include_children: false,
        include_infants: false,
        max_num_of_adults: 1,
        max_num_of_children: 0,
        max_num_of_infants: 0,
        cover_picture: 'https://welldugo-oc-53db16692066.herokuapp.com/static/media/news-letter-bg1.f922fef0.jpg',
        html_description: "",
        text_editor_content: {},
        items: []
    });
    const [ newPackageCurrentEditItem, setNewPackageCurrentEditItem ] = useState({
        name: "general",
    });
    const [ showPackageDealForm, setShowPackageDealForm ] = useState(true);
    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    const resetFormValidation = () => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
    }

    const viewDealPackageInfo = (staff) => {
        setSelectedDealPackage(staff);
    }
    window.__viewDealPackageInfo=viewDealPackageInfo;

    const unSelectDealPackage = () => {
        setSelectedDealPackage({});
    }

    const createNewDealPackageOnClick = async () => {
        if(createNewPackageData?.items.length < 1){
            setFormValidation({
                type: "warning",
                isError: true,
                message: "Your must add atleast one or more items to the deal/package",
            });
            return;
        }
        let __res = await createNewDealPackage(createNewPackageData);
        if(__res?._id){
            alert("Deal/Package Created/Updated Successfully");
        }else{
            setFormValidation({
                type: "warning",
                isError: true,
                message: __res?.message,
            });
        }
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
                                <div style={{display: "flex", backgroundColor: "rgb(0, 37, 63)", justifyContent: "center", padding: 10, marginBottom: 5}}>
                                    <p onClick={()=>setShowPackageDealForm(true)} style={{cursor: "pointer", margin: 10, color: showPackageDealForm ? "yellow" : "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: showPackageDealForm ? "underline" : "none"}}>
                                        <i className="fa-solid fa-pencil" style={{color: "rgba(255,255,255,0.5)", marginRight: 10}}></i>
                                        Create New/Edit Package
                                    </p>
                                    <p onClick={()=>setShowPackageDealForm(false)} style={{cursor: "pointer", margin: 10, color: !showPackageDealForm ? "yellow" : "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: !showPackageDealForm ? "underline" : "none"}}>
                                        <i className="fa-solid fa-list" style={{color: "rgba(255,255,255,0.5)", marginRight: 10}}></i>
                                        View Packages/Deals List
                                    </p>
                                </div>
                                {
                                    showPackageDealForm ?
                                    <>
                                        <OtherInfo 
                                            createNewPackageData={createNewPackageData}
                                            setCreateNewPackageData={setCreateNewPackageData}
                                            INCLUDE_ITEMS={INCLUDE_ITEMS}
                                            return_new_package_item_props={return_new_package_item_props}
                                            newPackageCurrentEditItem={newPackageCurrentEditItem}
                                            setNewPackageCurrentEditItem={setNewPackageCurrentEditItem}
                                            resetFormValidation={resetFormValidation}
                                        />
                                        <NewDealPackageForm
                                            createNewPackageData={createNewPackageData}
                                            setCreateNewPackageData={setCreateNewPackageData}
                                            INCLUDE_ITEMS={INCLUDE_ITEMS}
                                            return_new_package_item_props={return_new_package_item_props}
                                            newPackageCurrentEditItem={newPackageCurrentEditItem}
                                            setNewPackageCurrentEditItem={setNewPackageCurrentEditItem}
                                            createNewDealPackageOnClick={createNewDealPackageOnClick}
                                            formValidation={formValidation}
                                            setFormValidation={setFormValidation}
                                            resetFormValidation={resetFormValidation}
                                        />
                                    </> :
                                    <DealsPackagesList
                                        userDetails={userDetails}
                                        setShowPackageDealForm={setShowPackageDealForm}
                                        setCreateNewPackageData={setCreateNewPackageData}
                                        viewDealPackageInfo={viewDealPackageInfo}
                                    />
                                }
                            </div>
                            <div style={{width: "calc(45% - 7px)"}}>
                                <DealsPackagesPreviewPage 
                                    userDetails={userDetails}
                                    createNewPackageData={createNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
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