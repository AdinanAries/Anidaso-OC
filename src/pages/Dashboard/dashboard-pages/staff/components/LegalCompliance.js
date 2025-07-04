import LegalComplianceDocuments from "./LegalComplianceDocuments";
import { useState } from "react";

const LegalCompliance = (props) => {

    const {
        userDetails,
    } = props;

    const [ showUploadDocumentsPage, setShowUploadDocumentsPage ] = useState(false);
    const [ pageData, setPageData ] = useState({
        business_country: "",
        business_state: "",
        business_town: "",
        business_entity_type: "",
        business_entity_id_number: "",
        primary_agent_date_of_birth: "",
        primary_agent_education_qualification: "",
        primary_agent_has_computer_skills: false,
        certifications: [],
        licenses: [],
        insurances: [],
        required_documents: [
            {
                type: "", // e.g. certificate, license, insurance, etc.
                title: "",
                download_link: "",
            }
        ],
        certificate_documents: [
            {
                type: "",
                title: "",
                download_link: "",
            }
        ],
        insurance_documents: [
            {
                type: "",
                title: "",
                download_link: "",
            }
        ],
        other_documents: [
            {
                type: "",
                title: "",
                download_link: "",
            }
        ]
    });

    const hideDocumentPage = () => {
        setShowUploadDocumentsPage(false);
    }

    const businessCountryOnInput = (e) => {
        setPageData({
            ...pageData,
            business_country: e.target.value,
        })
    }
    const businessStateOnInput = (e) => {
        setPageData({
            ...pageData,
            business_state: e.target.value,
        })
    }
    const businessTownOnInput = (e) => {
        setPageData({
            ...pageData,
            business_town: e.target.value,
        })
    }
    const businessEntityTypeOnInput = (e) => {
        setPageData({
            ...pageData,
            business_entity_type: e.target.value,
        })
    }
    const businessEntityIdNumberOnInput = (e) => {
        setPageData({
            ...pageData,
            business_entity_id_number: e.target.value,
        })
    }
    const primaryAgentDateOfBirthOnInput = (e) => {
        setPageData({
            ...pageData,
            primary_agent_date_of_birth: e.target.value,
        })
    }
    const primaryAgentEducationQualificationOnInput = (e) => {
        setPageData({
            ...pageData,
            primary_agent_education_qualification: e.target.value,
        })
    }
    const primaryAgentHasComputerSkillsOnInput = (true_false) => {
        setPageData({
            ...pageData,
            primary_agent_has_computer_skills: true_false,
        })
    }

    const certificationsOnInput = (certification) => {
        let __certifications = pageData?.certifications;
        if(__certifications.includes(certification)){
            __certifications = __certifications.filter(each=>each!==certification);
        }else{
            __certifications.push(certification);
        }
        setPageData({
            ...pageData,
            certifications: __certifications,
        })
    }

    const licensesOnInput = (license) => {
        let __licenses = pageData?.licenses;
        if(__licenses.includes(license)){
            __licenses = __licenses.filter(each=>each!==license);
        }else{
            __licenses.push(license);
        }
        setPageData({
            ...pageData,
            licenses: __licenses,
        })
    }

    const insurancesOnInput = (insurance) => {
        let __insurances = pageData?.insurances;
        if(__insurances.includes(insurance)){
            __insurances = __insurances.filter(each=>each!==insurance);
        }else{
            __insurances.push(insurance);
        }
        setPageData({
            ...pageData,
            insurances: __insurances,
        })
    }

    return <div>
        {
            !showUploadDocumentsPage ?
            <div style={{paddingTop: 30}} className="main-seaction-containers">
                <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
                    <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                        className="fa-solid fa-file-contract"></i>
                    Legal Compliance <span onClick={()=>setShowUploadDocumentsPage(true)}
                        style={{color: "orange", cursor: "pointer", marginLeft: 20, textDecoration: "underline"}}>
                        <span>
                            <i style={{color: "yellow", marginRight: 10}}
                                className="fa-solid fa-exclamation-triangle"></i>
                        </span>
                        Click here to submit required documents <span style={{color: "red", fontWeight: "initial"}}>
                            (Action Required)</span>
                    </span>
                </p>
                <div style={{padding: 10, border: "2px dashed lightgreen", display: "flex", backgroundColor: "rgba(0,0,0,0.2)", position: "relative"}}>
                    <span>
                        <i style={{color: "lightgreen", marginRight: 10}} className="fa-solid fa-info" ></i>
                    </span>
                    <span style={{fontSize: 13, color: "white"}}>
                        To start using this software, you'll need to register your business, obtain necessary licenses and permits, and secure appropriate insurance. Specific requirements vary by country and state, but generally include registering your business entity (like an LLC), obtaining a business license, and potentially a "Seller of Travel" license in states like California, Florida, Washington, Hawaii, and Iowa. Additionally, you'll need to establish a website, integrate the website with this software platform, and develop a marketing strategy. 
                    </span>
                </div>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                    <div style={{width: "calc(50% - 3px)"}}>
                        <div style={{marginTop: 20}}>
                            <p style={{fontSize: 13, color: "orange", marginBottom: 10}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-globe"></i>
                                Business Location
                            </p>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa-solid fa-earth-americas" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Country</p>
                                <div style={{border: "none"}}>
                                    <select onInput={businessCountryOnInput}
                                        value={pageData?.business_country}
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        <option value="usa"
                                            style={{color: "black"}}>USA</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-city" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    City/State</p>
                                <div style={{border: "none"}}>
                                    <select onInput={businessStateOnInput}
                                        value={pageData?.business_state}
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        <option value="new york"
                                            style={{color: "black"}}>New York</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-city" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Town (Optional)</p>
                                <div style={{border: "none"}}>
                                    <select onInput={businessTownOnInput}
                                        value={pageData?.business_town}
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        <option value="new york"
                                            style={{color: "black"}}>New York</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: 20}}>
                            <p style={{fontSize: 13, color: "orange", marginBottom: 10}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-building"></i>
                                Business Entity
                            </p>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa-solid fa-briefcase" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Entity Type</p>
                                <div style={{border: "none"}}>
                                    <select onInput={businessEntityTypeOnInput}
                                        value={pageData?.business_entity_type}
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        <option value="llc"
                                            style={{color: "black"}}>LLC</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-id-card" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Business Entity Number (e.g. EIN)</p>
                                <div style={{border: "none"}}>
                                    <input onInput={businessEntityIdNumberOnInput}
                                        value={pageData?.business_entity_id_number}
                                        type="text" placeholder="type here..."  
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: 20}}>
                            <p style={{fontSize: 13, color: "orange", marginBottom: 10}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-medal"></i>
                                Training and Certification
                            </p>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa-solid fa-calendar-alt" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Date of Birth</p>
                                <div style={{border: "none"}}>
                                    <input onInput={primaryAgentDateOfBirthOnInput}
                                        value={pageData?.primary_agent_date_of_birth}
                                        type="text" placeholder="type here..."  
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}/>
                                </div>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa-solid fa-briefcase" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Education</p>
                                <div style={{border: "none"}}>
                                    <select onInput={primaryAgentEducationQualificationOnInput}
                                        value={pageData?.primary_agent_education_qualification}
                                        style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                        <option value="diploma"
                                            style={{color: "black"}}>High school diploma or equivalent</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                    <input onInput={()=>primaryAgentHasComputerSkillsOnInput(!pageData?.primary_agent_has_computer_skills)}
                                        checked={pageData?.primary_agent_has_computer_skills}
                                        className="cm-toggle"
                                        id="legal_compliance_page_agent_computer_literacy_check"
                                        type="checkbox" />
                                    <span style={{marginLeft: 10, fontSize: 13}}>
                                        <label htmlFor="legal_compliance_page_agent_computer_literacy_check">
                                            <span style={{color: "skyblue"}}>Computer Skills: </span> 
                                            Proficiency in using computers and reservation systems.
                                        </label>
                                    </span>
                                </p>
                            </div>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    Other Certificate(s)</p>
                                <div style={{marginTop: 20}}>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>certificationsOnInput("Airlines Reporting Corporation Accreditation")}
                                            checked={pageData?.certifications?.includes("Airlines Reporting Corporation Accreditation")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_arc_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_arc_check">
                                                <span style={{color: "skyblue"}}>ARC Accreditation (Airlines Reporting Corporation): </span>
                                                Accreditation from ARC can provide recognition and opportunities for travel agents in the US. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>certificationsOnInput("Certified Travel Associate")}
                                            checked={pageData?.certifications?.includes("Certified Travel Associate")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_cta_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_cta_check">
                                                <span style={{color: "skyblue"}}>Certified Travel Associate (CTA): </span>
                                                Earned after 18 months of industry experience and passing an exam.  
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>certificationsOnInput("Certified Travel Counselor")}
                                            checked={pageData?.certifications?.includes("Certified Travel Counselor")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_ctc_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_ctc_check">
                                                <span style={{color: "skyblue"}}>Certified Travel Counselor (CTC)</span>
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>certificationsOnInput("Certified Travel Industry Executive")}
                                            checked={pageData?.certifications?.includes("Certified Travel Industry Executive")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_ctie_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_ctie_check">
                                                <span style={{color: "skyblue"}}>Certified Travel Industry Executive (CTIE)</span>
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>certificationsOnInput("CLIA Certifications")}
                                            checked={pageData?.certifications?.includes("CLIA Certifications")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_clia_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_clia_check">
                                                <span style={{color: "skyblue"}}>CLIA Certifications: </span>
                                                Cruise Line International Association offers various levels of certification.   
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>certificationsOnInput("The Travel Institute's programs")}
                                            checked={pageData?.certifications?.includes("The Travel Institute's programs")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_ttip_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_ttip_check">
                                                <span style={{color: "skyblue"}}>The Travel Institute's programs: </span>
                                                Offers certification and continuing education.
                                            </label>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: "calc(50% - 3px)"}}>
                        <div style={{marginTop: 20}}>
                            <p style={{fontSize: 13, color: "orange", marginBottom: 10}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-signature"></i>
                                Business License(s)
                            </p>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    What license(s) do you have?</p>
                                <div style={{marginTop: 20}}>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>licensesOnInput("IATA Number")}
                                            checked={pageData?.licenses?.includes("IATA Number")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_iata_number_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_iata_number_check">
                                                <span style={{color: "skyblue"}}>IATA Number: </span> 
                                                This is the primary requirement for travel agents in New York who want to book flights and earn commissions. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>licensesOnInput("Seller of Travel Registration")}
                                            checked={pageData?.licenses?.includes("Seller of Travel Registration")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_sotr_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_sotr_check">
                                                <span style={{color: "skyblue"}}>Seller of Travel Registration: </span> 
                                                While not required in New York, some states have "Seller of Travel" laws and registration requirements, particularly if you plan to operate in those states. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>licensesOnInput("Business Licenses")}
                                            checked={pageData?.licenses?.includes("Business Licenses")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_lbl_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_lbl_check">
                                                <span style={{color: "skyblue"}}>Business Licenses: </span> 
                                                You may need to obtain local business licenses, depending on your specific business structure and location. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>licensesOnInput("Insurance Agent License")}
                                            checked={pageData?.licenses?.includes("Insurance Agent License")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_ial_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_ial_check">
                                                <span style={{color: "skyblue"}}>Insurance Agent License: </span> 
                                                If you plan to sell travel insurance, you will need to be licensed as an insurance agent in New York. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>licensesOnInput("Certifications")}
                                            checked={pageData?.licenses?.includes("Certifications")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_other_certs_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_other_certs_check">
                                                <span style={{color: "skyblue"}}>Certifications: </span> 
                                                While not mandatory, certifications from organizations like ASTA (American Society of Travel Advisors) or IATA can be beneficial for building credibility and expanding your business. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>licensesOnInput("Host Agency")}
                                            checked={pageData?.licenses?.includes("Host Agency")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_host_agency_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_host_agency_check">
                                                <span style={{color: "skyblue"}}>Host Agency: </span> 
                                                Many independent travel agents partner with a host agency, which provides access to booking systems, training, and often helps secure the IATA number. 
                                            </label>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: 20}}>
                            <p style={{fontSize: 13, color: "orange", marginBottom: 10}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa-solid fa-shield-halved"></i>
                                Business Insurance
                            </p>
                            <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 8}}>
                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                    <i className="fa fa-list-check" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    What insurance(s) do you have?</p>
                                <div style={{marginTop: 20}}>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>insurancesOnInput("Errors and Omissions (E&O) Insurance")}
                                            checked={pageData?.insurances?.includes("Errors and Omissions (E&O) Insurance")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_e&o_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_e&o_check">
                                                <span style={{color: "skyblue"}}>Errors and Omissions (E&O) Insurance: </span> 
                                                    This is the most crucial type of insurance for travel agents, as it covers financial losses, legal fees, and defense costs associated with claims of professional mistakes, negligence, or inaccurate advice. For example, if a travel agent books a flight that arrives after the wedding ceremony, E&O insurance could help cover the costs associated with the client's claim
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>insurancesOnInput("General Liability Insurance")}
                                            checked={pageData?.insurances?.includes("General Liability Insurance")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_glins_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_glins_check">
                                                <span style={{color: "skyblue"}}>General Liability Insurance: </span> 
                                                This policy protects the agency from claims of bodily injury or property damage to third parties. For example, if a client trips and falls in the agency's office, general liability insurance could cover their medical expenses and any legal costs if they sue
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>insurancesOnInput("Business Owner's Policy (BOP)")}
                                            checked={pageData?.insurances?.includes("Business Owner's Policy (BOP)")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_bop_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_bop_check">
                                                <span style={{color: "skyblue"}}>Business Owner's Policy (BOP): </span> 
                                                A BOP combines general liability and commercial property insurance into one convenient package. It covers the physical assets of the business, like the office space and equipment, and protects against risks like fire or theft
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>insurancesOnInput("Workers' Compensation Insurance")}
                                            checked={pageData?.insurances?.includes("Workers' Compensation Insurance")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_wci_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_wci_check">
                                                <span style={{color: "skyblue"}}>Workers' Compensation Insurance: </span> 
                                                If the travel agency employs staff, this insurance is usually required. It provides coverage for employees injured on the job, covering lost wages and medical expenses
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>insurancesOnInput("Cyber Insurance")}
                                            checked={pageData?.insurances?.includes("Cyber Insurance")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_cbri_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_cbri_check">
                                                <span style={{color: "skyblue"}}>Cyber Insurance: </span> 
                                                In today's digital age, cyber insurance is increasingly important to protect against data breaches, hacking, and other cyberattacks that could compromise sensitive client information. 
                                            </label>
                                        </span>
                                    </p>
                                    <p style={{color: "white", margin: "10px 0", display: "flex"}}>
                                        <input onInput={()=>insurancesOnInput("Other potential coverages")}
                                            checked={pageData?.insurances?.includes("Other potential coverages")}
                                            className="cm-toggle"
                                            id="legal_compliance_page_opcvrg_check"
                                            type="checkbox" />
                                        <span style={{marginLeft: 10, fontSize: 13}}>
                                            <label htmlFor="legal_compliance_page_opcvrg_check">
                                                <span style={{color: "skyblue"}}>Other potential coverages: </span> 
                                                Depending on the specific needs of the agency, other types of insurance may be considered, such as non-owned & hired auto liability (for transportation arrangements) or personal injury liability (for claims of libel or slander).
                                            </label>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="standard-action-button">
                        Save
                    </div>
                </div>
            </div> :
            <LegalComplianceDocuments
                previous_page_function={hideDocumentPage} 
            />
        }
    </div>;
}

export default LegalCompliance;