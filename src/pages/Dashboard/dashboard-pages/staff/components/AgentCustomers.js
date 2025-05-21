import { useEffect, useState } from "react";
import { fetchCustomersByAgentId } from "../../../../../services/customerServices";
import CustomerForm from "../../../../../components/CustomerForm";

const AgentCustomers = (props) => {

    const {
        userDetails
    } = props;

    const [customersList, setCustomersList ] = useState([]);
    const [ currentCustomer, setCurrentCustomer ] = useState({});

    useEffect(()=>{
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        let __customers = await fetchCustomersByAgentId(userDetails?._id);
        setCustomersList(__customers);
    }

    const customerOnDelete = (id) => {
        if(window.confirm("Do you want to delete customer?")){
            alert("Deleting Customer "+id);
        }
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
                        <input 
                            style={{background: "none", color: "white", border: "none", width: "calc(100% - 40px)"}}
                            placeholder="Enter customer here"
                        />
                        <div style={{background: "green", color: "white", padding: "10px 20px", borderRadius: 50, cursor: "pointer"}}>
                            Search
                        </div>
                    </div>
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

                                        <span onClick={()=>customerOnDelete(each?._id)}
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
                    {   
                        (customersList?.length > 0) &&
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