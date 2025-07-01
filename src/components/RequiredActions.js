import { useState } from "react";

const RequiredActions = (props) => {

    const [ isMinimizedWindow, setIsMinimizedWindow ] = useState(false);

    return <div style={{padding: 20, backgroundColor: "white", borderRadius: 8}}>
        <h4>
            <i style={{marginRight: 10, color: "crimson"}}
                className="fa-solid fa-exclamation-triangle"></i>
            Action(s) Required! <span onClick={()=>setIsMinimizedWindow(!isMinimizedWindow)}
                style={{color: "green", fontWeight: "initial", cursor: "pointer", marginLeft: 30, fontSize: 13, textDecoration: "underline"}}>
                {
                    isMinimizedWindow ? "See Details" : "Minimize Window"
                }
                <span>
                    <i style={{color: "rgba(0,0,0,0.5)", marginLeft: 10}}
                        className={"fa-solid fa-angle-" + (isMinimizedWindow ? "down" : "up")}></i>
                </span>
            </span>
        </h4>
        {
            !isMinimizedWindow &&
            <div style={{marginTop: 10}}>
                <div style={{display: "flex"}}>
                    <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                        <p style={{fontSize: 13, fontWeight: "bolder"}}>
                            <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-file-contract"></i>
                            Business Compliance</p>
                        <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
                        </p>
                        <p style={{cursor: "pointer", color: "green", textDecoration: "underline", marginTop: 15}}>
                            Take Action
                            <i style={{marginLeft: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                    <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                        <p style={{fontSize: 13, fontWeight: "bolder"}}>
                            <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-file-contract"></i>
                            Business Compliance</p>
                        <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
                        </p>
                        <p style={{cursor: "pointer", color: "green", textDecoration: "underline", marginTop: 15}}>
                            Take Action
                            <i style={{marginLeft: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                    <div style={{margin: "0 2px", width: "calc(33.3% - 6px)", maxWidth: 400, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: 20}}>
                        <p style={{fontSize: 13, fontWeight: "bolder"}}>
                            <i style={{marginRight: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-file-contract"></i>
                            Business Compliance</p>
                        <p style={{fontSize: 12, marginTop: 10, color: "rgba(0,0,0,0.8)"}}>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words
                        </p>
                        <p style={{cursor: "pointer", color: "green", textDecoration: "underline", marginTop: 15}}>
                            Take Action
                            <i style={{marginLeft: 10, fontSize: 16, color: "rgba(0,0,0,0.5)"}} className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default RequiredActions;