import DragAndDropFileInput from "../../../../../components/DragAndDropFileInput";
import { useState } from "react";

const LegalComplianceDocuments = (props) => {

    const {
        previous_page_function,
    } = props;

    const _UPLOAD_SUB_PAGES = {
        required_documents: 1,
        certificate_documents: 2,
        insurance_documents: 3,
        other_documents: 4
    }

    const [ currentUploadPage, setCurrentUploadPage ] = useState(_UPLOAD_SUB_PAGES?.required_documents);

    return <div>
        <p onClick={previous_page_function}
                style={{color: "orange", cursor: "pointer", margin: 20, marginTop: 0, textDecoration: "underline"}}>
            <span>
                <i style={{color: "yellow", marginRight: 10}}
                    className="fa-solid fa-arrow-left"></i>
            </span>
            Go Back
        </p>
        <div className="main-seaction-containers">
            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                    className="fa-solid fa-file-contract"></i>
                Legal/Compliance Documents
            </p>
            <div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <div style={{width: "calc(50% - 3px)"}}>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Please select documents you have?</p>
                            <div style={{marginTop: 20}}>
                                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                    <input
                                        className="cm-toggle"
                                        id=""
                                        type="checkbox" />
                                    <span style={{marginLeft: 10, fontSize: 13}}>
                                        <label htmlFor="">
                                            <span style={{color: "skyblue"}}>IATA Number (required): </span> 
                                            This is the primary requirement for travel agents in New York who want to book flights and earn commissions. 
                                        </label>
                                    </span>
                                </p>
                                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                    <input
                                        className="cm-toggle"
                                        id=""
                                        type="checkbox" />
                                    <span style={{marginLeft: 10, fontSize: 13}}>
                                        <label htmlFor="">
                                            <span style={{color: "skyblue"}}>IATA Number (required): </span> 
                                            This is the primary requirement for travel agents in New York who want to book flights and earn commissions. 
                                        </label>
                                    </span>
                                </p>
                                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                    <input
                                        className="cm-toggle"
                                        id=""
                                        type="checkbox" />
                                    <span style={{marginLeft: 10, fontSize: 13}}>
                                        <label htmlFor="">
                                            <span style={{color: "skyblue"}}>IATA Number (required): </span> 
                                            This is the primary requirement for travel agents in New York who want to book flights and earn commissions. 
                                        </label>
                                    </span>
                                </p>
                                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                    <input
                                        className="cm-toggle"
                                        id=""
                                        type="checkbox" />
                                    <span style={{marginLeft: 10, fontSize: 13}}>
                                        <label htmlFor="">
                                            <span style={{color: "skyblue"}}>IATA Number (required): </span> 
                                            This is the primary requirement for travel agents in New York who want to book flights and earn commissions. 
                                        </label>
                                    </span>
                                </p>
                                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                    <input
                                        className="cm-toggle"
                                        id=""
                                        type="checkbox" />
                                    <span style={{marginLeft: 10, fontSize: 13}}>
                                        <label htmlFor="">
                                            <span style={{color: "skyblue"}}>IATA Number (optional): </span> 
                                            This is the primary requirement for travel agents in New York who want to book flights and earn commissions. 
                                        </label>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: "calc(50% - 3px)"}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13, marginBottom: 10}}>
                            <i className="fa-solid fa-folder-open" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Upload Documents
                        </p>
                        <div style={{display: "flex", marginBottom: 10}}>
                            <div onClick={()=>setCurrentUploadPage(_UPLOAD_SUB_PAGES?.required_documents)} style={{fontSize: 12, cursor: "pointer", margin: 10, color: currentUploadPage===_UPLOAD_SUB_PAGES?.required_documents ? "orange" : "rgba(255,255,255,0.5)", textDecoration: currentUploadPage===_UPLOAD_SUB_PAGES?.required_documents ? "underline" : "none"}}>
                                <i style={{marginRight: 10}} className="fa-solid fa-asterisk"></i>
                                Required
                            </div>
                            <div onClick={()=>setCurrentUploadPage(_UPLOAD_SUB_PAGES?.certificate_documents)} style={{fontSize: 12, cursor: "pointer", margin: 10, color: currentUploadPage===_UPLOAD_SUB_PAGES?.certificate_documents ? "orange" : "rgba(255,255,255,0.5)", textDecoration: currentUploadPage===_UPLOAD_SUB_PAGES?.certificate_documents ? "underline" : "none"}}>
                                <i className="fa-solid fa-medal" style={{marginRight: 10}}></i>
                                Certificate(s)
                            </div>
                            <div onClick={()=>setCurrentUploadPage(_UPLOAD_SUB_PAGES?.insurance_documents)} style={{fontSize: 12, cursor: "pointer", margin: 10, color: currentUploadPage===_UPLOAD_SUB_PAGES?.insurance_documents ? "orange" : "rgba(255,255,255,0.5)", textDecoration: currentUploadPage===_UPLOAD_SUB_PAGES?.insurance_documents ? "underline" : "none"}}>
                                <i className="fa-solid fa-shield-halved" style={{marginRight: 10}}></i>
                                Insurance(s)
                            </div>
                            <div onClick={()=>setCurrentUploadPage(_UPLOAD_SUB_PAGES?.other_documents)} style={{fontSize: 12, cursor: "pointer", margin: 10, color: currentUploadPage===_UPLOAD_SUB_PAGES?.other_documents ? "orange" : "rgba(255,255,255,0.5)", textDecoration: currentUploadPage===_UPLOAD_SUB_PAGES?.other_documents ? "underline" : "none"}}>
                                <i className="fa-solid fa-file" style={{marginRight: 10}}></i>
                                Other(s)
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                            <p style={{fontSize: 13, marginBottom: 10, color: "skyblue"}}>IATA Number (required)</p>
                            <DragAndDropFileInput 
                                input_elem_id="doc_1_input"
                                onFilesSelected={()=>{}} />
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                            <p style={{fontSize: 13, marginBottom: 10, color: "skyblue"}}>IATA Number (required)</p>
                            <DragAndDropFileInput 
                                input_elem_id="doc_2_input"
                                onFilesSelected={()=>{}} />
                        </div>
                        <div>
                            <div style={{marginTop: 5}} className="standard-action-button">
                                Upload
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default LegalComplianceDocuments;