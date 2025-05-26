import { useEffect, useState } from "react";
import { 
    fetchCustomersByAgentId, 
    createNewCustomer,
    fetchCustomersByAgentIdAndSearchQuery 
} from "../../../../../services/customerServices";
import CustomerForm from "../../../../../components/CustomerForm";

const AgentCustomers = (props) => {

    const {
        userDetails
    } = props;

    const PAGI_LIMIT = 10;

    const [customersList, setCustomersList ] = useState([]);
    const [ currentCustomer, setCurrentCustomer ] = useState({});
    const [ searchCustomerQuery, setSearchCustomerQuery ] = useState("");
    const [ isLoading, setisLoading ] = useState(false);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);

    useEffect(()=>{
        loadCustomers();
    }, [pagiCurrentPage]);

    const loadCustomers = async () => {
        setisLoading(true);
        let __customers = await fetchCustomersByAgentId(userDetails?._id, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(__customers))
            setCustomersList(__customers);
        setisLoading(false);
    }

    const customerOnDelete = async (cust_obj) => {
        if(window.confirm("Do you want to delete customer?")){
            setisLoading(true);
            for(const each of customersList){
                if(each?._id === cust_obj?._id){
                    each.deleted=true;
                    let __res = await createNewCustomer(each);
                    const index = customersList.findIndex(item => item?._id === cust_obj?._id);
                    if (index > -1) {
                        customersList?.splice(index, 1);
                    }
                }
            }
            setCustomersList([
                ...customersList,
            ]);
            if(customersList.length<1){
                loadCustomers();
            }
            setisLoading(false);
        }
    }

    const searchCustomerFieldOnInput = (e) => {
        if(!e.target.value){
            loadCustomers();
        }
        setSearchCustomerQuery(e.target.value);
    }

    const searchCustomerOnSubmit = async () => {
        if(!searchCustomerQuery){
            alert("Please enter customer name or email or phone");
            return;
        }
        let __customers = await fetchCustomersByAgentIdAndSearchQuery(userDetails?._id, searchCustomerQuery, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(__customers))
            setCustomersList(__customers);
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
                className="fa fa-users"></i>
            Customers
        </p>
        <div style={{marginBottom: 10}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 4px)", borderRadius: 8, backgroundColor: "rgb(43, 52, 61)", padding: 10}}>
                    <div style={{backgroundColor: "rgba(0,0,0,0.2)", padding: 10, fontSize: 12, display: "flex", alignItems: "center"}}>
                        <i style={{color: "lightgreen", marginRight: 10}}
                            className='fa-solid fa-search'></i>
                        <input onInput={searchCustomerFieldOnInput}
                            value={searchCustomerQuery}
                            style={{background: "none", color: "white", border: "none", width: "calc(100% - 40px)"}}
                            placeholder="Enter customer name/email/phone here"
                        />
                        <div onClick={searchCustomerOnSubmit} style={{background: "green", color: "white", padding: "10px 20px", borderRadius: 50, cursor: "pointer"}}>
                            Search
                        </div>
                    </div>
                    {
                        isLoading ? <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                            fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                            <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                            Loading.. Please Wait
                        </div> :
                        <div style={{marginTop: 2, borderTop: "1px dashed rgba(0,0,0,0.5)"}}>
                            {
                                (customersList?.length < 1) && <>
                                    <div style={{display: "flex", padding: 20, margin: "10px 0", backgroundColor: "rgba(255,0,0,0.1)"}}>
                                        <i style={{color: "yellow", marginRight: 10}}
                                            className='fa-solid fa-exclamation-triangle'></i>
                                        <p style={{color: "white", fontSize: 13}}>
                                            You dont have any saved customers yet. You may add new customer or simply enter customer email on the right to send search link to customer!</p>
                                    </div>
                                </>
                            }
                            {
                                !currentCustomer?._id &&
                                customersList?.map(each=>{
                                    return <div style={{display: "flex", justifyContent: "space-between", marginTop: 10, padding: 10, paddingTop: 0, cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.2)"}}>
                                        <p style={{color: "white", fontSize: 13}}>
                                            <i style={{color: "yellow", marginRight: 10}}
                                            className='fa-solid fa-user'></i>
                                            {each?.first_name} {each?.last_name} - <span style={{color: "orange"}}>
                                                {each?.email}
                                            </span>
                                        </p>
                                        <p>
                                            <span onClick={()=>setCurrentCustomer(each)}
                                                className="tool-tip-parent" style={{color: "lightgreen", cursor: "pointer", marginLeft: 5, marginRight: 20, cursor: "pointer"}}>
                                                <i className="fa-solid fa-pencil"></i>
                                                <span style={{color: "black", fontSize: 13, textAlign: 'center'}}
                                                    className="tool-tip">
                                                    Edit Customer
                                                </span>
                                            </span>

                                            <span onClick={()=>customerOnDelete(each)}
                                                className="tool-tip-parent" style={{color: "red", cursor: "pointer", cursor: "pointer"}}>
                                                <i className="fa-solid fa-trash-can"></i>
                                                <span style={{color: "black", fontSize: 13, textAlign: 'center'}}
                                                    className="tool-tip">
                                                    Delete Customer
                                                </span>
                                            </span>
                                        </p>
                                    </div>
                                }) 
                            }
                            {
                                currentCustomer?._id &&
                                <div style={{marginTop: 10}}>
                                    <CustomerForm 
                                        showFull={true}
                                        userDetails={userDetails}
                                        successCallBack={loadCustomers}
                                        currentCustomer={currentCustomer}
                                        onCancelButtonFunc={setCurrentCustomer}
                                    />
                                </div>
                            }
                        </div>
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
                <div style={{width: "calc(50% - 4px)"}}>
                    <CustomerForm 
                        showFull={false}
                        userDetails={userDetails}
                        successCallBack={loadCustomers}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default AgentCustomers;