const UserPrivileges = (props) => {
    return <div className="main-seaction-containers">
        <div>
            <p className="title-font-color-default" style={{fontWeight: "bolder", fontSize: 12}}>
                User Privileges
            </p>
            <div>
                <div>

                </div>
                <div className="standard-action-button">
                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                    Add New Privilege
                </div>
            </div>
        </div>
    </div>
}

export default UserPrivileges;