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
    const [ selectedCustomer, setSelectedCustomer ] = useState({});

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
        {
            selectedCustomer?._id ?
            <div style={{marginBottom: 10}}>
                <div onClick={()=>setSelectedCustomer({})}
                    style={{padding: 20, color: "orange", textDecoration: "underline", cursor: "pointer", fontSize: 13}} >
                    <i style={{color: "lightgreen", marginRight: 10}} className="fa fa-angle-left"></i>
                    Customers List
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: "calc(50% - 3px)"}}>
                        <h3 style={{color: "skyblue"}}>
                            <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className="fa-solid fa-user"></i>
                            {selectedCustomer?.first_name} {selectedCustomer?.last_name}
                        </h3>
                        <div style={{marginLeft: 25}}>
                            <p style={{color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 5}}>
                                {selectedCustomer?.email}, {selectedCustomer?.phone}
                            </p>
                        </div>

                    </div>
                    <div style={{width: "calc(50% - 3px)"}}>
                        <p style={{fontSize: 13, color: "rgba(255,255,255,0.5)"}}>
                            Customer Management</p>
                        <div style={{marginTop: 10}}>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.3)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Change Stage</p>
                                <div style={{border: "none"}}>
                                    <select 
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        <option value={1}
                                            style={{color: "black"}}>Awareness</option>
                                        <option value={1}
                                            style={{color: "black"}}>Acquisition</option>
                                        <option value={2}
                                            style={{color: "black"}}>Conversion</option>
                                        <option value={2}
                                            style={{color: "black"}}>Retention</option>
                                        <option value={2}
                                            style={{color: "black"}}>Loyalty</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
            <div style={{marginBottom: 10}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 20}}>
                    <div style={{width: "calc(20% - 3px)",  borderRadius: 8, background: "rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <div style={{padding: 20}}>
                            <p style={{fontSize: 16, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                                <i className="fa-solid fa-user-check"></i>
                            </p>
                            <p style={{textAlign: "center", color: "orange"}}>
                                Awareness</p>
                            <p style={{textAlign: "center", color: "white", fontSize: 13, marginTop: 10}}>
                                This is the initial stage where potential customers first become aware of your brand, product, or service. They may encounter your business through marketing campaigns, social media, or word-of-mouth.
                            </p>
                        </div>
                    </div>
                    <div style={{width: "calc(20% - 3px)",  borderRadius: 8, background: "rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <div style={{padding: 20}}>
                            <p style={{fontSize: 16, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                                <i className="fa-solid fa-comment-dollar"></i>
                            </p>
                            <p style={{textAlign: "center", color: "orange"}}>
                                Acquisition</p>
                            <p style={{textAlign: "center", color: "white", fontSize: 13, marginTop: 10}}>
                                In this stage, the focus shifts to converting these leads into actual customers. Strategies like offering free trials, discounts, or personalized consultations can be employed. 
                            </p>
                        </div>
                    </div>
                    <div style={{width: "calc(20% - 3px)",  borderRadius: 8, background: "rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <div style={{padding: 20}}>
                            <p style={{fontSize: 16, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                                <i className="fa-solid fa-money-bill-trend-up"></i>
                            </p>
                            <p style={{textAlign: "center", color: "orange"}}>
                                Conversion</p>
                            <p style={{textAlign: "center", color: "white", fontSize: 13, marginTop: 10}}>
                                This stage marks the successful transition from lead to paying customer. It involves providing a seamless buying experience, efficient order processing, and onboarding new customers. 
                            </p>
                        </div>
                    </div>
                    <div style={{width: "calc(20% - 3px)",  borderRadius: 8, background: "rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <div style={{padding: 20}}>
                            <p style={{fontSize: 16, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                                <i className="fa-solid fa-star"></i>
                            </p>
                            <p style={{textAlign: "center", color: "orange"}}>
                                Retention</p>
                            <p style={{textAlign: "center", color: "white", fontSize: 13, marginTop: 10}}>
                                After the initial purchase, the goal is to keep customers engaged and satisfied with your brand. This is achieved through ongoing communication, personalized support, and proactive problem-solving. 
                            </p>
                        </div>
                    </div>
                    <div style={{width: "calc(20% - 3px)",  borderRadius: 8, background: "rgba(0,0,0,0.1)", cursor: "pointer"}}>
                        <div style={{padding: 20}}>
                            <p style={{fontSize: 16, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                                <i className="fa-solid fa-crown"></i>
                            </p>
                            <p style={{textAlign: "center", color: "orange"}}>
                                Loyalty</p>
                            <p style={{textAlign: "center", color: "white", fontSize: 13, marginTop: 10}}>
                                The final stage aims to transform satisfied customers into loyal advocates for your brand. This can be done through loyalty programs, exclusive offers, and exceptional customer service that fosters a strong emotional connection. 
                            </p>
                        </div>
                    </div>
                </div>
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
                                            <p onClick={()=>setSelectedCustomer(each)}
                                                style={{color: "white", fontSize: 13}}>
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
        }
    </div>
}

export default AgentCustomers;