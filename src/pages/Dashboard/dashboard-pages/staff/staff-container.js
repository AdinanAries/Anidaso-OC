
import PageRestricted from '../../../../components/page-restricted';
import NewUserForm from '../../../../components/NewUserForm';
import StaffList from './components/StaffList';
import StaffInfo from './components/StaffInfo';
import { useState } from 'react';
import UserPrivileges from './components/UserPrivileges';
import { fetchUserById } from '../../../../services/accountServices';
import CONSTANTS from '../../../../constants/Constants';

let StaffContainer = (props)=>{

    const {
        userDetails,
        setUserDetails,
        servicePlanTiersList
    } = props;

    const _pageConstant=CONSTANTS.app_page_constants.staff;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    const [selectedStaff, setSelectedStaff] = useState({});
    const [showAddNewUserForm, setshowAddNewUserForm ] = useState(false);

    const viewStaffInfo = async (user_id) => {
        let usr = await fetchUserById(user_id);
        setSelectedStaff(usr);
    }
    window.__viewStaffInfo=viewStaffInfo;

    const unSelectStaff = () => {
        setSelectedStaff({});
    }

    const showNewUserForm = (boolean_param) => {
        setshowAddNewUserForm(boolean_param)
    }

    let isLoggedUserOwner = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.owner);
    let isLoggedUserAdmin = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.admin);
    let isLoggedUserAgent = (userDetails?.role_info?.constant===CONSTANTS.app_role_constants.agent);
    if(isLoggedUserAgent){
        // Automatically Showing Selected User Detials Form
        if(!selectedStaff?._id)
            viewStaffInfo(userDetails?._id);
    }

    return(
         <section id="staff-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <>
                    {
                        (selectedStaff?._id) ? 
                        <div id="selected-staff-container">
                            <StaffInfo 
                                unSelectStaff={unSelectStaff}
                                selectedStaff={selectedStaff}
                                setSelectedStaff={setSelectedStaff}
                                loggedInUserDetails={userDetails}
                                setUserDetails={setUserDetails}
                                isLoggedUserAgent={isLoggedUserAgent}
                                isLoggedUserOwner={isLoggedUserOwner}
                                isLoggedUserAdmin={isLoggedUserAdmin}
                                servicePlanTiersList={servicePlanTiersList}
                            />
                        </div> : ((isLoggedUserAdmin || isLoggedUserOwner) &&
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div style={{width: "55%"}}>
                                    <StaffList
                                        viewStaffInfo={viewStaffInfo}
                                    />
                                </div>
                                <div style={{width: "calc(45% - 7px)"}}>
                                    {
                                        showAddNewUserForm ? 
                                        <>
                                            <div style={{color: "white", margin: 20, cursor: "pointer", fontSize: 13}} onClick={()=>showNewUserForm(false)}>
                                                <i style={{marginRight: 10, color: "lightgreen"}} className="fa fa-arrow-left"></i>
                                                Back to User Roles
                                            </div>
                                            <NewUserForm 
                                                showNewUserForm={showNewUserForm}
                                            /> 
                                        </>: 
                                        <UserPrivileges
                                            showNewUserForm={showNewUserForm}
                                        />
                                    }
                                </div>
                            </div>
                        )
                    }
                </>
            }
        </section>
    );
}

export default StaffContainer;