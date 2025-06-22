const OtherInfo = (props) => {

    const {
        createNewPackageData,
        setCreateNewPackageData,
        INCLUDE_ITEMS,
        return_new_package_item_props,
        newPackageCurrentEditItem,
    } = props;

    const INCLUDED_ITEMS_NAME_ARRAY = createNewPackageData.items?.map(each=>each.name);

    const toggle_include_item = (name) => {
        let __all_items = createNewPackageData.items;
        if(INCLUDED_ITEMS_NAME_ARRAY.includes(name)){
            let __confirm = window.confirm("All unsaved data for this item will lost. Are you sure you want to remove this item?")
            if(!__confirm){
                return;
            }
            __all_items = __all_items.filter(item=>item?.name !== name);
        }else{
            __all_items.push(return_new_package_item_props(name))
        }
        setCreateNewPackageData({
            ...createNewPackageData,
            items: __all_items,
        })
    }

    return <div className="main-seaction-containers">
        <div style={{padding: 10}}>
            <p className="title-font-color-default" style={{fontSize: 14}}>
                <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Select Package Items
            </p>
            <div style={{marginTop: 20}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.flight)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.flight) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.flight) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.flight) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-plane"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Flights</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.flight) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.flight}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.stay)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.stay) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.stay) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.stay) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-hotel"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Stays</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.stay) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.stay}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>  
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.rental_car)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.rental_car) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.rental_car) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.rental_car) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-car"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Rental Cars</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.rental_car) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.rental_car}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.event)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.event) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.event) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.event) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-ticket"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Events</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.event) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.event}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.cruise)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.cruise) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.cruise) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.cruise) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-ship"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Cruises</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.cruise) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.cruise}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.bus_tour)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.bus_tour) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.bus_tour) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.bus_tour) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-bus"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Bus Tour</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.bus_tour) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.bus_tour}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>
                    <div onClick={()=>toggle_include_item(INCLUDE_ITEMS?.restaurant)} style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.restaurant) ? "rgb(0, 29, 55)" : "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            {
                                INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.restaurant) ?
                                <i style={{color: "red"}} className="fa fa-trash"></i> :
                                <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                            }
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.restaurant) ? "lightgreen" : "orange", fontSize: 26}} 
                                    className="fa fa-spoon"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Restaurants</p>
                        </div>
                        {
                            INCLUDED_ITEMS_NAME_ARRAY.includes(INCLUDE_ITEMS?.restaurant) &&
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, bottom: 0, right: 0}}>
                                <input checked={newPackageCurrentEditItem?.name===INCLUDE_ITEMS?.restaurant}
                                    type="radio" name="packages-active-includable-item"/>
                            </div>
                        }
                    </div>
                </div>
                <div style={{display: "none"}} className="standard-action-button">
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                    Create New Item
                </div>
            </div>
        </div>
    </div>
}

export default OtherInfo;