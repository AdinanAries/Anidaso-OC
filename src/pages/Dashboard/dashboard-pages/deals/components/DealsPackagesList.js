import { useEffect, useState } from "react";
import DealPackageListItem from "./DealPackageListItem";
import { 
    fetchDealsPackages,
    fetchDealsPackagesBySearchQuery
} from "../../../../../services/dealPackageServices";

const DealsPackagesList = (props) => {

    const {
        userDetails,
        viewDealPackageInfo,
        setShowPackageDealForm,
        setCreateNewPackageData,
    } = props;

    const PAGI_LIMIT = 10;

    const [ isLoading, setIsLoading ] = useState(false);
    const [ dealsPackagesList , setDealsPackagesList ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ pageFilters, setPageFilters ] = useState({
        // Filters yet to be defined
    });

    useEffect(()=>{
        if(userDetails?._id){
            loadPageData();
        }
    }, []);

    const loadPageData = async () => {
        setIsLoading(true);
        let dp_res = await fetchDealsPackages(userDetails?._id, pageFilters, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(dp_res))
            setDealsPackagesList(dp_res);
        setIsLoading(false);
    }

    const searchQueryOnInput = (e) => {
        setSearchQuery(e.target.value)
    }

    const searchDealPackageOnClick = async () => {
        setIsLoading(true);
        if(!searchQuery){
            alert("Please Enter Title/Destination City");
            setIsLoading(false);
            return;
        }
        let dp_res = await fetchDealsPackagesBySearchQuery(userDetails?._id, searchQuery, pageFilters, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(dp_res))
            setDealsPackagesList(dp_res);
        setIsLoading(false);
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

    return <div style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)"}}>
        <p  className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
            <i className="fa fa-folder-open" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Search Deals/Packages:</p>
        <div style={{marginTop: 10, padding: "10px 0"}}>
            <div className="main-search-box" 
                style={{borderRadius: 50,
                margin: "auto", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.2)"}}>
                <input onInput={searchQueryOnInput}
                    value={searchQuery}
                    style={{border: "none", background: "none", width: "calc(100% - 60px)", padding: 10, paddingLeft: 25, color: "white"}} 
                    placeholder="Enter deal or package title or destination city"/>
                <button onClick={searchDealPackageOnClick} className="top-search-box-submit-btn">
                    <i style={{color: "white"}} className="fa fa-search"></i>
                </button>
            </div>
        </div>
        <div>
            {
                (dealsPackagesList?.length>0) &&
                <p style={{fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 10}}>
                    {totalItems} total results...</p>
            }
        </div>
        {
            isLoading ?
            <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                Loading.. Please Wait
            </div> : 
            <>
                <div style={{marginTop: 10}}>
                    {
                        (dealsPackagesList?.length>0) ?
                        <>
                            {
                                dealsPackagesList?.map(each=>{
                                    return <DealPackageListItem 
                                        viewDealPackageInfo={viewDealPackageInfo}
                                        setShowPackageDealForm={setShowPackageDealForm}
                                        setCreateNewPackageData={setCreateNewPackageData}
                                        allInfo={each}
                                    />
                                })
                            }
                        </> : <div style={{padding: 20, backgroundColor: "rgba(255,0,0,0.2)"}}>
                            <p style={{color: "white", fontSize: 13, textAlign: "center"}}>
                                <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                                Nothing to show...
                            </p>
                        </div>

                    }
                </div>
                {
                    totalItems > PAGI_LIMIT &&
                    <div style={{marginTop: 10}}>
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
                    </div>
                }
            </>
        }
    </div>
}

export default DealsPackagesList;