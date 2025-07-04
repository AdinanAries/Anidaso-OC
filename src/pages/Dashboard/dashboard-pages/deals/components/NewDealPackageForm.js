import { useState } from "react";
import FormErrorCard from "../../../../../components/FormErrorCard";
import NewPackageGeneralInfoForm from "./NewPackageGeneralInfoForm";
import NewPackageFlightForm from "./NewPackageFlightForm";
import NewPackageHotelForm from "./NewPackageHotelForm";
import NewPackageRentalCarForm from "./NewPackageRentalCarForm";
import NewPackageEventForm from "./NewPackageEventForm";
import NewPackageCruiseForm from "./NewPackageCruiseForm";
import NewPackageBusTourForm from "./NewPackageBusTourForm";
import NewPackageRestaurantForm from "./NewPackageRestaurantForm";

function NewDealPackageForm(props){

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
        return_new_package_item_props,
        newPackageCurrentEditItem,
        setNewPackageCurrentEditItem,
        createNewDealPackageOnClick,
        formValidation, 
        setFormValidation,
        resetFormValidation,
    } = props;

    const INCLUDED_ITEMS_NAME_ARRAY = createNewPackageData.items?.map(each=>each.name);
    
    return (
        <div>
            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.3)", padding: 10, borderRadius: 8}}>
                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                    <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                    Type</p>
                <div style={{border: "none"}}>
                    <select 
                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                        <option value={1}
                            style={{color: "black"}}>Packaged Deal</option>
                        <option value={2}
                            style={{color: "black"}}>Single Item Deal</option>
                    </select>
                </div>
            </div>
            {
                createNewPackageData.type===1 && //Pakckage
                <div>
                    <div className="login_page_form_container" 
                        style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden"}}>
                        <p className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
                            <i className="fa fa-folder" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Motive (Guide):</p>
                        <p style={{fontSize: 12, color: "white", padding: 10, paddingTop: 0,}}>
                            What is your motive for this package? Please consider the following points; <span style={{color: "orange"}}>Research:</span> Understand your ideal travelers' demographics, interests, travel styles, and budget. 
                            <span style={{color: "orange"}}> Identify Needs:</span> Determine what motivates them to travel and what they seek in a travel experience. 
                            <span style={{color: "orange"}}> Gather Data:</span> Analyze existing travel trends and competitor offerings to identify gaps and opportunities
                        </p>
                        <div style={{display: "flex"}}>
                            <div onClick={()=>{
                                    setNewPackageCurrentEditItem({
                                        name: "general",
                                    })
                                }} 
                                style={{cursor: "pointer", 
                                textDecoration: newPackageCurrentEditItem?.name==="general" ? "underline" : "none", 
                                color: newPackageCurrentEditItem?.name==="general" ? "orange" : "rgba(255,255,255,0.5)", padding: 10}}>
                                <h3 style={{fontSize: 13}}>
                                    General</h3>
                            </div>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY?.map((each, i) =>{
                                    let __name = each?.replaceAll("_", " ");
                                    __name = (__name[0]?.toUpperCase() + __name?.substring(1))
                                    return <div onClick={()=>{
                                            setNewPackageCurrentEditItem({
                                                name: each,
                                            })
                                        }}
                                        style={{cursor: "pointer",             
                                        textDecoration: newPackageCurrentEditItem?.name===each ? "underline" : "none", 
                                        color: newPackageCurrentEditItem?.name===each ? "orange" : "rgba(255,255,255,0.5)", padding: 10}}>
                                        <h3 style={{fontSize: 13}}>
                                            {__name}</h3>
                                    </div>
                                })
                            }
                        </div>
                        {
                            newPackageCurrentEditItem?.name==="general" &&
                            <div style={{marginTop: 10}}>
                                <NewPackageGeneralInfoForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.flight &&
                            <div style={{marginTop: 10}}>
                                <NewPackageFlightForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.stay &&
                            <div style={{marginTop: 10}}>
                                <NewPackageHotelForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.rental_car &&
                            <div style={{marginTop: 10}}>
                                <NewPackageRentalCarForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.event &&
                            <div style={{marginTop: 10}}>
                                <NewPackageEventForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.cruise &&
                            <div style={{marginTop: 10}}>
                                <NewPackageCruiseForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.bus_tour &&
                            <div style={{marginTop: 10}}>
                                <NewPackageBusTourForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.restaurant &&
                            <div style={{marginTop: 10}}>
                                <NewPackageRestaurantForm 
                                    createNewPackageData={createNewPackageData}
                                    setCreateNewPackageData={setCreateNewPackageData}
                                    INCLUDE_ITEMS={INCLUDE_ITEMS}
                                    resetFormValidation={resetFormValidation}
                                />
                            </div>
                        }
                        {
                            formValidation.isError && <FormErrorCard 
                                message={formValidation.message} 
                                type={formValidation.type}
                            />
                        }
                        <div style={{marginTop: 10}}>
                            <div onClick={createNewDealPackageOnClick} style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                                <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                                Create
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                createNewPackageData.type===2 && //Deal
                <div>
                    {/* Deal Form Here */}
                </div>
            }
        </div>
    );
}

export default NewDealPackageForm;