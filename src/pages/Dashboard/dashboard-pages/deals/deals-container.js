
import PageNA from '../../../../components/page-not-available';
import NewDealPackageForm from './components/NewDealPackageForm';
import DealPackageInfo from './components/DealPackageInfo';
import DealsPackagesList from './components/DealsPackagesList';
import OtherInfo from './components/OtherInfo';
import { useState } from 'react';

let DealsContainer = (props)=>{

    const [selectedDealPackage, setSelectedDealPackage] = useState({});

    const viewDealPackageInfo = (staff) => {
        setSelectedDealPackage(staff);
    }
    window.__viewDealPackageInfo=viewDealPackageInfo;

    const unSelectDealPackage = () => {
        setSelectedDealPackage({});
    }

    return(
         <section id="deals-container" style={{display: "none"}}>
            {
                (selectedDealPackage?.id) ? 
                <div id="selected-staff-container">
                    <DealPackageInfo 
                        unSelectDealPackage={unSelectDealPackage}
                    />
                </div> :
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: "55%"}}>
                        <OtherInfo />
                        <DealsPackagesList
                            viewDealPackageInfo={viewDealPackageInfo}
                        />
                    </div>
                    <div style={{width: "calc(45% - 7px)"}}>
                        <NewDealPackageForm />
                    </div>
                </div>
            }
        </section>
    )
}

export default DealsContainer;