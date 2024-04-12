import StaffListItem from "./StaffistItem";

const StaffList = (props) => {
    return <div style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden"}}>
        <p  className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
            <i className="fa fa-users" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Search Staff:</p>
        <div style={{marginTop: 10}}>
            <div className="main-search-box" 
                style={{borderRadius: 50, border: "1px solid rgba(255,255,255,0.1)",
                margin: "auto", overflow: "hidden", backgroundColor: "rgba(0,0,0,0.2)"}}>
                <input 
                    style={{border: "none", background: "none", width: "calc(100% - 60px)", padding: 10, color: "white"}} 
                    placeholder="Enter full name or email here"/>
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
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
        </div>

    </div>
}

export default StaffList;