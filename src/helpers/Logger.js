import { postLog, logError, logBookingError } from "../services/activityServices";
import CONSTANTS from "../constants/Constants";
import { getClient } from "./helper-functions";

const Logger = {
    /**
     * 
     * @param {*} type 
     */
    log_activity: async (
        user_id,
        msgObj={
            title: "",
            body: "",
            resource_id: "",
            resource_type: "",
        }, 
        type=CONSTANTS.log_types.activity
    ) => {
            let res;
            let client = await getClient();
            let post_obj = {
                user_id: user_id,
                client: client,
                title: msgObj.title,
                body: msgObj.body,
                resource_id: msgObj.resource_id,
                resource_type: msgObj.resource_type,
            }
            if(type===CONSTANTS.log_types.activity){
                post_obj.type=CONSTANTS.log_types.activity;
                res = await postLog(post_obj);
            }
            if(type===CONSTANTS.log_types.error){
                post_obj.type=CONSTANTS.log_types.error;
                res = await logError(post_obj);
            }
            if(type===CONSTANTS.log_types.booking_error){
                post_obj.type=CONSTANTS.log_types.error;
                res = await logBookingError(post_obj);
            }
            return res;
    },

    /**
     * 
     * 
     */
    alert_by_email: (
        msgObj={
            title: "",
            body: "",
        }, type="", activity_ref=null) => {

    },

    /**
     * 
     * 
     */
    alert_by_text: (
        msgObj={
            title: "",
            body: "",
        }, type="", activity_ref=null) => {

    },
    
}

export default Logger;