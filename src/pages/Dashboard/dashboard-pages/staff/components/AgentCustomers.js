const AgentCustomers = (props) => {

    return <div style={{paddingTop: 30}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-users"></i>
            Customers
        </p>
        <div style={{marginBottom: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 4px)", borderRadius: 8, backgroundColor: "rgb(43, 52, 61)", padding: 10}}>
                    <p style={{backgroundColor: "rgba(0,0,0,0.2)", padding: 10, fontSize: 12}}>
                        <i style={{color: "lightgreen", marginRight: 10}}
                            className='fa-solid fa-search'></i>
                        <input 
                            style={{background: "none", color: "white", border: "none", width: "calc(100% - 40px)"}}
                            placeholder="Search customer here"
                        />
                    </p>
                    <div style={{marginTop: 2, borderTop: "1px dashed rgba(0,0,0,0.5)"}}>
                        {
                            true ? <>
                                <div style={{display: "flex", padding: 20, margin: "10px 0", backgroundColor: "rgba(255,0,0,0.1)"}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-exclamation-triangle'></i>
                                    <p style={{color: "white", fontSize: 13}}>
                                        You dont have any saved customers yet. You may add new customer or simply enter customer email on the right to send search link to customer!</p>
                                </div>
                                <p style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                                    <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-plus'></i>
                                    Create New Customer
                                </p>
                            </> :
                            <>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                                <div style={{marginTop: 10, cursor: "pointer"}}>
                                    <p style={{color: "white", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-user'></i>
                                        Kwame Asumah - <span style={{color: "orange"}}>
                                            k.asumah@gmail.com
                                        </span>
                                    </p>
                                </div>
                            </>
                        }
                    </div>
                    {   false &&
                        <div className='app-standard-paginator theme-blend-bg-dark' style={{marginTop: 5}}>
                            <div className='prev-next-btn inactive'>
                                <i className='fa-solid fa-angle-left'></i></div>
                            <div>1</div>
                            <div className='prev-next-btn inactive'>
                                <i className='fa-solid fa-angle-right'></i></div>
                        </div>
                    }
                </div>
                <div style={{width: "calc(50% - 4px)"}}>
                    <div style={{padding: 20, borderRadius: 8, backgroundColor: "rgba(0,255,0,0.1)", marginBottom: 10}}>
                        <p style={{color: "white", fontSize: 13, display: "flex"}}>
                            <i style={{color: "lightgreen", marginRight: 10}} className='fa-solid fa-info-circle'></i>
                            <span>
                                To send the search link to a customer, you must select a customer on the left side or enter customer email below or create new customer
                            </span>  
                        </p>
                        <p style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                            <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-plus'></i>
                            Create New Customer
                        </p>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-envelope" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Customer Email</p>
                        <div style={{border: "none"}}>
                            <input
                                type="email" placeholder="type here..."
                                style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{cursor: "pointer", backgroundColor: "yellow", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                        <i style={{marginRight: 10, fontSize: 14}} className="fa fa-check-square-o"></i>
                        Send Link
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AgentCustomers;