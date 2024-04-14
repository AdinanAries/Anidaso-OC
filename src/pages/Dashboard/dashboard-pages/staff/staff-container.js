
import PageNA from '../../../../components/page-not-available';
import NewUserForm from '../../../../components/NewUserForm';
import StaffList from './components/StaffList';
import StaffInfo from './components/StaffInfo';
import { useState } from 'react';
import UserPrivileges from './components/UserPrivileges';

let StaffContainer = ()=>{

    const [selectedStaff, setSelectedStaff] = useState({});

    const viewStaffInfo = (staff) => {
        setSelectedStaff(staff);
    }
    window.__viewStaffInfo=viewStaffInfo;

    const unSelectStaff = () => {
        setSelectedStaff({});
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
                        <UserPrivileges />
                        <StaffList
                            viewStaffInfo={viewStaffInfo}
                        />
                    </div>
                    <div style={{width: "calc(45% - 7px)"}}>
                        <NewUserForm />
                    </div>
                </div>
            }
        </section>
    );
}

export default StaffContainer;