import { useState } from "react";
import FormErrorCard from "../../../../../components/FormErrorCard";

function NewDealPackageForm(props){

    return (
        <div>
            <div className="login_page_form_container" 
                style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden"}}>
                <p className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
                    <i className="fa fa-folder" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                    Please complete the form below to add new deal or package</p>
                <div style={{padding: "10px"}}>
                    <div style={{marginBottom: 5,}}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", 
                            width: "100%", height: 200, background: "rgba(0,0,0,0.2)", borderRadius: 8,
                            cursor: "pointer"}}>
                            <div>
                                <p style={{textAlign: "center"}}>
                                    <i style={{color: "orange", fontSize: 27}} className="fa fa-plus"></i>
                                </p>
                                <p style={{marginTop: 5, fontSize: 13, textAlign: "center", color: "rgba(255,255,255,0.6)"}}>
                                    add picture
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-tag" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Title</p>
                        <div style={{border: "none"}}>
                            <input 
                                type="text" placeholder="type here..."  
                                style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-money" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Price</p>
                        <div style={{border: "none"}}>
                            <input 
                                type="text" placeholder="type here..."  
                                style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Items</p>
                        <div style={{border: "none"}}>
                            <input 
                                type="text" placeholder="type here..."  
                                style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-user" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Type</p>
                        <div style={{border: "none"}}>
                            <select 
                                type="text"  
                                style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                <option>Package</option>
                                <option>Deal</option>
                            </select>
                        </div>
                    </div>
                    <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-user" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Description</p>
                        <div style={{border: "none"}}>
                            <textarea  
                                style={{fontSize: 14, width: "calc(100% - 20px)", minHeight: 130, padding: 10, background: "none", color: "white", border: "none"}}
                            >
                                type here...
                            </textarea>
                        </div>
                    </div>
                    {/*
                        formValidation.isError && <FormErrorCard 
                            message={formValidation.message} 
                            type={formValidation.type}
                        />
                    */}
                    <div>
                        <div onClick={()=>alert("here")} style={{color: "white", cursor: "pointer", backgroundColor: "rgb(24, 67, 98)", boxShadow: "0 0 5px rgba(0,0,0,0.5)", textAlign: "center", padding: 13, borderRadius: 50}}>
                            <i style={{marginRight: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"}} className="fa fa-check-square-o"></i>
                            Create
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewDealPackageForm;