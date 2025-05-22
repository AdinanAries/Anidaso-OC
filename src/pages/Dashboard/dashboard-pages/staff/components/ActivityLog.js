import { useEffect, useState } from "react";
import { fetchActivityLogByUserId } from "../../../../../services/activityServices";

const ActivityLog = (props) => {

    const {
        userDetails,
    } = props;

    const [ activityLogs, setActivityLogs ] = useState([]);

    useEffect(()=>{
        if(userDetails?._id){
            loadComponentData();
        }
    }, []);

    const loadComponentData = async () => {
        const __logs = await fetchActivityLogByUserId(userDetails?._id);
        setActivityLogs(__logs);
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
        <div className='app-standard-paginator theme-blend-bg-dark' style={{marginTop: 10}}>
            <div className='prev-next-btn inactive'>
                <i className='fa-solid fa-angle-left'></i></div>
            <div>1</div>
            <div className='prev-next-btn inactive'>
                <i className='fa-solid fa-angle-right'></i></div>
        </div>
    </div>
}

export default ActivityLog;