
import PageNA from '../../../../components/page-not-available';
import NewUserForm from '../../../../components/NewUserForm';

let StaffContainer = ()=>{
    return(
         <section id="staff-container" style={{display: "none"}}>
            <NewUserForm />
            <PageNA />
        </section>
    )
}

export default StaffContainer;