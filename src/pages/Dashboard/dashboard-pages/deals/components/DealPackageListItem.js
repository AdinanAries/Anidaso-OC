import HotelPic from "../../../../../HotelPic2.jpg";
import { add_commas_to_number } from "../../../../../helpers/helper-functions";

const DealPackageListItem = (props) => {

    const {
        viewDealPackageInfo,
        setShowPackageDealForm,
        setCreateNewPackageData,
        allInfo,
    } = props;

    const {
        title,
        travel_destination,
        total_price,
        cover_picture,
        html_description,
        items,
        max_num_of_adults,
        max_num_of_children,
        max_num_of_infants,
        type,
        view_template,
        view_theme,
        price_currency,
        start_date,
        end_date,
        include_adults,
        include_children,
        include_infants,
        text_editor_content,
    } = allInfo;

    const viewDealPackageInfoOnclick = () => {
        viewDealPackageInfo({
            id: "my id"
        })
    }

    const INCLUDED_ITEMS_NAME_ARRAY = items?.map(each=>each.name);
    const completed = true;
    const total_people = (parseInt(max_num_of_adults || 0) + parseInt(max_num_of_children || 0) + parseInt(max_num_of_infants || 0));
    const additional_info = (travel_destination+", "+start_date+" to "+end_date+", "+total_people+(total_people>1 ? " People": " Person"));
    return <div style={{background: completed ? "rgba(0,0,0,0.1)" : "rgba(255,0,0,0.1)", cursor: "pointer"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                {
                    cover_picture ?
                    <div style={{backgroundImage: `url('${cover_picture}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: 100, height: 100}}>
                    </div> :
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 100, background: "rgba(0,0,0,0.2)"}}>
                        <i style={{color: "orange", fontSize: 27}} className="fa fa-folder"></i>
                    </div>
                }
                <div style={{padding: 10, marginLeft: 10}}>
                    <p style={{fontSize: 14, color: "orange"}}>
                        <span style={{color: "lightgreen", marginRight: 10, fontSize: 14}}>
                            {
                                total_price ?
                                <>
                                    $ {add_commas_to_number(parseFloat(total_price)?.toFixed(2)) || "0.00"} - 
                                </> : 
                                <>$ 0.00 - </>
                            }
                        </span>
                        {title}
                    </p>
                    <p style={{fontSize: 12, marginTop: 5, color: "rgba(255,255,255,0.8)"}}>
                        <span style={{color: "rgba(255,255,255,0.6)", marginRight: 10}}>
                            {
                                type === 1 ?
                                "Package" : "Deal"
                            } -
                        </span>
                        {INCLUDED_ITEMS_NAME_ARRAY?.join(", ")}
                    </p>
                    {
                        !completed ?
                        <div style={{display: "flex", marginTop: 20}}>
                            <i style={{color: "yellow", marginRight: 10}}
                                className="fa-solid fa-exclamation-triangle"></i>
                            <span style={{color: "red", fontSize: 13}}>
                                Incomplete Setup
                            </span>
                        </div> :
                        <p style={{fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 10}}>
                            {additional_info}...
                        </p>
                    }
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div onClick={viewDealPackageInfoOnclick} className="tool-tip-parent"
                    style={{marginRight: 10, display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%"}}>
                    <i style={{color: "lightgreen"}} className="fa-solid fa-chart-line"></i>
                    <div style={{textAlign: "center", fontSize: 13, color: "black"}} className="tool-tip">
                        View Statistics
                    </div>
                </div>
                <div onClick={
                    ()=>{
                        setCreateNewPackageData(allInfo);
                        setShowPackageDealForm(true);
                    }
                } className="tool-tip-parent"
                    style={{marginRight: 10, display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%"}}>
                    <i style={{color: "lightgreen"}} className="fa-solid fa-pencil"></i>
                    <div  style={{textAlign: "center", fontSize: 13, color: "black"}} className="tool-tip">
                        Edit Package
                    </div>
                </div>
                <div onClick={()=>setCreateNewPackageData(allInfo)} className="tool-tip-parent"
                    style={{marginRight: 10, display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%"}}>
                    <i style={{color: completed ? "lightgreen" : "red"}} className={"fa fa-"+ (completed ? "angle-right" : "tools")}></i>
                    <div  style={{textAlign: "center", fontSize: 13, color: "black"}} className="tool-tip">
                        Preview Package
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default DealPackageListItem;