import { useEffect, useState } from "react";
import { 
    fetchWalletById,
    fetchTransactionsByWalletId,
    fetchTransactionTypes
 } from "../../../../../services/agentServices";
 import { 
    calculateActionPoints,
    add_commas_to_number
} from "../../../../../helpers/helper-functions";

const AgentWallet = (props) => {

    const {
        userDetails,
        setSelectedStaff,
        loggedInUserDetails,
        setUserDetails,
    } = props;

    const [ transactions, setTransactions ] = useState([]);
    const [ transactionTypes, setTransactionTypes ] = useState([]);

    useEffect(()=>{
        loadPageData();
    }, []);

    const loadPageData = async () => {
        // Setting current balance
        if(userDetails?._id === loggedInUserDetails?._id){
            let _wallet = await fetchWalletById(userDetails?.wallet_info?._id);
            const updated_user_info = {
                ...loggedInUserDetails,
                wallet_info: {
                    ...loggedInUserDetails.wallet_info,
                    current_balance: _wallet?.current_balance
                }
            }
            setSelectedStaff(updated_user_info)
            /*setUserDetails(updated_user_info);*/
        }

        let __trans = await fetchTransactionsByWalletId(userDetails?.wallet_info?._id);
        let __trans_types = await fetchTransactionTypes();
        console.log(__trans_types);
        setTransactionTypes(__trans_types);
        if(__trans_types?.length){
            for(let trans of __trans){
                for(let trans_type of __trans_types) {
                    if(trans_type?._id===trans?.transaction_type_id){
                        trans.type_info=trans_type;
                    }
                }
            }
        }
        setTransactions(__trans);
    }

    return <div style={{paddingTop: 30}} className="main-seaction-containers">
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-wallet"></i>
            Wallet Balance:
        </p>
        <div>
            <div style={{marginLeft: 30}}>
                <h1 style={{color: "skyblue"}}> 
                    ${add_commas_to_number((userDetails?.wallet_info?.current_balance).toFixed(2))}
                    <span style={{color: "lightgreen", fontWeight: "initial", fontSize: 14, cursor: "pointer", marginLeft: 20, textDecoration: "underline"}}>
                    <i style={{marginRight: 5, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                        className="fa fa-plus"></i>
                        Add Balance
                    </span>
                    <span onClick={loadPageData} 
                        style={{textDecoration: "underline", fontWeight: "initial", fontSize: 14, width: 90, color: "lightgreen", marginLeft: 20, cursor: "pointer"}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-refresh"></i>
                        Refresh
                    </span>
                </h1>
                <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 5}}>
                    approx. 
                    <span style={{color: "orange"}}>
                        {add_commas_to_number(calculateActionPoints((userDetails?.wallet_info?.current_balance).toFixed(2)))}</span> actions remaining
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
                    <td style={{backgroundColor: "pink"}}>Updated At</td>
                    <td>Amount</td>
                    <td>Points</td>
                    <td>Balance Before</td>
                    <td>Balance After</td>
                </tr>
                {/*<tr>
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
                </tr>*/}
                {
                    transactions?.length && transactions?.map(each=>{
                        return <tr>
                            <td style={{color: (each?.type_info?.type?.toLowerCase().trim()==="debit" ? "orangered" : "lightgreen"), fontSize: 11}}>
                                {
                                    (each?.type_info?.type?.toLowerCase().trim()==="debit") &&
                                    <>
                                        <i style={{color: "red", marginRight: 10}}
                                            className="fa-solid fa-minus"></i>
                                        Debit
                                    </>
                                }
                                {
                                    (each?.type_info?.type?.toLowerCase().trim()==="credit") &&
                                    <>
                                        <i style={{marginRight: 10}}
                                            className="fa-solid fa-plus"></i>
                                        Credit
                                    </>
                                }
                            </td>
                            <td>{each?.type_info?.title}</td>
                            <td className="tool-tip-parent" style={{color: "white"}}>
                                {each?.description?.substring(0, 25)}...
                                <div style={{top: "calc(100% - 5px)", minWidth: "100%", color: "black"}} className="tool-tip">
                                    {each?.description}
                                </div>
                            </td>
                            <td style={{backgroundColor: "rgba(255,255,255,0.1)"}}>
                                {each?.updatedAt}
                            </td>
                            <td>${each?.total_amount}</td>
                            <td>{each?.total_action_points} actions</td>
                            <td>${(each?.wallet_balance_before).toFixed(2)}</td>
                            <td>${(each?.wallet_balance_after).toFixed(2)}</td>
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

export default AgentWallet;