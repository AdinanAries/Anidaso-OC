import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";
import {
    prepareQuilEditorContentForStorage
} from "../../../../../helpers/helper-functions";
import { useEffect } from "react";

const NewPackageRentalCarForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
        resetFormValidation,
    } = props;

    let rentalCarData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.rental_car)[0];
    let rentalCarInfoQuilContent = rentalCarData?.text_editor_content;

    useEffect(()=>{
        window.__initCreateDealPackageRentalCarInfoPickupDropoffDatesInput();
        setTimeout(()=>{
            document.getElementById("createDealPackageRentalCarInfoPickupDropoffDatesInput").value = (rentalCarData?.pick_up_date + (rentalCarData?.drop_off_date ? (" - " + rentalCarData?.drop_off_date) : ""));
        }, 200);
    }, []);

    const rentalCompanyOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { ...item, rental_company: e.target.value  } : item
            )
        })
    }

    const pickupLocationOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { ...item, pick_up_location: e.target.value  } : item
            )
        })
    }

    const dropoffLocationOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { ...item, drop_off_location: e.target.value  } : item
            )
        })
    }

    const pickupDropOffDatesOnInput = (_dates_p) => {
        resetFormValidation();
        let _dates = _dates_p?.split(" - ");
        if(_dates.length < 1){
            _dates.push("");
        }
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { 
                    ...item, 
                    pick_up_date: _dates[0],
                    drop_off_date: _dates[1]
                } : item
            )
        })
    }
    window.__createDealPackageSetRentalCarPickupDropoffDates = pickupDropOffDatesOnInput;

    const pickupDropOffTimesOnInput = (e) => {
        resetFormValidation();
        let _times = e.target.value?.split(" - ");
        if(_times.length < 1){
            _times.push("");
        }
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { 
                    ...item, 
                    pick_up_time: _times[0],
                    drop_off_time: _times[1],
                } : item
            )
        })
    }

    const vehicleTypeOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { ...item, vehicle_type: e.target.value  } : item
            )
        })
    }

    const setHTMDetails = (html_text, editor_content) => {
        let _html_text = prepareQuilEditorContentForStorage(html_text);
        resetFormValidation();
        setCreateNewPackageData((prevState) => ({
            ...prevState,
            items: prevState?.items?.map(item=>
                item.name === INCLUDE_ITEMS?.rental_car ? { 
                    ...item, 
                    html_details: _html_text,
                    text_editor_content: editor_content,
                } : item
            )
        }))
    }

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-building" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Rental Company</p>
            <div style={{border: "none"}}>
                <input onInput={rentalCompanyOnInput}
                    value={rentalCarData?.rental_company}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Pick-up Location</p>
            <div style={{border: "none"}}>
                <input onInput={pickupLocationOnInput}
                    value={rentalCarData?.pick_up_location}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Drop-off Location</p>
            <div style={{border: "none"}}>
                <input onInput={dropoffLocationOnInput}
                    value={rentalCarData?.drop_off_location}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Pick-up - Drop-off Dates</p>
            <div style={{border: "none"}}>
                <input id="createDealPackageRentalCarInfoPickupDropoffDatesInput"
                    readOnly={true}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-clock" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Pick-up - Drop-off Times</p>
            <div style={{border: "none"}}>
                <input onInput={pickupDropOffTimesOnInput}
                    value={(rentalCarData?.pick_up_time + (rentalCarData?.drop_off_time ? (" - " + rentalCarData?.drop_off_time) : ""))}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-car" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Vehicle Type</p>
            <div style={{border: "none"}}>
                <select onInput={vehicleTypeOnInput}
                    value={rentalCarData?.vehicle_type}
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                    <option value="Economy/Compact"
                        style={{color: "black"}}>Economy/Compact</option>
                    <option value="Sedans"
                        style={{color: "black"}}>Sedans</option>
                    <option value="SUVs"
                        style={{color: "black"}}>SUVs</option>
                    <option value="Vans"
                        style={{color: "black"}}>Vans</option>
                    <option value="Trucks"
                        style={{color: "black"}}>Trucks</option>
                    <option value="Luxury"
                        style={{color: "black"}}>Luxury</option>
                    <option value="Convertibles"
                        style={{color: "black"}}>Convertibles</option>
                    <option value="Specialty"
                        style={{color: "black"}}>Specialty</option>
                </select>
            </div>
        </div>
        <div style={{marginBottom: 5}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", 
                width: "100%", height: 200, background: "rgba(0,0,0,0.2)", borderRadius: 8,
                cursor: "pointer"}}>
                <div>
                    <p style={{textAlign: "center"}}>
                        <i style={{color: "orange", fontSize: 27}} className="fa fa-plus"></i>
                    </p>
                    <p style={{marginTop: 5, fontSize: 13, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                        Add Cover Picture
                    </p>
                </div>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-paragraph" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Details (Guide)
                <span className="tool-tip-parent" style={{marginLeft: 15, cursor: "pointer", color: "lightgreen"}}>
                    <i className="fa-solid fa-robot"></i>
                    <span className="tool-tip" style={{color: "black", textAlign: "center"}}>
                        Generate with AI
                    </span>
                </span>
            </p>
            <p style={{fontSize: 12, color: "white", padding: 10}}>
                The information you include in this section may include;
                <span style={{color: "orange"}}> Insurance Coverage:</span> Detail what insurance is included (e.g., Loss Damage Waiver, Collision Damage Waiver, Liability Insurance) and any potential deductibles. Clarify if any additional insurance options are available and their costs. 
                <span style={{color: "orange"}}> Mileage:</span> Specify if unlimited mileage is included or if there are mileage restrictions and associated costs for exceeding them. 
                <span style={{color: "orange"}}> Additional Drivers:</span> Indicate if there are any fees associated with adding additional drivers or if it's included in the package. 
                <span style={{color: "orange"}}> Fuel Policy:</span> Explain the fuel policy (e.g., full-to-full, pre-paid fuel) and any associated costs. 
                <span style={{color: "orange"}}> Toll Usage:</span> Explain how tolls will be handled (e.g., transponder, cash payment) and if there are any associated fees. 
                <span style={{color: "orange"}}> Age Restrictions:</span> Clearly state any age restrictions for drivers and any associated fees for young drivers. 
                <span style={{color: "orange"}}> Payment Methods:</span> Specify the accepted payment methods for the rental car.
                <span style={{color: "orange"}}> Cancellation Policy:</span> Outline the cancellation policy for the rental car, including any fees for canceling or modifying the reservation. 
                <span style={{color: "orange"}}> Vehicle Inspection:</span> Explain the process for inspecting the car upon pick-up and return, including documenting any existing damage. 
                <span style={{color: "orange"}}> Customer Support:</span> Provide contact information for customer support in case of issues or questions. 
                <span style={{color: "orange"}}> Optional Add-ons:</span> Clearly list any optional add-ons available, such as child seats, GPS, or roadside assistance, and their respective costs. 
                <span style={{color: "orange"}}> Taxes and Fees:</span> Clearly state all taxes and fees associated with the rental, including any location fees or administrative fees. 
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill 
                    currentContent={rentalCarInfoQuilContent}
                    setContent={setHTMDetails}
                    elem_id="new_package_hotel_info_form_details_field" 
                />
            </div>
        </div>
    </div>

}

export default NewPackageRentalCarForm;