import { useEffect, useState } from "react";
import FormErrorCard from "../../../../../components/FormErrorCard";
import { 
    createNewServiceFee,
    fetchServiceFeesByAgentId
} from "../../../../../services/serviceFeeServices";
import { add_commas_to_number } from "../../../../../helpers/helper-functions";
import Logger from "../../../../../helpers/Logger";

const AgentServiceFees = (props) => {

    const {
        userDetails
    } = props

    const __PRODUCT_TYPE = {
        all_products: -1,
        flights: 0,
        stays: 1,
        cars: 2
    }

    const __PRODUCT_TYPE_NAMES = {
        "-1": "All Products",
        "0": "Flights",
        "1": "Stays",
        "2": "Cars" 
    }

    const [ currentProduct, setCurrentProduct ] = useState(__PRODUCT_TYPE?.all_products);
    const [ agentServiceFees, setAgentServiceFees ] = useState([]);
    const [ serviceFeeFormData, setServiceFeeFormData ] = useState({
        oc_user_id: userDetails?._id,
        product: -1, //-1 stands for all products
        name: "",
        price: "",
        enabled: true,
        deleted: false,
    });

    const [ isLoading, setIsLoading ] = useState(false);
    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    const resetFormValidation = () => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        });
    }

    useEffect(()=>{
        if(userDetails?._id){
            (async()=>{
                let __res = await fetchServiceFeesByAgentId(userDetails?._id);
                setAgentServiceFees(__res);
            })()
        }
    }, []);

    // Service Fees
    const newServiceFeeProductTypeOnInput = (e) => {
        resetFormValidation();
        setServiceFeeFormData({
            ...serviceFeeFormData,
            product: parseInt(e.target.value)
        });
        setCurrentProduct(parseInt(e.target.value));
    }

    const newServiceFeeNameOnInput = (e) => {
        resetFormValidation();
        setServiceFeeFormData({
            ...serviceFeeFormData,
            name: e.target.value
        });
    }

    const newServiceFeePriceOnInput = (e) => {
        resetFormValidation();
        setServiceFeeFormData({
            ...serviceFeeFormData,
            price: e.target.value
        });
    }

    const newServiceFeeOnSave = async () => {
        setIsLoading(true);
        if(
            !serviceFeeFormData?.name ||
            !serviceFeeFormData?.price
        ) {
            setFormValidation({
                type: "error",
                isError: true,
                message: "Name and Price fields are required!",
            });
            setIsLoading(false);
            return
        }

        let __res = await createNewServiceFee(serviceFeeFormData);
        if(__res?._id){
            alert("Service fee added/modified!");
            setAgentServiceFees([
                ...agentServiceFees,
                __res
            ]);
            setServiceFeeFormData({
                ...serviceFeeFormData,
                name: "",
                price: "",
                enabled: true,
                deleted: false,
            });
            setIsLoading(false);
            // Log Acivity
            Logger.log_activity(
                __res?.oc_user_id,
                {
                    title: `${__res?.name} service fee was added`,
                    body: `${__res?.name} service fee of $${__res?.price} was added for ${__PRODUCT_TYPE_NAMES[__res?.product]}.`,
                    resource_id: "",
                    resource_type: "Service Fee",
            });
        }
    }

    const toggleEnameServiceFeeOnClick = async (prop) => {
        for(const each of agentServiceFees){
            if(each?._id === prop.target.value){
                each.enabled=!each?.enabled;
                let __res = await createNewServiceFee(each);
            }
        }
        setAgentServiceFees([
            ...agentServiceFees,
        ]);
    }

    const onDeleteServiceFee = async (id) => {
        if (window?.confirm("Are you sure you want to delete this item?")) {
            for(const each of agentServiceFees){
                if(each?._id === id){
                    each.deleted=true;
                    let __res = await createNewServiceFee(each);
                    const index = agentServiceFees.findIndex(item => item?._id === id);
                    if (index > -1) {
                        agentServiceFees?.splice(index, 1);
                    }
                    // Log Acivity
                    Logger.log_activity(
                        __res?.oc_user_id,
                        {
                            title: `${each?.name} service fee was deleted`,
                            body: `${each?.name} service fee of $${each?.price} was deleted from ${__PRODUCT_TYPE_NAMES[each?.product]}.`,
                            resource_id: "",
                            resource_type: "Service Fee",
                    });
                }
            }
            setAgentServiceFees([
                ...agentServiceFees,
            ]);
        }
    }

    const onEditServiceFee = (id) => {
        const index = agentServiceFees.findIndex(item => item?._id === id);
        if (index > -1) {
            const __obj = agentServiceFees[index];
            setServiceFeeFormData({
                ...__obj,
                product: parseInt(__obj?.product)
            });
            agentServiceFees?.splice(index, 1);
        }
        setAgentServiceFees([
            ...agentServiceFees,
        ]);
    }
    
    return <div>
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20, marginTop: 30}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa-solid fa-sliders"></i>
            Service Fees
        </p>
        <div style={{marginBottom: 10}}>
            <p style={{padding: 20, display: "flex", background: "rgba(0,255,0, 0.2)", color: "white", border: "1px dashed lightgreen", fontSize: 13}}>
                <i style={{marginRight: 10, color: "lightgreen"}}
                    className="fa-solid fa-info-circle"></i>
                <span>
                    Services fees allow you to charge customers extra charges at checkout.
                    Please note that extra charges added here should be related to your business operations in order to gain your customer's trust. 
                    You can create, activate, or deactivate your sevice fees using this section.
                </span>
            </p> 
            <div style={{marginTop: 20, display: "flex"}}>
                <div style={{width: "calc(50% - 5px)"}}>
                    <div style={{marginBottom: 10}}>
                        <p style={{color: "orange", fontSize: 13}}>
                            Add/Edit Service Fee</p>
                        <div style={{padding: 10, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "33%"}}>
                                <p className="regular-font-color-dark-bg" 
                                    style={{fontSize: 13, marginBottom: 5}}>
                                        Product</p>
                                <select onInput={newServiceFeeProductTypeOnInput}
                                    value={serviceFeeFormData?.product} 
                                    style={{padding: "10px 20px", width: "100%", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                                    <option style={{color: "black"}}
                                        value={-1}>
                                        All
                                    </option>
                                    <option style={{color: "black"}}
                                        value={0}>
                                        Flights
                                    </option>
                                    <option style={{color: "black"}}
                                        value={1}>
                                        Stays
                                    </option>
                                    <option style={{color: "black"}}
                                        value={2}>
                                        Cars
                                    </option>
                                </select>
                            </div>
                            <div style={{width: "33%"}}>
                                <div style={{display: "flex"}}>
                                    <p className="regular-font-color-dark-bg" 
                                        style={{fontSize: 13, marginBottom: 5}}>
                                        Service Name</p>
                                </div>
                                <input onInput={newServiceFeeNameOnInput}
                                    value={serviceFeeFormData?.name}
                                    placeholder="enter name here..."
                                    style={{padding: "10px 20px", width: "100%", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                            </div>
                            <div style={{width: "33%"}}>
                                <div style={{display: "flex"}}>
                                    <p className="regular-font-color-dark-bg" 
                                        style={{fontSize: 13, marginBottom: 5}}>
                                        Price ($)</p>
                                </div>
                                <input onInput={newServiceFeePriceOnInput}
                                    value={serviceFeeFormData?.price}
                                    placeholder="select price here..."
                                    type="number"
                                    style={{padding: "10px 20px", width: "100%", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                            </div>
                        </div>
                        {
                            formValidation?.isError && <div style={{background: "rgba(255,0,0,0.2)", marginBottom: 10}}>
                                <FormErrorCard 
                                    message={formValidation.message} 
                                    type={formValidation.type}
                                />
                            </div>
                        }
                        {
                            isLoading ? <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                                fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                                <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                                Loading.. Please Wait
                            </div> :
                            <div onClick={newServiceFeeOnSave} className="standard-action-button"
                                style={{fontSize: 14, padding: 10, width: "100%", marginTop: 0, cursor: "pointer"}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-refresh"></i>
                                Save
                            </div>
                        }
                    </div>
                    <div style={{borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                        <div>
                            <div style={{display: "flex",  marginBottom: 5, backgroundColor: "black"}}>
                                <div onClick={()=>setCurrentProduct(__PRODUCT_TYPE?.all_products)}  
                                    style={{color: currentProduct===__PRODUCT_TYPE?.all_products ? "skyblue" : "grey", padding: 10, fontSize: 13, cursor: "pointer", textDecoration: "underline", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: currentProduct===__PRODUCT_TYPE?.all_products ? "yellow" : "rgba(255,255,255,0.5)"}} className="fa-solid fa-bars"></i>
                                    All Products
                                </div>
                                <div onClick={()=>setCurrentProduct(__PRODUCT_TYPE?.flights)}
                                    style={{color: currentProduct===__PRODUCT_TYPE?.flights ? "skyblue" : "grey", padding: 10, fontSize: 13, cursor: "pointer", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: currentProduct===__PRODUCT_TYPE?.flights ? "yellow" : "rgba(255,255,255,0.5)"}} className="fa-solid fa-plane"></i>
                                    Flights
                                </div>
                                <div onClick={()=>setCurrentProduct(__PRODUCT_TYPE?.stays)}
                                    style={{color: currentProduct===__PRODUCT_TYPE?.stays ? "skyblue" : "grey", padding: 10, fontSize: 13, cursor: "pointer", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: currentProduct===__PRODUCT_TYPE?.stays ? "yellow" : "rgba(255,255,255,0.5)"}} className="fa-solid fa-building"></i>
                                    Stays
                                </div>
                                <div onClick={()=>setCurrentProduct(__PRODUCT_TYPE?.cars)}
                                    style={{color: currentProduct===__PRODUCT_TYPE?.cars ? "skyblue" : "grey", padding: 10, fontSize: 13, cursor: "pointer", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: currentProduct===__PRODUCT_TYPE?.cars ? "yellow" : "rgba(255,255,255,0.5)"}} className="fa-solid fa-car"></i>
                                    Cars
                                </div>
                                <div onClick={()=>setCurrentProduct(__PRODUCT_TYPE?.cars)}
                                    style={{color: currentProduct===__PRODUCT_TYPE?.cars ? "skyblue" : "grey", padding: 10, fontSize: 13, cursor: "pointer", marginRight: 10}}>
                                    <i style={{marginRight: 10, color: currentProduct===__PRODUCT_TYPE?.cars ? "yellow" : "rgba(255,255,255,0.5)"}} className="fa-solid fa-box-open"></i>
                                    Travel Packages
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                                {
                                    agentServiceFees?.filter(service=>service?.product===currentProduct)?.map(each=>{
                                        return <div style={{margin: 2.5, width: "calc(50% - 5px)", backgroundColor: "rgba(0,0,0,0.2)", padding: 20, marginBottom: 2}}>
                                            <div style={{ display: "flex", justifyContent: "space-between"}}>
                                                <p>
                                                    <input onClick={toggleEnameServiceFeeOnClick}
                                                        type="checkbox" 
                                                        className="cm-toggle"
                                                        checked={each?.enabled}
                                                        value={each?._id}
                                                    />
                                                    <span style={{marginLeft: 10, color: "white", fontSize: 13}}>
                                                        <label htmlFor="">
                                                            {each?.name}
                                                        </label>
                                                    </span>
                                                </p>
                                                <p style={{color: "yellow", fontSize: 13}}>
                                                    ${each?.price}
                                                </p>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                                                <p style={{color: "rgba(255,255,255,0.5)", fontSize: 12}}>
                                                    Charged on {__PRODUCT_TYPE_NAMES[(""+each.product)]}
                                                </p>
                                                <p>
                                                    <span onClick={()=>onEditServiceFee(each?._id)} className="tool-tip-parent" style={{color: "lightgreen", cursor: "pointer", marginLeft: 5, marginRight: 20, cursor: "pointer"}}>
                                                        <i className="fa-solid fa-pencil"></i>
                                                        <span style={{color: "black", fontSize: 13, textAlign: 'center'}}
                                                            className="tool-tip">
                                                            Edit Service Fee
                                                        </span>
                                                    </span>
                                                    <span onClick={()=>onDeleteServiceFee(each?._id)}
                                                        className="tool-tip-parent" style={{color: "red", cursor: "pointer", cursor: "pointer"}}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <span style={{color: "black", fontSize: 13, textAlign: 'center'}}
                                                            className="tool-tip">
                                                            Delete Service Fee
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            {
                                (agentServiceFees?.length<1) && <div style={{backgroundColor: "rgba(255,0,0,0.1)", border: "1px solid red", padding: 20}}>
                                    <p style={{color: "white", fontSize: 13, textAlign: "center"}}>
                                        <i style={{color: "yellow", marginRight: 10}}
                                            className="fa-solid fa-exclamation-triangle"></i>
                                        No service fees added yet.
                                    </p>
                                </div>
                            }
                        </div>  
                    </div>
                </div>
                <div style={{width: "calc(50% - 5px)"}}>
                    <div>
                        <p style={{color: "yellow", fontSize: 13, marginLeft: 20}}>
                            Checkout Overview</p>
                        <div style={{backgroundColor: "white", padding: 20, margin: 10}}>
                            
                            <p style={{fontSize: 16, letterSpacing: 1, fontWeight: "bolder", fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.8)"}}>
                                Price Summary
                            </p>
                            <div style={{marginTop: 20, borderBottom: "1px solid rgba(0, 0, 0, 0.1)", paddingBottom: 10}}>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    <p style={{fontSize: 14, letterSpacing: 1, color: "rgba(0, 0, 0, 0.4)"}}>
                                        Total Purchases:</p>
                                    <p style={{fontSize: 14, letterSpacing: 1, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                        <span style={{fontSize: 14, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)", fontWeight: "bolder"}}>
                                        $</span>xxx.xx</p>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                    <p style={{fontSize: 14, letterSpacing: 1, color: "rgba(0, 0, 0, 0.4)"}}>
                                        Purchase Item</p>
                                    <p style={{fontSize: 14, letterSpacing: 1, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                        <span style={{fontSize: 14, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                            $</span>xxx.xx</p>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                    <p style={{fontSize: 14, letterSpacing: 1, color: "rgba(0, 0, 0, 0.4)"}}>
                                        Welldugo Fee (1)
                                    </p>
                                    <p style={{fontSize: 14, letterSpacing: 1, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                        <span style={{fontSize: 14, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                            $</span>x.xx
                                    </p>
                                </div>
                                {
                                    (agentServiceFees?.length<1) && <div style={{backgroundColor: "rgb(59, 0, 0)", border: "1px solid red", padding: 10, marginTop: 10}}>
                                        <p style={{color: "white", fontSize: 13, textAlign: "center"}}>
                                            <i style={{color: "yellow", marginRight: 10}}
                                                className="fa-solid fa-exclamation-triangle"></i>
                                            No service fees added yet.
                                        </p>
                                    </div>
                                }
                                {
                                    agentServiceFees?.filter(service=>((service?.product===currentProduct || service?.product===__PRODUCT_TYPE?.all_products) && service?.enabled))?.map(each=>{
                                        return <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                            <p style={{fontSize: 14, letterSpacing: 1, color: "rgba(0, 0, 0, 0.8)"}}>
                                                {each?.name}
                                            </p>
                                            <p style={{fontSize: 14, letterSpacing: 1, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.8)"}}>
                                                <span style={{fontSize: 14, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.8)"}}>
                                                    $</span>{each?.price}
                                            </p>
                                        </div>
                                    })
                                }
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                                    <p style={{fontSize: 14, letterSpacing: 1, color: "rgba(0, 0, 0, 0.4)"}}>
                                        Taxes
                                    </p>
                                    <p style={{fontSize: 14, letterSpacing: 1, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                        <span style={{fontSize: 14, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.4)"}}>
                                            $</span>xx.xx
                                    </p>
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                                <div>
                                    <p style={{fontSize: 16, letterSpacing: 1, color: "rgba(0, 0, 0, 0.8)", fontWeight: "bolder"}}>
                                        Total
                                    </p>
                                    <p style={{fontSize: 12, marginTop: 5, color: "rgba(0, 0, 0, 0.7)", fontFamily: "Prompt, sans-serif;"}}>
                                        <i className="fa fa-info" ariaHidden="true" style={{marginRight: 10, color: "green"}}>
                                            </i>prices are quoted in USD
                                    </p>
                                </div>
                                <p style={{fontSize: 17, fontWeight: "bolder", letterSpacing: 1, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.8)"}}>
                                    <span style={{fontSize: 14, fontFamily: "Prompt, sans-serif", color: "rgba(0, 0, 0, 0.7)", fontWeight: "bolder"}}>
                                        $</span>{
                                         add_commas_to_number((agentServiceFees?.filter(service=>
                                            ((service?.product===currentProduct || service?.product===__PRODUCT_TYPE?.all_products) && service?.enabled))
                                            ?.reduce((accumulator, current_elem) => accumulator + current_elem?.price, 0)))
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>
}

export default AgentServiceFees;