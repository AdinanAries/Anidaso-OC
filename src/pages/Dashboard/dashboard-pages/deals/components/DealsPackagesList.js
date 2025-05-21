import DealPackageListItem from "./DealPackageListItem";

const DealsPackagesList = (props) => {

    const {
        viewDealPackageInfo,
    } = props;

    return <div style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden"}}>
        <p  className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
            <i className="fa fa-folder-open" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Search Deals/Packages:</p>
        <div style={{marginTop: 10}}>
            <div className="main-search-box" 
                style={{borderRadius: 50,
                margin: "auto", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.2)"}}>
                <input 
                    style={{border: "none", background: "none", width: "calc(100% - 60px)", padding: 10, paddingLeft: 25, color: "white"}} 
                    placeholder="Enter deal or package id or title"/>
                <button className="top-search-box-submit-btn">
                    <i style={{color: "white"}} className="fa fa-search"></i>
                </button>
            </div>
        </div>
        <div>
            <p style={{fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 10}}>
                123 total results...</p>
        </div>
        <div style={{marginTop: 10}}>
            <DealPackageListItem 
                viewDealPackageInfo={viewDealPackageInfo}
                img={true}
                completed={true}
            />
            <DealPackageListItem 
                viewDealPackageInfo={viewDealPackageInfo}
                img={false}
                completed={false}
            />
            <DealPackageListItem 
                viewDealPackageInfo={viewDealPackageInfo}
                img={false}
                completed={true}
            />
            <DealPackageListItem 
                viewDealPackageInfo={viewDealPackageInfo}
                img={false}
                completed={false}
            />
            <DealPackageListItem 
                viewDealPackageInfo={viewDealPackageInfo}
                img={true}
                completed={true}
            />
            <DealPackageListItem 
                viewDealPackageInfo={viewDealPackageInfo}
                img={false}
                completed={true}
            />
        </div>
        <div className='app-standard-paginator theme-blend-bg-dark' style={{marginTop: 5}}>
            <div className='prev-next-btn inactive'>
                <i className='fa-solid fa-angle-left'></i></div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div className='prev-next-btn inactive'>
                <i className='fa-solid fa-angle-right'></i></div>
        </div>
    </div>
}

export default DealsPackagesList;