
import PageNA from '../../../../components/page-not-available';
import NewUserForm from '../../../../components/NewUserForm';
import StaffList from './components/StaffList';

let StaffContainer = ()=>{
    return(
         <section id="staff-container" style={{display: "none"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "55%"}}>
                    <StaffList />
                </div>
                <div style={{width: "calc(45% - 7px)"}}>
                    <NewUserForm />
                </div>
            </div>
        </section>
    )
}

export default StaffContainer;