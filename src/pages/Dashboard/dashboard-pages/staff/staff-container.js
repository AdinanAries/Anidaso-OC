
import PageNA from '../../../../components/page-not-available';
import NewUserForm from '../../../../components/NewUserForm';
import StaffList from './components/StaffList';
import StaffInfo from './components/StaffInfo';
import { useState } from 'react';
import UserPrivileges from './components/UserPrivileges';

let StaffContainer = ()=>{

    const [selectedStaff, setSelectedStaff] = useState({});
    const [showAddNewUserForm, setshowAddNewUserForm ] = useState(false);

    const viewStaffInfo = (staff) => {
        setSelectedStaff(staff);
    }
    window.__viewStaffInfo=viewStaffInfo;

    const unSelectStaff = () => {
        setSelectedStaff({});
    }

    const showNewUserForm = (boolean_param) => {
        setshowAddNewUserForm(boolean_param)
    }

    return(
         <section id="staff-container" style={{display: "none"}}>
            {
                (selectedStaff?.id) ? 
                <div id="selected-staff-container">
                    <StaffInfo 
                        unSelectStaff={unSelectStaff}
                    />
                </div> :
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
            }
        </section>
    );
}

export default StaffContainer;