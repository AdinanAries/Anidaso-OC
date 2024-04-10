import StaffListItem from "./StaffistItem";

const StaffList = (props) => {
    return <div style={{padding: "20px 10px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden"}}>
        <p  className="title-font-color-default" style={{padding: "0 20px", fontSize: 14, marginBottom: 10}}>
            <i className="fa fa-users" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
            Staff List</p>
        <div style={{marginTop: 20}}>
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
            <StaffListItem />
        </div>

    </div>
}

export default StaffList;