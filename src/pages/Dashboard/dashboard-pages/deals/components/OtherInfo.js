const OtherInfo = (props) => {
    return <div className="main-seaction-containers">
        <div>
            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12}}>
                <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                Select Includable Items
            </p>
            <div style={{marginTop: 10}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "orange", fontSize: 26}} 
                                    className="fa fa-plane"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Flights</p>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,255,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "red"}} className="fa fa-trash"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "lightgreen", fontSize: 26}} 
                                    className="fa fa-hotel"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Stays</p>
                        </div>
                    </div>  
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "orange", fontSize: 26}} 
                                    className="fa fa-car"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Rental Cars</p>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "orange", fontSize: 26}} 
                                    className="fa fa-ticket"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Events</p>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "orange", fontSize: 26}} 
                                    className="fa fa-ship"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Cruises</p>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,255,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "red"}} className="fa fa-trash"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "lightgreen", fontSize: 26}} 
                                    className="fa fa-bus"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Bus Tour</p>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",
                            position: "relative", width: 80, height: 80, borderRadius: 8, cursor: "pointer", marginRight: 5,
                            background: "rgba(0,0,0,0.1)", overflow: "hidden"}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: 20, height: 20, top: 0, right: 0, background: "rgba(0,0,0,0.2)"}}>
                            <i style={{color: "lightgreen"}} className="fa fa-plus"></i>
                        </div>
                        <div>
                            <p style={{textAlign: "center"}}>
                                <i style={{color: "orange", fontSize: 26}} 
                                    className="fa fa-spoon"></i></p>
                            <p style={{color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                                Restaurants</p>
                        </div>
                    </div>
                </div>
                <div className="standard-action-button">
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                    Create New Item
                </div>
            </div>
        </div>
    </div>
}

export default OtherInfo;