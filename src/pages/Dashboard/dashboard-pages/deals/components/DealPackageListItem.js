import HotelPic from "../../../../../HotelPic2.jpg";

const DealPackageListItem = (props) => {

    const {
        viewDealPackageInfo,
        img,
    } = props;

    const viewDealPackageInfoOnclick = () => {
        viewDealPackageInfo({
            id: "my id"
        })
    }

    return <div onClick={viewDealPackageInfoOnclick} style={{background: "rgba(0,0,0,0.1)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                {
                    img ?
                    <div style={{backgroundImage: `url('${HotelPic}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: 100, height: 100, border: "1px solid rgba(255,255,255,0.1)"}}>
                    </div> :
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 100, height: 100, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)"}}>
                        <i style={{color: "orange", fontSize: 27}} className="fa fa-folder"></i>
                    </div>
                }
                <div style={{padding: 10, marginLeft: 10}}>
                    <p style={{fontSize: 14, color: "orange"}}>
                        <span style={{color: "lightgreen", marginRight: 10, fontSize: 14}}>
                            $120 -
                        </span>
                        New York City, USA
                    </p>
                    <p style={{fontSize: 12, marginTop: 5, color: "rgba(255,255,255,0.8)"}}>
                        <span style={{color: "rgba(255,255,255,0.6)", marginRight: 10}}>
                            Package -
                        </span>
                        Flight, Stay, Rental Car
                    </p>
                    <p style={{fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10, color: "rgba(255,255,255,0.8)", marginTop: 10}}>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod...
                    </p>
                </div>
            </div>
            <div style={{marginRight: 10, display: "flex", justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: "100%", border: "1px solid rgba(255,255,255,0.1)"}}>
                <i style={{color: "lightgreen", fontSize: 20}} className="fa fa-angle-right"></i>
            </div>
        </div>
    </div>
}

export default DealPackageListItem;