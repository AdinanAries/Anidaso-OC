import { show_main_menu } from "./helper-functions";

function Header(){
    return (
        <div className="main-header">
            <div className="wrapper">
                <div style={{display: "flex", flexDirection: "row !important", justifyContent: "space-between"}}>
                    <div onClick={show_main_menu} className="main-menu-button" style={{marginRight: 10}}>
                        <i style={{color: "rgba(255,255,255,0.8)", fontSize: 30}} className="fa fa-bars"></i>
                    </div>
                    <div>
                        <p className="main-search-box-title" style={{color: "white", fontSize: 12, marginBottom: 5, fontWeight: "bolder", letterSpacing: 1}}>
                            Search by confirmation number</p>
                        <div className="main-search-box" style={{borderRadius: 20, width: "calc(100vw - 132px)", maxWidth: 500, margin: "auto", overflow: "hidden", backgroundColor: "white"}}>
                            <input style={{border: "none", width: "calc(100% - 60px)", padding: 10}} placeholder="enter confirmation number here"/>
                            <button style={{border: "none", backgroundColor: "rgba(113,12,255)", padding: 10.5, borderRadius: 0, width: 60}}>
                                <i style={{color: "white"}} className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{padding: "0 10px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <p style={{marginBottom: 5, fontSize: 25, textAlign: "center"}}>
                                <i style={{color: "rgba(255,255,255,0.8)"}} className="fa fa-user" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles" style={{color: "white", fontSize: 12}}>Account</p>
                        </div>
                        <div style={{paddingLeft: "5px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <p style={{marginBottom: 5, fontSize: 23, textAlign: "center"}}>
                                <i style={{color: "rgba(255,255,255,0.8)"}} className="fa fa-bell" aria-hidden="true"></i>
                            </p>
                            <p className="header-icon-titles" style={{color: "white", fontSize: 12}}>Notifications</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;