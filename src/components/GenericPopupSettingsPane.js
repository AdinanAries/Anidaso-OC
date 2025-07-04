const GenericPopupSettingsPane = (props) => {

    const {
        name,
        closeFunc,
    } = props;

    const __SETTINGS_TYPES = {
        percentage: "price_markup",
        flat_rate: "flat_rate",
        data_provider: "data_provider",
        profit_type: "profit_type",
    };

    return <div style={{zIndex: 2, position: "absolute", background: "white", color: "black", width: 310, left: -150, top: 0, borderRadius: 8, boxShadow: "0 0 20px yellow"}}>
        <div style={{padding: 20}}>
            <p style={{fontSize: 13, marginBottom: 10, fontWeight: "bolder"}}>
                <i style={{marginRight: 10, color: "orange"}}
                    className="fa-solid fa-tools"></i>
                {
                    (__SETTINGS_TYPES?.data_provider===name) &&
                    "Change Data Supplier:"
                }
                {
                    (__SETTINGS_TYPES?.percentage===name) &&
                    "Change Price Markup (%):"
                }
            </p>
            <p onClick={closeFunc} style={{cursor: "pointer", position: "absolute", top: 15, right: 20}}>
                <i style={{color: "rgba(0,0,0,0.6"}} className="fa-solid fa-times"></i>
            </p>
            <div>
                {
                    (__SETTINGS_TYPES?.data_provider===name) &&
                    <select style={{width: "100%", padding: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "none", borderBottom: "2px solid orange"}}>
                        <option>
                            Duffel
                        </option>
                    </select>
                }
                {
                    (__SETTINGS_TYPES?.percentage===name) &&
                    <input style={{width: "100%", padding: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "none", borderBottom: "2px solid orange"}} 
                        type="text" placeholder="type here..."/>
                }
            </div>
            <div style={{textAlign: "center", fontSize: 13, padding: 10, borderRadius: 50, marginTop: 5, background: "orange"}}>
                Save
            </div>
        </div>
    </div>
}

export default GenericPopupSettingsPane;