import { useState } from "react";

const SendEmail = (props) => {

    const {
        setIsAddNewCustomer,
        mailingList,
        setMailingList,
    } = props;

    const [ emailInput, setEmailInput ] = useState("");

    const addEmailToMailingList = () => {
        if(emailInput) {
            let cust = {
                email: emailInput,
                first_name: "",
                last_name: "",
            }
            let _list = mailingList?.filter(each=>each?.email !== emailInput);
            _list.push(cust);
            setMailingList(_list);
            setEmailInput("");
        }
    }

    const emailOnInput = (e) => {
        setEmailInput(e.target.value);
    }

    return <div>
        <div style={{padding: 10, backgroundColor: "white", marginBottom: 10}}>
            <h3 contentEditable={true} style={{padding: 10}}>
                (No Subject)
            </h3>
            <div style={{marginTop: 5, marginBottom: 10, display: "flex"}}>
                <p style={{fontSize: 13, marginRight: 5, color: "rgba(0,0,0,0.6)"}}>
                    to:
                </p>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {
                        mailingList?.map(each=>{
                            return <p className='tool-tip-parent' style={{fontSize: 12}}>
                                    <span style={{color: "rgba(0,0,0,0.4)"}}>
                                        {"<"}</span>
                                    {each?.email}
                                    <span style={{color: "rgba(0,0,0,0.4)"}}>
                                        {">"}</span>
                                    <span style={{textAlign: "center", top: 10}} className='tool-tip'>
                                        {each?.first_name} {each?.last_name}
                                        <i style={{color: "red", fontSize: 15, marginLeft: 10}}
                                            className='fa-solid fa-trash-can'></i>
                                    </span>
                                </p>
                            })
                        }
                        {
                            mailingList?.length < 1 &&
                            <p style={{fontSize: 12, color: "red"}}>
                                no emails added yet!</p>
                        }
                </div>
            </div>
            <div>
                <p style={{border: "3px dashed rgba(0,0,0,0.1)", fontSize: 12, marginBottom: 10, borderRadius: 9, color: "rgba(0,0,0,0.5)",
                        padding: 20, background: "rgba(0,0,0,0.1)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <i style={{marginRight: 10}} className='fa-solid fa-paperclip'></i>
                    drop files here
                </p>
                <p>
                    <span className='tool-tip-parent'>
                        <i style={{color: "rgba(0,0,0,0.7)", fontSize: 15, marginLeft: 10}}
                            className='fa-solid fa-paperclip'></i>
                        <span style={{textAlign: "center", top: 10, fontSize: 13}} className='tool-tip'>
                            Attach A file
                        </span>
                    </span>
                    <span className='tool-tip-parent'>
                        <i style={{color: "rgba(0,0,0,0.7)", fontSize: 15, marginLeft: 15}}
                            className='fa-solid fa-images'></i>
                        <span style={{textAlign: "center", top: 10, fontSize: 13}} className='tool-tip'>
                            Add Images
                        </span>
                    </span>
                </p>
            </div>
        </div>
        <div style={{padding: 20, borderRadius: 8, backgroundColor: "rgba(0,255,0,0.1)", marginBottom: 10}}>
            <p style={{color: "white", fontSize: 13, display: "flex"}}>
                <i style={{color: "lightgreen", marginRight: 10}} className='fa-solid fa-info-circle'></i>
                <span>
                    To send the search link to a customer, you must select a customer on the left side or enter customer email below or create new customer
                </span>  
            </p>
            <p onClick={()=>setIsAddNewCustomer(true)}
                style={{color: "skyblue", cursor: "pointer", textDecoration: "underline", marginTop: 10, fontSize: 14}}>
                <i style={{color: "rgba(255,255,255,0.6)", marginRight: 10}} className='fa-solid fa-plus'></i>
                Create New Customer
            </p>
        </div>
        <div>
            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                    <i className="fa fa-envelope" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                    Customer Email</p>
                <div style={{border: "none", display: "flex"}}>
                    <input onInput={emailOnInput}
                        value={emailInput}
                        type="email" placeholder="type here..."
                        style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                    <input onClick={addEmailToMailingList} 
                        style={{border: "none", padding: "10px 20px", backgroundColor: "lightgreen", cursor: "pointer", borderRadius: 50,}}
                        type="button" value="Add to list" />
                </div>
            </div>
        </div>
        <div style={{cursor: "pointer", backgroundColor: "yellow", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
            <i style={{marginRight: 10, fontSize: 14}} className="fa fa-check-square-o"></i>
            Send Email
        </div>
    </div>
}

export default SendEmail;