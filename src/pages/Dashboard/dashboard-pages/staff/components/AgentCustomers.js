import { useEffect, useState } from "react";
import { fetchCustomersByAgentId } from "../../../../../services/customerServices";
import CustomerForm from "../../../../../components/CustomerForm";

const AgentCustomers = (props) => {

    const {
        userDetails
    } = props;

    const [customersList, setCustomersList ] = useState([]);

    useEffect(()=>{
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        let __customers = await fetchCustomersByAgentId(userDetails?._id);
        setCustomersList(__customers);
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
                            (customersList?.length < 1) && <>
                                <div style={{display: "flex", padding: 20, margin: "10px 0", backgroundColor: "rgba(255,0,0,0.1)"}}>
                                    <i style={{color: "yellow", marginRight: 10}}
                                        className='fa-solid fa-exclamation-triangle'></i>
                                    <p style={{color: "white", fontSize: 13}}>
                                        You dont have any saved customers yet. You may add new customer or simply enter customer email on the right to send search link to customer!</p>
                                </div>
                                <p style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                                    <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-address-card'></i>
                                    Open Extended New Customer Form
                                </p>
                            </>
                        }
                        {
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
                                        <span className="tool-tip-parent" style={{color: "lightgreen", cursor: "pointer", marginLeft: 5, marginRight: 20, cursor: "pointer"}}>
                                            <i className="fa-solid fa-pencil"></i>
                                            <span style={{color: "black", fontSize: 13, textAlign: 'center'}}
                                                className="tool-tip">
                                                Edit Customer
                                            </span>
                                        </span>

                                        <span className="tool-tip-parent" style={{color: "red", cursor: "pointer", cursor: "pointer"}}>
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
                        userDetails={userDetails}
                        successCallBack={loadCustomers}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default AgentCustomers;