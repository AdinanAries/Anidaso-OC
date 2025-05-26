import { useEffect, useState } from "react";
import {
    fetchBookingLinksByAgentId
} from "../../../../../services/bookingLinkServices";

const AgentLinks = (props) => {

    const {
        userDetails
    } = props;

    const _PRODUCTS = ["Flight", "Stays", "Rental Car"];
    const PAGI_LIMIT = 10;

    const [ isLoading, setIsLoading ] = useState(false);
    const [bookingLinks, setBookingLinks ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);
    const [ pageFilters, setPageFilters ] = useState({
        product: -1,
        trip_round: "all",
        origin_airport: "",
        destination_airport: "",
        time_intervals: "",
    });
    
    useEffect(()=>{
        initPageData();
    }, [pagiCurrentPage, pageFilters]);

    const initPageData = async () => {
        setIsLoading(true);
        const bl_res = await fetchBookingLinksByAgentId(userDetails?._id, pageFilters, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(bl_res))
            setBookingLinks(bl_res);
        setIsLoading(false);
    }

    const tripTypeFilterOnInput = (e) => {
        setpagiCurrentPage(1);
        setPageFilters({
            ...pageFilters,
            trip_round: e.target.value
        });
    }

    const productFilterOninput = (e) => {
        setpagiCurrentPage(1);
        setPageFilters({
            ...pageFilters,
            product: e.target.value
        });
    }

    const all_pages = [];
    let i=1;
    while(true){
        all_pages.push(i);
        if(i>=totalItems){
            break
        }
        i+=PAGI_LIMIT;
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
                    <select onInput={productFilterOninput} 
                        style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                        <option value={-1}
                            style={{color: "black"}}>
                            All
                        </option>
                        <option value={0}
                            style={{color: "black"}}>
                            Flights
                        </option>
                        <option value={1}
                            style={{color: "black"}}>
                            Stays
                        </option>
                        <option value={2}
                            style={{color: "black"}}>
                            Cars
                        </option>
                    </select>
                </div>
                <div style={{marginRight: 10}}>
                    <p className="regular-font-color-dark-bg" 
                        style={{fontSize: 13, marginBottom: 5}}>
                            Trip Type</p>
                    <select onInput={tripTypeFilterOnInput}
                        value={pageFilters?.trip_round}
                        style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                        <option value="all"
                            style={{color: "black"}}>
                            All
                        </option>
                        <option value="one-way"
                            style={{color: "black"}}>
                            One way
                        </option>
                        <option value={"round-trip"} 
                            style={{color: "black"}}>
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
            {
                isLoading ? 
                <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                    fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                    <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                    Loading.. Please Wait
                </div> :
                <>
                    {
                        bookingLinks?.length < 1 ?
                        <div style={{padding: 20, backgroundColor: "rgba(255,0,0,0.2)"}}>
                            <p style={{color: "white", fontSize: 13, textAlign: "center"}}>
                                <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                                Nothing to show...
                            </p>
                        </div> :
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
                    }
                </>
            }
            {
                totalItems > PAGI_LIMIT &&
                <>
                    <select onInput={e=>setpagiCurrentPage(e.target.value)}
                        value={pagiCurrentPage}
                        className="select-input-paginator"
                    >
                        {
                            all_pages?.map((each, i)=>{
                                return <option style={{color: "black"}}
                                    value={each}
                                >{each} - {(each+PAGI_LIMIT-1)}</option>
                                    
                            })  
                        }
                    </select>
                    <span style={{color: "grey", marginLeft: 10, fontSize: 12}}>
                        <span style={{margin: 10, color: "rgba(255,255,255,0.5)", fontSize: 15}}>-</span>
                        Total: 
                        <span style={{color: "orange", margin: 5}}>{totalItems}</span> 
                        item(s)
                        <span style={{margin: 10, color: "rgba(255,255,255,0.5)", fontSize: 15}}>-</span>
                    </span>
                </>
            }
        </div>
    </div>
}

export default AgentLinks;