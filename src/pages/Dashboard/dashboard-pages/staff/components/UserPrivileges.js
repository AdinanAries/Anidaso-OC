import { useEffect, useState } from "react";
import { fetchAppRoles, fetchAppPages } from "../../../../../services/accountServices";

const UserPrivileges = (props) => {

    const {
        showNewUserForm
    } = props

    const [appRoleState, setAppRoleState] = useState([]);
    const [selectedRole, setSelectedRole] = useState({});
    const [appPagesState, setAppPagesState] = useState([]);
    const [isCreateNewRole, setIsCreateNewRole] = useState(false);
    const [isCreateNewRolePrivilege, setIsCreateNewRoleRolePrivilege] = useState(false);

    useEffect(()=>{
        (async()=>{
            let _roles = await fetchAppRoles();
            let _pages = await fetchAppPages();
            setAppRoleState(_roles);
            setSelectedRole(_roles[0]);
            console.log(_roles);
            setAppPagesState(_pages);
        })()
    }, []);

    const appRoleOnInput = (e) => {
        let _rr=appRoleState.find(item=>item.constant===parseInt(e.target.value));
        setSelectedRole(_rr);
    }

    const appPageCheckBoxOnInput = (e) => {
        console.log(e.target.checked);
        console.log(e.target.value);
    }

    const openCloseCreateNewRoleForm = (boolean_p) => {
        setIsCreateNewRole(boolean_p)
    }

    const openCloseCreateNewRolePrivilegeForm = (boolean_p) => {
        setIsCreateNewRoleRolePrivilege(boolean_p)
    }

    return <div className="main-seaction-containers">
        <div>
            <div>
                {
                    isCreateNewRole ? 
                    (!isCreateNewRolePrivilege && <>
                        <p style={{color: "#a9ddff", fontSize: 13, margin: 10}}>
                            <i style={{marginRight: 10, color: "skyblue"}} className="fa-solid fa-cogs"></i> 
                            Create New Role</p>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-users" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Role Title</p>
                            <div style={{border: "none"}}>
                                <input
                                    type="text" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                        <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                            <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                <i className="fa fa-keyboard" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                Role Constant</p>
                            <div style={{border: "none"}}>
                                <input
                                    type="numeric" placeholder="type here..."
                                    style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                            </div>
                        </div>
                    </>) :
                    <div style={{backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                        <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                            <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                            Please Select Role</p>
                        <div style={{border: "none"}}>
                            <select onInput={appRoleOnInput} 
                                    value={selectedRole?.constant}
                                style={{fontSize: 14, width: "calc(100% - 20px)", padding: 10, background: "none", color: "white", border: "none"}}>
                                {
                                    appRoleState.map(each=>{
                                        return <option style={{color: "black"}} value={each?.constant} >
                                            {each?.title}
                                    </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                }
            </div>
            <div style={{marginTop: 20}}>
                {
                    isCreateNewRole ?
                    <div>
                        <p style={{color: "#a9ddff", fontSize: 13, marginBottom: 10}}>
                            <i style={{marginRight: 10, color: "skyblue"}} className="fa-solid fa-gear"></i> 
                            {isCreateNewRolePrivilege ? "Create Role Privileges" : "Set Role Privileges"}</p>
                        {
                            isCreateNewRolePrivilege ? <>
                                <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                        <i className="fa fa-users" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                        Privilege Title</p>
                                    <div style={{border: "none"}}>
                                        <input
                                            type="text" placeholder="type here..."
                                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}/>
                                    </div>
                                </div>
                            </> :
                            <>
                                <div style={{marginBottom: 5, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                        <i className="fa fa-list" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                        Privileges Type:</p>
                                    <div style={{border: "none"}}>
                                        <select
                                            type="text" placeholder="type here..."
                                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}>
                                                <option style={{color: "black"}} value="">Select Privilege Type</option>
                                        </select>
                                    </div>
                                </div>
                                <p onClick={()=>openCloseCreateNewRolePrivilegeForm(true)} style={{fontSize: 13, textDecoration: "underline", cursor: "pointer", color: "lightgreen", margin: "10px 0", padding: 20, background: "rgba(0,255,0,0.1)"}}>
                                    <i className="fa fa-plus" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    I want to create new custom privilege!
                                </p>
                            </>
                        }
                    </div> :
                    <div>
                        <p style={{color: "white", fontSize: 13, marginBottom: 10}}>
                            <i style={{marginRight: 10, color: "skyblue"}} className="fa-solid fa-users-gear"></i> 
                            {selectedRole?.title} Privileges</p>
                            <div style={{background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, marginBottom: 4}}>
                                <p style={{color: "skyblue", fontSize: 13}}>
                                    Menu Access</p>
                                <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                    {
                                        appPagesState.map(each=>{
                                            return <div style={{margin: 2.5, width: "32%"}}>
                                            <p style={{marginBottom: 10}}>
                                                <input id={each?._id} onInput={appPageCheckBoxOnInput}
                                                    value={each?._id} 
                                                    type="checkbox"
                                                />
                                                <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                                    <label htmlFor={each?._id}>
                                                    {each?.page_title}</label>
                                                </span>
                                            </p>
                                        </div>
                                        })
                                    }
                                    
                                    {/*<div style={{margin: 2.5, width: "32%"}}>
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
                                    </div>*/}
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
                }
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {
                        isCreateNewRole ?
                        <>
                        {
                            isCreateNewRolePrivilege ?
                            <div onClick={()=>openCloseCreateNewRolePrivilegeForm(false)} 
                                style={{color: "orange", textDecoration: "underline", fontSize: 14, marginTop: 40, marginLeft: 20, cursor: "pointer"}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-list"></i>
                                Select Privilege Instead
                            </div> :
                            <div onClick={()=>openCloseCreateNewRoleForm(false)} 
                                style={{color: "orange", marginTop: 40, marginLeft: 20, cursor: "pointer"}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-arrow-left"></i>
                                Back
                            </div>
                        }
                        </> :
                        <div onClick={()=>openCloseCreateNewRoleForm(true)} className="standard-action-button">
                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                            New Role
                        </div>
                    }
                    {
                        isCreateNewRole ?
                        <>
                            {
                                isCreateNewRolePrivilege ?
                                <div className="standard-action-button">
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-check"></i>
                                    Save Privilege
                                </div> :
                                <div className="standard-action-button">
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-check"></i>
                                    Save Role
                                </div>
                            }
                        </>:
                        <div onClick={()=>showNewUserForm(true)} className="standard-action-button" style={{backgroundColor: "green"}}>
                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-user-plus"></i>
                            New User
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default UserPrivileges;