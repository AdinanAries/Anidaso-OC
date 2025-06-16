import { useEffect, useState } from "react";
import { fetchActivityLogByUserId } from "../../../../../services/activityServices";

const ActivityLog = (props) => {

    const {
        userDetails,
    } = props;

    const PAGI_LIMIT = 4;

    const [ activityLogs, setActivityLogs ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);

    useEffect(()=>{
        if(userDetails?._id){
            loadComponentData();
        }
    }, [pagiCurrentPage]);

    const loadComponentData = async () => {
        const __logs = await fetchActivityLogByUserId(userDetails?._id, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        if(Array.isArray(__logs))
            setActivityLogs(__logs);
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

    return <div>
        <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12, marginBottom: 20}}>
            <i style={{marginRight: 10, fontSize: 16, color: "rgba(255,255,255,0.5)"}} 
                className="fa fa-rectangle-list"></i>
            Activity Log
        </p>
        <div>
            {
                activityLogs?.map( each => {
                    return <div style={{padding: 10, marginBottom: 2, backgroundColor: "rgba(0,0,0,0.1)"}}>
                        <p style={{color: "rgba(255,255,255,0.8)", fontSize: 13}}>
                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} 
                                className="fa fa-history"></i>
                            {each?.title}:
                        </p>
                        <p style={{fontSize: 12, margin: 5, marginLeft: 25, color: "rgba(255,255,255,0.8)"}}>
                            {each?.body}
                            <span style={{color: "orange", fontSize: 12, marginLeft: 10}}>
                                - {each?.createdAt}
                            </span>
                        </p>
                    </div>
                })
            }
            {
                activityLogs.length < 1 && <div style={{padding: 20, backgroundColor: "rgba(255,0,0,0.2)"}}>
                    <p style={{color: "white", fontSize: 13, textAlign: "center"}}>
                        <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                        Nothing to show...
                    </p>
                </div>
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

export default ActivityLog;