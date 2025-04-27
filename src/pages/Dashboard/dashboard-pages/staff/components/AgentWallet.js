const AgentWallet = (props) => {

    return <div style={{paddingTop: 30}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-wallet"></i>
            Wallet Balance:
        </p>
        <div>
            <div style={{marginLeft: 30}}>
                <h1 style={{color: "skyblue"}}> 
                    $2,220.19
                    <span style={{color: "lightgreen", fontWeight: "initial", fontSize: 14, cursor: "pointer", marginLeft: 20, textDecoration: "underline"}}>
                    <i style={{marginRight: 5, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                        className="fa fa-plus"></i>
                        Add Balance
                    </span>
                </h1>
                <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 5}}>
                    approx. 
                    <span style={{color: "orange"}}>
                        50,0000</span> actions remaining
                </p>
            </div>
        </div>
        <div style={{marginTop: 20}}>
            <div style={{padding: 10, display: "flex"}}>
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
                            Trans. Type</p>
                    <select style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                        <option style={{color: "black"}}>
                            All
                        </option>
                        <option style={{color: "black"}}>
                            Debit
                        </option>
                        <option style={{color: "black"}}>
                            Credit
                        </option>
                    </select>
                </div>
                <div style={{marginRight: 10}}>
                    <div style={{display: "flex"}}>
                        <p className="regular-font-color-dark-bg" 
                            style={{fontSize: 13, marginBottom: 5}}>
                            Trans. Title</p>
                    </div>
                    <input placeholder="enter title here..."
                        style={{padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
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
            </div>
            <table className='app-standard-table'>
                <tr>
                    <td>Type</td>
                    <td>Title</td>
                    <td>Description</td>
                    <td style={{backgroundColor: "pink"}}>Created At</td>
                    <td>Amount</td>
                    <td>Points</td>
                    <td>Balance Before</td>
                    <td>Balance After</td>
                </tr>
                <tr>
                    <td style={{color: "orangered"}}>
                        <i style={{color: "red", marginRight: 10}}
                            className="fa-solid fa-minus"></i>
                        Debit
                    </td>
                    <td>Customer Flight Search</td>
                    <td>
                        flight, round-trip, 2025-04-30 - 2025-05-03, ACC, JFK, economy, 1 adult, 0 child, 0 infant
                    </td>
                    <td style={{backgroundColor: "rgba(255,255,255,0.1)"}}>
                        2024-12-25, 01:26:22
                    </td>
                    <td>$0.32</td>
                    <td>3 actions</td>
                    <td>$3,000</td>
                    <td>$2,999.68</td>
                </tr>
                <tr>
                    <td style={{color: "lightgreen"}}>
                        <i style={{marginRight: 10}}
                            className="fa-solid fa-plus"></i>
                        Credit
                    </td>
                    <td>Wallet Top-up</td>
                    <td>
                        account balance increased with debit/credit card ending in ...4593
                    </td>
                    <td style={{backgroundColor: "rgba(255,255,255,0.1)"}}>
                        2024-12-25, 01:26:22
                    </td>
                    <td>$0.32</td>
                    <td>3 actions</td>
                    <td>$3,000</td>
                    <td>$2,999.68</td>
                </tr>
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

export default AgentWallet;