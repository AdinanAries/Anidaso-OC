const UserPrivileges = (props) => {

    const {
        showNewUserForm
    } = props

    return <div className="main-seaction-containers">
        <div>
            <div>
                <div style={{backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                        <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                        Please Select Role</p>
                    <div style={{border: "none"}}>
                        <select style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                            <option style={{color: "black"}} value="" >
                                Administrator
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div style={{marginTop: 20}}>
                <div>
                    <p style={{color: "white", fontSize: 13, marginBottom: 10}}>
                        <i style={{marginRight: 10, color: "skyblue"}} className="fa-solid fa-users-gear"></i> 
                        Administrator</p>
                        <div style={{background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, marginBottom: 4}}>
                            <p style={{color: "skyblue", fontSize: 13}}>
                                Menu Access</p>
                            <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Bookings</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Packages & Deals</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Support</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Sales</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Marketing</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Customers</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Analytics</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Channels</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Staff</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "32%"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Partners</label>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap",}}>
                        <div style={{background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, width: "calc(50% - 2px)", marginBottom: 4}}>
                            <p style={{color: "orange", fontSize: 13}}>
                                Account Management</p>
                            <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            View Users</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Add User</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Delete Account</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Edit Account</label>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style={{background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, width: "calc(50% - 2px)", marginBottom: 4}}>
                            <p style={{color: "orange", fontSize: 13}}>
                                Role Management</p>
                            <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            View Roles</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Add Role</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Delete Role</label>
                                        </span>
                                    </p>
                                </div>
                                <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                    <p style={{marginBottom: 10}}>
                                        <input type="checkbox" />
                                        <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                            <label>
                                            Edit Role</label>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div className="standard-action-button">
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                        New Role
                    </div>
                    <div onClick={()=>showNewUserForm(true)} className="standard-action-button" style={{backgroundColor: "green"}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-user-plus"></i>
                        New User
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default UserPrivileges;