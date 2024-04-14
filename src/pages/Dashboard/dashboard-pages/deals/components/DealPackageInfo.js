import HotelPic from "../../../../../HotelPic2.jpg";

const DealPackageInfo = (props) => {

    const {
        unSelectDealPackage
    } = props;

    return <div className="main-seaction-containers">
        <div onClick={unSelectDealPackage} className="standard-button"
            style={{background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.2)"}} >
            <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-arrow-left"></i>
            Back
        </div>
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
                <div style={{width: "50%"}}>
                    <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                        <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                            className="fa fa-folder-open"></i>
                        Deals/Packages: Information
                    </p>
                    <div
                        style={{marginBottom: 10,backgroundImage: `url('${HotelPic}')`, backgroundSize: "cover", 
                        backgroundRepeat: "no-repeat", backgroundPosition: "center", 
                        width: "calc(100% - 20px)", height: 200, border: "1px solid rgba(255,255,255,0.1)"}}>
                    </div>
                    <div style={{marginBottom: 5}}>
                        <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                            Title:
                        </span>
                        <input 
                            className="direct-edit-form-field" 
                            value="Mohammed Adinan"
                        />
                    </div>
                    <div style={{marginBottom: 5}}>
                        <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                            Type:
                        </span>
                        <select 
                            className="direct-edit-form-field"
                        >
                            <option>Package</option>
                            <option>Deal</option>
                        </select>
                    </div>
                    <div style={{marginBottom: 5}}>
                        <span style={{display: "inline-block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginRight: 10, width: 70}}>
                            Description:
                        </span>
                        <textarea 
                            className="direct-edit-form-field"
                            style={{minHeight: 140}}
                        >
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim
                        </textarea>
                    </div>
                    <div className="standard-action-button">
                        Save
                    </div>
                </div>
                <div style={{width: "calc(50% - 10px)"}}>
                    <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                        <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                            className="fa fa-user"></i>
                        Activity Log
                    </p>
                    <div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                        <div style={{padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                            <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                    className="fa fa-history"></i>
                                New Flight Booking Booking
                                <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                    03-04-2024 @ 14:12:34
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default DealPackageInfo;