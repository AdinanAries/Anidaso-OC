import RichTextEditorQuill from "../../../../../components/RichTextEditorQuill";
import {
    prepareQuilEditorContentForStorage
} from "../../../../../helpers/helper-functions";
import { useEffect } from "react";

const NewPackageBusTourForm = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
        resetFormValidation,
    } = props;

    let busTourData = createNewPackageData?.items?.filter(each=>each.name===INCLUDE_ITEMS?.bus_tour)[0];
    let busTourInfoQuilContent = busTourData?.text_editor_content;

    useEffect(()=>{
        const isSingleDate=true;
        window.__initCreateDealPackageBusTourInfoStartDateInput(isSingleDate);
        setTimeout(()=>{
            document.getElementById("createDealPackageBusTourInfoStartDateInput").value = busTourData?.start_date;
        }, 200);
    }, []);

    const companyNameOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.bus_tour ? { ...item, tour_company_name: e.target.value  } : item
            )
        })
    }

    const startLocationOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.bus_tour ? { ...item, start_location: e.target.value  } : item
            )
        })
    }

    const startDateOnInput = (_date) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.bus_tour ? { ...item, start_date: _date } : item
            )
        })
    }
    window.__createDealPackageSetBusTourStartDate = startDateOnInput;

    const startTimeOnInput = (e) => {
        resetFormValidation();
        let _items = createNewPackageData?.items;
        setCreateNewPackageData({
            ...createNewPackageData,
            items: _items?.map(item=>
                item.name === INCLUDE_ITEMS?.bus_tour ? { ...item, start_time: e.target.value  } : item
            )
        })
    }

    const setHTMDetails = (html_text, editor_content) => {
        let _html_text = prepareQuilEditorContentForStorage(html_text);
        resetFormValidation();
        setCreateNewPackageData((prevState) => ({
            ...prevState,
            items: prevState?.items?.map(item=>
                item.name === INCLUDE_ITEMS?.bus_tour ? { 
                    ...item, 
                    html_details: _html_text,
                    text_editor_content: editor_content
                } : item
            )
        }))
    }

    return <div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-building" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Tour Company Name</p>
            <div style={{border: "none"}}>
                <input onInput={companyNameOnInput}
                    value={busTourData?.tour_company_name}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-map-marker" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Location</p>
            <div style={{border: "none"}}>
                <input onInput={startLocationOnInput}
                    value={busTourData?.start_location}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-calendar" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Date</p>
            <div style={{border: "none"}}>
                <input id="createDealPackageBusTourInfoStartDateInput" 
                    readOnly={true}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
            </div>
        </div>
        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                <i className="fa fa-clock" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Start Time</p>
            <div style={{border: "none"}}>
                <input onInput={startTimeOnInput}
                    value={busTourData?.Start_time}
                    type="text" placeholder="type here..."  
                    style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
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
                <span style={{color: "orange"}}> Accessibility Information:</span> Include details on accessibility features at the venue. 
                <span style={{color: "orange"}}> Motorcoach:</span> The core of the package, providing comfortable, air-conditioned travel between destinations and often including a professional driver. 
                <span style={{color: "orange"}}> Specific routes and stops:</span> Tours often have pre-planned routes and designated stops at key attractions. 
                <span style={{color: "orange"}}> Sightseeing guided tours:</span> Tours often include guided visits to popular attractions and landmarks, with commentary and insights from a tour guide. 
                <span style={{color: "orange"}}> Sightseeing entrance fees:</span> Many packages cover the cost of admission to included attractions, simplifying logistics. 
                <span style={{color: "orange"}}> Sightseeing flexibility:</span> Some tours offer hop-on, hop-off options, allowing travelers to explore at their own pace. 
                <span style={{color: "orange"}}> Varying meal inclusions:</span> Some packages include meals, such as breakfasts or dinners, while others may offer only certain meals or none at all.
                <span style={{color: "orange"}}> Meal packages:</span> Tour operators may offer meal packages at an additional cost or provide restaurant recommendations
                <span style={{color: "orange"}}> Baggage handling:</span> Some packages include assistance with luggage. 
                <span style={{color: "orange"}}> Tips and service charges:</span> These may be included in the overall price. 
                <span style={{color: "orange"}}> Shopping opportunities:</span> Some tours may include stops at outlet malls or shopping centers. 
                <span style={{color: "orange"}}> Entertainment:</span> Some packages may include tickets to shows or other entertainment. 
                <span style={{color: "orange"}}> Specialty tours:</span> There are packages that focus on specific interests, such as Broadway shows or specific historical sites. 
                <span style={{color: "orange"}}> Convenience:</span> Everything is pre-arranged, making travel planning easier. 
                <span style={{color: "orange"}}> Cost savings:</span> Bundling can result in lower overall costs compared to booking separately. 
                <span style={{color: "orange"}}> Expertise:</span> Tour operators often have local knowledge and can provide valuable insights and recommendations. 
                <span style={{color: "orange"}}> Social aspect:</span> Bus tours can be a social experience, particularly for those traveling solo or in small groups. 
            </p>
            <div style={{backgroundColor: "white"}}>
                <RichTextEditorQuill
                    currentContent={busTourInfoQuilContent}
                    setContent={setHTMDetails}
                    elem_id="new_package_hotel_info_form_details_field" 
                />
            </div>
        </div>
    </div>

}

export default NewPackageBusTourForm;