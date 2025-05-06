import { useEffect, useState } from "react";
import {
    fetchBookingLinksByAgentId
} from "../../../../../services/bookingLinkServices";

const AgentLinks = (props) => {

    const {
        userDetails
    } = props;

    const _PRODUCTS = ["Flight", "Stays", "Rental Car"]

    const [bookingLinks, setBookingLinks ] = useState([]);

    useEffect(()=>{
        initPageData();
    }, []);

    const initPageData = async () => {
        const bl_res = await fetchBookingLinksByAgentId(userDetails?._id);
        setBookingLinks(bl_res);
    }

    return <div style={{paddingTop: 30}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-link"></i>
            Booking Links
        </p>
        <div>
            <div style={{padding: 10, display: "flex", alignItems: "center"}}>
                <div style={{marginRight: 10}}>
                    <p className="regular-font-color-dark-bg" 
                        style={{fontSize: 13, marginBottom: 5}}>
                            Product</p>
                    <select style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                        <option style={{color: "black"}}>
                            All
                        </option>
                        <option style={{color: "black"}}>
                            Flights
                        </option>
                    </select>
                </div>
                <div style={{marginRight: 10}}>
                    <p className="regular-font-color-dark-bg" 
                        style={{fontSize: 13, marginBottom: 5}}>
                            Trip Type</p>
                    <select style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                        <option style={{color: "black"}}>
                            All
                        </option>
                        <option style={{color: "black"}}>
                            One way
                        </option>
                        <option style={{color: "black"}}>
                            Round trip
                        </option>
                    </select>
                </div>
                <div style={{marginRight: 10}}>
                    <div style={{display: "flex"}}>
                        <p className="regular-font-color-dark-bg" 
                            style={{fontSize: 13, marginBottom: 5}}>
                            Origin Airport</p>
                    </div>
                    <input placeholder="enter airport here..."
                        style={{padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                </div>
                <div style={{marginRight: 10}}>
                    <div style={{display: "flex"}}>
                        <p className="regular-font-color-dark-bg" 
                            style={{fontSize: 13, marginBottom: 5}}>
                            Destination Airport</p>
                    </div>
                    <input placeholder="enter airport here..."
                        type="text"
                        style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                </div>
                <div style={{marginRight: 10}}>
                    <div style={{display: "flex"}}>
                        <p className="regular-font-color-dark-bg" 
                            style={{fontSize: 13, marginBottom: 5}}>
                            Time Interval</p>
                    </div>
                    <input readOnly="true" 
                        placeholder="select dates here..."
                        style={{padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                </div>
                <div onClick={initPageData} 
                    style={{textDecoration: "underline", fontSize: 14, width: 90, color: "lightgreen", marginTop: 20, marginLeft: 10, cursor: "pointer"}}>
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-refresh"></i>
                    Refresh
                </div>
            </div>
            <table className='app-standard-table'>
                <tr>
                    <td>Link</td>
                    <td style={{backgroundColor: "pink"}}>Updated At</td>
                    <td>Data Provider</td>
                    <td>Profit</td>
                    <td>Visited</td>
                    <td>Booked</td>
                    <td>Wallet Cost</td>
                </tr>
                {
                    bookingLinks?.map(each=>{
                        let _full_link = `${each?.client_app_url}?product=${each?.product}&type=${each?.trip_type}&date=${each?.travel_dates}&dpt_airport=${each?.departure_airport}&dst_airport=${each?.destination_airport}&cabin=${each?.cabin}&adults=${each?.num_of_adults}&children=${each?.num_of_children}&infants=${each?.num_of_infants}&ag=${userDetails?._id}&bl=${each?._id}`;
                        return <tr>
                            <td className="tool-tip-parent" style={{color: "orange"}}>
                                <span style={{color: "skyblue"}}>
                                    {_PRODUCTS[each?.product]}
                                </span>
                                <span style={{color: "rgba(255,255,255,0.2)", margin: 5}}>
                                    |</span> 
                                {each?.departure_airport}
                                <span style={{color: "white", marginRight: 4}}>,</span>
                                {each?.destination_airport}
                                <span style={{color: "rgba(255,255,255,0.2)", margin: 5}}>
                                    |</span>
                                {each?.trip_type}
                                <span style={{color: "white", marginRight: 4}}>,</span>
                                {each?.cabin}
                                <span style={{color: "rgba(255,255,255,0.2)", margin: 5}}>
                                    |</span>
                                {each?.travel_dates}
                                <span style={{color: "rgba(255,255,255,0.2)", margin: 5}}>
                                    |</span>
                                {each?.num_of_adults} adult(s)
                                <span style={{color: "white", marginRight: 4}}>,</span>
                                {each?.num_of_children} child(ren)
                                <span style={{color: "white", marginRight: 4}}>,</span>
                                {each?.num_of_infants} infant(s)
                                <div style={{top: "calc(100% - 5px)", minWidth: "100%", color: "black"}} className="tool-tip">
                                    <a style={{whiteSpace: "nowrap", overflow: "hidden"}}
                                        target="_blank" href={_full_link}>
                                        {_full_link}
                                    </a>
                                </div>
                            </td>
                            <td style={{backgroundColor: "rgba(255,255,255,0.1)"}}>
                                {each?.updatedAt}
                            </td>
                            <td>
                                {each?.data_provider}
                            </td>
                            <td className="tool-tip-parent">
                                {each?.profit_type_value}%
                                <div style={{left: -50, top: "calc(100% - 5px)", minWidth: 150, color: "black", textAlign: "center"}} 
                                    className="tool-tip">
                                    {`${each?.profit_type} (${each?.profit_type_value}%)`} 
                                </div>
                            </td>    
                            <td className="tool-tip-parent">
                                {each?.visited}
                                <div style={{left: -50, top: "calc(100% - 5px)", minWidth: 150, color: "black", textAlign: "center"}} 
                                    className="tool-tip">
                                    link opened {each?.visited} time(s)
                                </div>
                            </td>
                            <td className="tool-tip-parent">
                                $00.00 
                                ({each?.booked})
                                <div style={{left: -50, top: "calc(100% - 5px)", minWidth: 150, color: "black", textAlign: "center"}} 
                                    className="tool-tip">
                                    link booked {each?.booked} time(s)
                                </div>
                            </td>
                            <td className="tool-tip-parent">
                                $0.03 (5 actions)
                                <div style={{left: -50, top: "calc(100% - 5px)", minWidth: 150, color: "black", textAlign: "center"}} 
                                    className="tool-tip">
                                    deduction from wallet
                                </div>
                            </td>
                        </tr>
                    })
                }
            </table>
            <div className='app-standard-paginator theme-blend-bg-dark' style={{marginTop: 5}}>
                <div className='prev-next-btn inactive'>
                    <i className='fa-solid fa-angle-left'></i></div>
                <div>1</div>
                <div className='prev-next-btn inactive'>
                    <i className='fa-solid fa-angle-right'></i></div>
            </div>
        </div>
    </div>
}

export default AgentLinks;