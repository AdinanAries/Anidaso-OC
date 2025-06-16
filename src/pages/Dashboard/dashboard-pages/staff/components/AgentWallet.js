import { useEffect, useState } from "react";
import { 
    fetchWalletById,
    fetchTransactionsByWalletId,
    fetchTransactionTypes,
    updateAgentWallet
 } from "../../../../../services/agentServices";
 import { 
    calculateActionPoints,
    add_commas_to_number
} from "../../../../../helpers/helper-functions";
import CONSTANTS from "../../../../../constants/Constants";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../../../components/CheckoutForm';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51OdjZ3An0YMgH2TtyCpkCBN4vDrMuQlwvmFSNKqBl9gJY996OXSpZ9QLz5dBGHLYLsa7QVvwY51I0DcLHErLxW7y00vjEWv9Lc');

const AgentWallet = (props) => {

    const {
        userDetails,
        setSelectedStaff,
        loggedInUserDetails,
        setUserDetails,
    } = props;

    let isOwner = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isAdmin = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isAgent = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.agent);

    const PAGI_LIMIT = 10;
    const __PAYMENT_FOR_WALLET_BALANCE = "wallet";

    const [ showAddBalanceForm , setshowAddBalanceForm ] = useState(false);
    const [ newBalanceAmount, setNewBalanceAmount ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ transactions, setTransactions ] = useState([]);
    const [ transactionTypes, setTransactionTypes ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);
    const [ filtersTitleFld, setFiltersTitleFld ] = useState("");
    const [ pageFilters, setPageFilters ] = useState({
        product: -1,
        trans_type: "all",
        title: "",
        time_intervals: "",
    });

    useEffect(()=>{
        if(userDetails?.wallet_info)
            loadPageData();
    }, [pagiCurrentPage, pageFilters]);

    const loadPageData = async () => {
        setIsLoading(true);
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
            setSelectedStaff(updated_user_info);
            /*setUserDetails(updated_user_info);*/
        }

        let __trans = await fetchTransactionsByWalletId(userDetails?.wallet_info?._id, pageFilters, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        let __trans_types = await fetchTransactionTypes();
        console.log(__trans_types);
        setTransactionTypes(__trans_types);
        if(__trans_types?.length){
            if(Array.isArray(__trans)){
                for(let trans of __trans){
                    for(let trans_type of __trans_types) {
                        if(trans_type?._id===trans?.transaction_type_id){
                            trans.type_info=trans_type;
                        }
                    }
                }
            }
        }
        if(Array.isArray(__trans))
            setTransactions(__trans);
        setIsLoading(false);
    }

    const transTypeFilterOnInput = (e) => {
        setpagiCurrentPage(1);
        setPageFilters({
            ...pageFilters,
            trans_type: e.target.value
        });
    }

    const productFilterOninput = (e) => {
        setpagiCurrentPage(1);
        setPageFilters({
            ...pageFilters,
            product: e.target.value
        });
    }

    const filterButtonOnclick = () => {
        setpagiCurrentPage(1);
        setPageFilters({
            ...pageFilters,
            title: filtersTitleFld
        });
    }

    const newBalanceAmountOnInput = (e) => {
        setNewBalanceAmount(e.target.value);
    }

    const checkoutOnComplete = async () => {
        const __post_obj = {
            oc_user_id: userDetails?._id,
            new_balance: newBalanceAmount,
            balance_currency: "usd"
        };
        let __res = await updateAgentWallet(__post_obj);
        console.log(__res);
        if(__res?._id){
            setshowAddBalanceForm(false);
            if(userDetails?._id === loggedInUserDetails?._id){
                if(!userDetails?.wallet_info) {
                    const updated_user_info = {
                        ...loggedInUserDetails,
                        wallet_info: {
                            _id: __res?._id,
                            oc_user_id: __res.oc_user_id,
                            last_top_up_date: __res.last_top_up_date,
                            current_balance: __res.current_balance,
                            balance_currency: __res.balance_currency,
                        }
                    }
                    setSelectedStaff(updated_user_info);
                }
            } else {
                loadPageData();
            }
            alert(newBalanceAmount+" added to wallet balance!");
        }
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
        {
            (userDetails?.wallet_info && !showAddBalanceForm) ?
            <>
                <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                        className="fa fa-wallet"></i>
                    Wallet Balance:
                </p>
                <div>
                    <div style={{marginLeft: 30}}>
                        <h1 style={{color: "skyblue"}}> 
                            ${add_commas_to_number((userDetails?.wallet_info?.current_balance).toFixed(2))}
                            <span onClick={()=>setshowAddBalanceForm(true)} style={{color: "lightgreen", fontWeight: "initial", fontSize: 14, cursor: "pointer", marginLeft: 20, textDecoration: "underline"}}>
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
                            <select onInput={productFilterOninput}
                                value={pageFilters?.product}
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
                                    Trans. Type</p>
                            <select onInput={transTypeFilterOnInput}
                                value={pageFilters?.trans_type}
                                style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                                <option value="all"
                                    style={{color: "black"}}>
                                    All
                                </option>
                                <option value="debit"
                                    style={{color: "black"}}>
                                    Debit
                                </option>
                                <option value="credit"
                                    style={{color: "black"}}>
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
                            <input onInput={(e)=>setFiltersTitleFld(e.target.value)}
                                value={filtersTitleFld}
                                placeholder="enter title here..."
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
                        <div>
                            <div onClick={filterButtonOnclick}
                                style={{padding: "10px 20px", marginTop: 23, cursor: "pointer", backgroundColor: "green", color: "white", borderRadius: 50, fontSize: 13}}>
                                Filter
                            </div>
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
                                transactions?.length < 1 ?
                                <div style={{padding: 20, backgroundColor: "rgba(255,0,0,0.2)"}}>
                                    <p style={{color: "white", fontSize: 13, textAlign: "center"}}>
                                        <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                                        Nothing to show...
                                    </p>
                                </div> :
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
            </> :
            <div>
                {
                    isAgent &&
                    <>
                        {
                            showAddBalanceForm ?
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div style={{width: "calc(50% - 5px)"}}>
                                    <div>
                                        <p style={{fontSize: 13, color: "white"}}>
                                            <i style={{marginRight: 10, color: "yellow"}} className="fa-solid fa-wallet"></i>
                                            Balance Amount
                                        </p>
                                        <div>
                                            <div style={{marginTop: 20}}>
                                                <div style={{marginTop: 10}}>
                                                    <div style={{marginBottom: 5, borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                                                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                                            <i className="fa-solid fa-file-signature" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                                            Basic Tier: $1.00 = 10 actions</p>
                                                        <div>
                                                            <input onInput={newBalanceAmountOnInput}
                                                                value={newBalanceAmount}
                                                                type="number"
                                                                style={{marginTop: 10, borderRadius: 8, fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 20, background: "rgba(0,0,0,0.2)", border: "none"}}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{marginLeft: 30}}>
                                                <p style={{marginBottom: 10, color: "rgba(255,255,255,0.6)", fontSize: 13}}>
                                                    Total:</p>
                                                {
                                                    newBalanceAmount ?
                                                    <h1 style={{color: "skyblue"}}> 
                                                        ${add_commas_to_number(parseFloat(newBalanceAmount)?.toFixed(2))}
                                                    </h1> : 
                                                    <p style={{color: "red", fontSize: 13, padding: 10}}>
                                                        <i style={{marginRight: 10, color: "yellow"}} className="fa-solid fa-exclamation-triangle"></i>
                                                        Please enter ballance amount
                                                    </p>
                                                }
                                                {
                                                    newBalanceAmount ?
                                                    <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 5}}>
                                                        <span style={{color: "orange"}}>
                                                            {add_commas_to_number(calculateActionPoints(newBalanceAmount))}</span> actions will be added
                                                    </p> : <></>
                                                }
                                            </div>
                                            <p onClick={()=>setshowAddBalanceForm(false)} style={{cursor: "pointer", textDecoration: "underline", color: "lightgreen", fontSize: 13, margin: 20}}>
                                                <i className="fa-solid fa-arrow-left" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>     
                                                Back</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: "calc(50% - 5px)"}}>
                                    <div>
                                        <p style={{fontSize: 13, color: "white"}}>
                                            <i style={{marginRight: 10, color: "yellow"}} className="fa-solid fa-credit-card"></i>
                                            Payment Method
                                        </p>
                                    </div>
                                    <div style={{marginTop: 20}}>
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm 
                                                checkoutOnComplete={checkoutOnComplete}
                                                userDetails={userDetails}
                                                price_amount={newBalanceAmount}
                                                PaymentFor={__PAYMENT_FOR_WALLET_BALANCE}
                                            />
                                        </Elements>
                                    </div>
                                </div>
                            </div> :
                            <div style={{padding: 20}}>
                                <p style={{color: "red", fontSize: 13}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className="fa-solid fa-exclamation-triangle"></i>
                                    Wallet not setup for this Agent user.
                                </p>
                                <p onClick={()=>setshowAddBalanceForm(true)} style={{margin: 20, textDecoration: "underline", cursor: "pointer", color: "lightgreen"}}>
                                    <i style={{color: "rgba(255,255,255,0.5)", marginRight: 10}}
                                        className="fa-solid fa-plus"></i>
                                    Add Wallet
                                </p>
                            </div>
                        }
                    </>
                }
            </div>
        }
    </div>
}

export default AgentWallet;