import { useEffect, useState } from "react";

const SelectCustomersList = (props) => {

    const {
        userDetails,
        totalItems,
        PAGI_LIMIT,
        setpagiCurrentPage,
        pagiCurrentPage,
        customersList,
        loadCustomers,
        isAddNewCustomer,
        setIsAddNewCustomer,
        searchCustomerFieldOnInput,
        searchCustomerOnSubmit,
        searchCustomerQuery,
    } = props;

    useEffect(()=>{
        loadCustomers();
    }, [pagiCurrentPage]);

    
    const all_pages = [];
    let i=1;
    while(true){
        all_pages.push(i);
        if(i>=totalItems){
            break
        }
        i+=PAGI_LIMIT;
    }

    return <div>
        <p style={{color: "orange", fontSize: 13, marginBottom: 10}}>
            <i style={{marginRight: 10}} className='fa-solid fa-users'></i>
            Customers</p>
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
        <div style={{marginTop: 2, borderTop: "1px dashed rgba(0,0,0,0.5)"}}>
            {
                (customersList.length < 1) && <>
                    <div style={{display: "flex", padding: 20, margin: "10px 0", backgroundColor: "rgba(255,0,0,0.1)"}}>
                        <i style={{color: "yellow", marginRight: 10}}
                            className='fa-solid fa-exclamation-triangle'></i>
                        <p style={{color: "white", fontSize: 13}}>
                            You dont have any saved customers yet. You may add new customer or simply enter customer email on the right to send search link to customer!</p>
                    </div>
                    {
                        !isAddNewCustomer &&
                        <p onClick={()=>setIsAddNewCustomer(true)}
                            style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                            <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-plus'></i>
                            Create New Customer
                        </p>
                    }
                </>
            }
            {
                customersList?.map(each=>{
                    return <div style={{marginTop: 10, cursor: "pointer"}}>
                        <p style={{color: "white", fontSize: 13}}>
                            <input
                                type="checkbox" 
                                className="cm-toggle"
                                style={{marginRight: 10}}
                            />
                            <i style={{color: "yellow", marginRight: 10}}
                                className='fa-solid fa-user'></i>
                            {each?.first_name} {each?.last_name} - <span style={{color: "orange"}}>
                                {each?.email}
                            </span>
                        </p>
                    </div>
                })
            }
        </div>
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
}

export default SelectCustomersList;