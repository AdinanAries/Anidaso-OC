import FormErrorCard from "../../../../../components/FormErrorCard";
import { useEffect, useState } from "react";
import { 
    fetchAppRoles, 
    fetchAppPages, 
    fetchRolePrivilegeById,
    fetchAppResources,
    fetchCanActionsByResourceTypeId,
    updatePrivilegeInfo,
    createNewPrivilege,
    fetchAllPrivileges,
    updateAppRoleInfo,
    createNewAppRole,
} from "../../../../../services/accountServices";

const UserPrivileges = (props) => {

    const {
        showNewUserForm
    } = props

    const ID_CONCAT = "_(#$%)_"; // Unique string for combining ID's and Splitting them when needed

    const [ formValidation, setFormValidation ] = useState({
        type: "warning",
        isError: false,
        message: "",
    });

    const resetFormValidation = () => {
        setFormValidation({
            type: "warning",
            isError: false,
            message: "",
        })
    }

    const [appRoleState, setAppRoleState] = useState([]);
    const [appResourceState, setAppResourceState] = useState([]);
    const [allRolePrivileges, setAllRolePrivileges] = useState([]);
    const [currentPrivilege, setCurrentPrivilege] = useState({});
    const [selectedRole, setSelectedRole] = useState({});
    const [appPagesState, setAppPagesState] = useState([]);
    const [creatNewRoleFormData, setCreatNewRoleFormData] = useState({
        title: "",
        privilege_id: "",
        constant: 0
    });
    const [isCreateNewRole, setIsCreateNewRole] = useState(false);
    const [isCreateNewRolePrivilege, setIsCreateNewRoleRolePrivilege] = useState(false);
    const [isChangePrivTypeForExistingRole, setIsChangePrivTypeForExistingRole] = useState(false);
    const [isLoading, setIsLoadig] = useState(false);

    useEffect(()=>{
        initPrivPageState();
    }, []);

    const startPageOnClick = () => {
        setIsCreateNewRole(false);
        setIsCreateNewRoleRolePrivilege(false);
        setIsChangePrivTypeForExistingRole(false);
        initPrivPageState();
    }

    const initPrivPageState = async () => {
        resetFormValidation();
        setIsLoadig(true);
        let _roles = await fetchAppRoles();
        let _pages = await fetchAppPages();
        let _resources = await fetchAppResources();
        let _all_privs = await fetchAllPrivileges();
        if(_roles.length>0){
            getAndSetCurrentPrivilegeStateById(_roles[0].privilege_id);
        }
        setAppRoleState(_roles);
        setSelectedRole(_roles[0]);
        setAppPagesState(_pages);
        if(Array.isArray(_all_privs))
            setAllRolePrivileges(_all_privs);
        setIsChangePrivTypeForExistingRole(false);
        if(_resources.length > 0){
            for(let each of _resources){
                let actions = await fetchCanActionsByResourceTypeId(each?.resource_type_id);
                each.can_actions = actions;
            };
            setAppResourceState(_resources);
        }
        setIsLoadig(false);
    }

    const appRoleOnInput = (e) => {
        let _rr=appRoleState.find(item=>item.constant===parseInt(e.target.value));
        setSelectedRole(_rr);
        getAndSetCurrentPrivilegeStateById(_rr?.privilege_id);
        setIsChangePrivTypeForExistingRole(false);
    }

    const appPageCheckBoxOnInput = (e) => {
        resetFormValidation();
        let _p_pagesCanAccess=currentPrivilege.pagesCanAccess;
        if(!e.target.checked){
            _p_pagesCanAccess?.push(e.target.value);
            _p_pagesCanAccess = [...new Set(_p_pagesCanAccess)];
        }else{
            _p_pagesCanAccess = _p_pagesCanAccess?.filter(item => item !== e.target.value);
        }
        setCurrentPrivilege({
            ...currentPrivilege,
            pagesCanAccess: _p_pagesCanAccess
        })
    }

    const newPrivilegeTitleOnInput = (e) => {
        resetFormValidation();
        setCurrentPrivilege({
            ...currentPrivilege,
            description: e.target.value
        })
    }

    const appResourceActionCheckBoxOnInput = (e) => {
        let _p_resourcesCanActions=currentPrivilege.resourcesCanActions; // Getting component state
        let _id_arr = e.target.value.split(ID_CONCAT) //=> [resource_id, action_id];
        let _r_id = _id_arr[0];
        let _a_id = _id_arr[1];
        // Extracting the object from the array
        let _rca_obj=_p_resourcesCanActions?.find(item=>item?.resources_id===_r_id); //=> {resources_id: "", canActions: []}
        _p_resourcesCanActions = _p_resourcesCanActions.filter(item =>item?.resources_id !== _r_id);
        if(!e.target.checked){
            if(_rca_obj){
                _rca_obj?.canActions?.push(_a_id);
                _rca_obj.canActions = [...new Set(_rca_obj?.canActions)];
            }else{
                _rca_obj = {
                    resources_id: _r_id, 
                    canActions: [_a_id]
                }
            }
            _p_resourcesCanActions.push(_rca_obj);
        }else{
            if(_rca_obj){
                _rca_obj.canActions=_rca_obj?.canActions?.filter(item => item !== _a_id);
            }
            if(_rca_obj?.canActions?.length>0){
                _p_resourcesCanActions.push(_rca_obj);
            }
        }
        setCurrentPrivilege({
            ...currentPrivilege,
            resourcesCanActions: _p_resourcesCanActions
        });
        console.log(_p_resourcesCanActions);
    }

    const appPrivilegeForExistingRoleOnInput = (e) => {
        let __priv_id=e.target.value;
        getAndSetCurrentPrivilegeStateById(__priv_id);
        setSelectedRole({
            ...selectedRole,
            privilege_id: __priv_id
        })
    }

    const openCloseChangePrivTypeForExistingRole = (bool_p) => {
        setIsChangePrivTypeForExistingRole(bool_p);
    }

    const openCloseCreateNewRoleForm = (boolean_p) => {
        setIsCreateNewRole(boolean_p)
    }

    const openCloseCreateNewRolePrivilegeForm = (boolean_p) => {
        setIsCreateNewRoleRolePrivilege(boolean_p)
        if(boolean_p){
            setCurrentPrivilege({
                description: "",
                pagesCanAccess: [],
                resourcesCanActions: [
                    /*{
                        "canActions": [
                            "67fed8706fc14538c0b4b1ef",
                            "67fed6521a63c095781eb815"
                        ],
                        "resources_id": "68004acf2f383fab21fd06c7"
                    }*/
                ]
            })
        }else{
            resetFormValidation();
            initPrivPageState();
        }
    }

    const updatePrivilegeOnSubmit = async () =>{
        setIsLoadig(true);
        let __res = await updatePrivilegeInfo(currentPrivilege);
        if(__res?._id){
            let _role_res = await updateAppRoleInfo(selectedRole);
            if(_role_res?._id){
                initPrivPageState();
                alert("Role and Privileges Updated Successfully!")
            }
        }
        setIsLoadig(false);
    }

    const createNewPrivilegeOnSubmit = async () => {
        setIsLoadig(true);
        let __res = await createNewPrivilege(currentPrivilege);
        console.log(__res);
        if(__res?._id){
            startPageOnClick();
            alert("New Privilege Created");
        }else{
            setFormValidation({
                type: "warning",
                isError: true,
                message: __res?.message,
            });
        }
        setIsLoadig(false);
    }

    const getAndSetCurrentPrivilegeStateById = async (id) => {
        let _priv = [];
        if(id){
            _priv = await fetchRolePrivilegeById(id);
        }
        setCurrentPrivilege(_priv);
    }
    
    //Create new form
    const newRoleTitleOnInput = (e) => {
        resetFormValidation();
        setCreatNewRoleFormData({
            ...creatNewRoleFormData,
            title: e.target.value
        });
    }

    const newRoleConstantOnInput = (e) => {
        resetFormValidation();
        setCreatNewRoleFormData({
            ...creatNewRoleFormData,
            constant: e.target.value
        });
    }

    const newRolePrivIdOnInput = (e) => {
        resetFormValidation();
        setCreatNewRoleFormData({
            ...creatNewRoleFormData,
            privilege_id: e.target.value
        });
    }

    const newRoleOnSubmit = async () => {
        setIsLoadig(true);
        let __res = await createNewAppRole(creatNewRoleFormData);
        if(__res?._id){
            startPageOnClick();
            alert("New Role Created Successfully!");
            setCreatNewRoleFormData({
                title: "",
                privilege_id: "",
                constant: 0
            });
        }else{
            setFormValidation({
                type: "warning",
                isError: true,
                message: __res?.message,
            });
        }
        setIsLoadig(false);
    }

    return <div className="main-seaction-containers">
        <div>
            {
                formValidation.isError && <div style={{background: "rgba(255,0,0,0.2)", padding: 20}}>
                    <FormErrorCard 
                        message={formValidation.message} 
                        type={formValidation.type}
                    />
                </div>
            }
            <div onClick={()=>startPageOnClick()} 
                style={{textDecoration: "underline", fontSize: 14, width: 90, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-refresh"></i>
                Refresh
            </div>
            {
                isLoading &&
                <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                    fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                    <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                    Loading.. Please Wait
                </div>
            }
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
                                    onInput={newRoleTitleOnInput}
                                    value={creatNewRoleFormData?.title}
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
                                    onInput={newRoleConstantOnInput}
                                    value={creatNewRoleFormData?.constant}
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
                    isCreateNewRole &&
                    <div>
                        <p style={{color: "#a9ddff", fontSize: 13, marginBottom: 10}}>
                            <i style={{marginRight: 10, color: "skyblue"}} className="fa-solid fa-gear"></i> 
                            {isCreateNewRolePrivilege ? "Create Role Privileges" : "Set Role Privileges"}</p>
                        {
                            isCreateNewRolePrivilege ? <>
                                <div style={{marginBottom: 20, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.1)", padding: 10, borderRadius: 8}}>
                                    <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                        <i className="fa fa-users" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                        Privilege Title/Description</p>
                                    <div style={{border: "none"}}>
                                        <input onInput={newPrivilegeTitleOnInput}
                                            value={currentPrivilege?.description}
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
                                            onInput={newRolePrivIdOnInput}
                                            value={creatNewRoleFormData.privilege_id}
                                            style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}>
                                                <option style={{color: "black"}} value="">Select Privilege Type</option>
                                                {
                                                    allRolePrivileges?.map(each=>{
                                                        return <option value={each?._id}
                                                            style={{color: "black"}}>
                                                            {each?.description}</option>
                                                    })
                                                }
                                        </select>
                                    </div>
                                </div>
                                <p onClick={()=>openCloseCreateNewRolePrivilegeForm(true)} style={{fontSize: 13, textDecoration: "underline", cursor: "pointer", color: "lightgreen", margin: "10px 0", padding: 20, background: "rgba(0,255,0,0.1)"}}>
                                    <i className="fa fa-plus" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                    I want to create new privilege first!
                                </p>
                            </>
                        }
                    </div>
                }
                {
                    (!isCreateNewRole || isCreateNewRolePrivilege) &&
                    <div>
                        <p style={{color: "white", fontSize: 13, marginBottom: 10}}>
                            <i style={{marginRight: 10, color: "skyblue"}} className="fa-solid fa-users-gear"></i> 
                            {
                                isCreateNewRolePrivilege ? 
                                "Access/Resource Management" : 
                                (selectedRole?.title+" Role - "+(currentPrivilege?.description || "No Privilege Type!"))
                            }
                            {
                                (!isCreateNewRolePrivilege && !isChangePrivTypeForExistingRole) && 
                                <span onClick={()=>openCloseChangePrivTypeForExistingRole(true)} style={{color: "yellow", marginLeft: 10, fontSize: 13, textDecoration: "underline", cursor: "pointer"}}>
                                    Change Privilege Type
                                </span>
                            }
                        </p>
                        {
                        (!isCreateNewRolePrivilege && !currentPrivilege?._id && !isChangePrivTypeForExistingRole) ? <div style={{padding: 20, backgroundColor: "rgba(255,0,0,0.2)"}}>
                            <p style={{color: "white", fontSize: 13}}>
                                <i style={{marginRight: 10, color: "yellow"}} className="fa-solid fa-exclamation-triangle"></i>
                                No privileges associated with {selectedRole?.title} role. 
                                <span onClick={()=>openCloseChangePrivTypeForExistingRole(true)} style={{color: "yellow", marginLeft: 10, fontSize: 13, textDecoration: "underline", cursor: "pointer"}}>
                                    Click here to set privileges
                                </span>
                            </p>
                        </div> :
                        <>
                            {
                                (isChangePrivTypeForExistingRole && !isCreateNewRolePrivilege) &&
                                <div style={{padding: 10, borderRadius: 8, marginBottom: 4}}>
                                    <p style={{color: "skyblue", fontSize: 13}}>
                                        Select Privilege Type</p>
                                    <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                        {
                                            allRolePrivileges?.map(each=>{
                                                return <div style={{margin: 2.5, width: "32%"}}>
                                                <p style={{marginBottom: 10}}>
                                                    <input
                                                        onInput={appPrivilegeForExistingRoleOnInput}
                                                        id={each?._id} 
                                                        value={each?._id} 
                                                        type="radio"
                                                        name="privileges_types"
                                                    />
                                                    <span style={{marginLeft: 5, color: "gold", fontSize: 13}}>
                                                        <label htmlFor={each?._id}>
                                                        {each?.description}</label>
                                                    </span>
                                                </p>
                                            </div>
                                            })
                                        }
                                        {
                                            (allRolePrivileges.length === 0) && <div style={{padding: 20, backgroundColor: "rgba(132, 255, 0, 0.2)"}}>
                                            <p style={{color: "white", fontSize: 13}}>
                                                <i style={{marginRight: 10, color: "lightgreen"}} className="fa-solid fa-info-circle"></i>
                                                No exisiting privilege types setup. 
                                                <span onClick={()=>{
                                                    openCloseCreateNewRoleForm(true);
                                                    openCloseCreateNewRolePrivilegeForm(true);
                                                }} style={{color: "yellow", marginLeft: 10, fontSize: 13, textDecoration: "underline", cursor: "pointer"}}>
                                                    Create New Privilege Type
                                                </span>
                                            </p>
                                        </div>
                                        }
                                    </div>
                                </div>
                            }
                            <div style={{background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, marginBottom: 4}}>
                                <p style={{color: "skyblue", fontSize: 13}}>
                                    Menu Access</p>
                                <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                    {
                                        appPagesState.map(each=>{
                                            let cb_checked=(currentPrivilege?.pagesCanAccess?.includes(each?._id));
                                            return <div style={{margin: 2.5, width: "32%"}}>
                                            <p style={{marginBottom: 10}}>
                                                <input checked={cb_checked}
                                                    id={each?._id} onInput={appPageCheckBoxOnInput}
                                                    value={each?._id} 
                                                    type="checkbox"
                                                    className="cm-toggle"
                                                />
                                                <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                                    <label htmlFor={each?._id}>
                                                    {each?.page_title}</label>
                                                </span>
                                            </p>
                                        </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap",}}>
                                {
                                    appResourceState.map(resource=>{
                                        return <div style={{background: "rgba(0,0,0,0.2)", padding: 10, borderRadius: 8, width: "calc(50% - 2px)", marginBottom: 4}}>
                                            <p style={{color: "orange", fontSize: 13}}>
                                                {resource?.resource_title} Management</p>
                                            <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
                                                {   
                                                    resource?.can_actions?.map(action=>{
                                                        let cb_checked=false;
                                                        let ___obj = currentPrivilege?.resourcesCanActions?.find(item=>item?.resources_id===resource?._id);
                                                        console.log(___obj);
                                                        if(___obj)
                                                            cb_checked = (___obj?.canActions?.includes(action?._id));

                                                        return <div style={{margin: 2.5, width: "calc(50% - 5px)"}}>
                                                            <p style={{marginBottom: 10}}>
                                                                <input checked={cb_checked}
                                                                    onInput={appResourceActionCheckBoxOnInput}
                                                                    value={resource?._id+ID_CONCAT+action?._id} 
                                                                    id={resource?._id+ID_CONCAT+action?._id} 
                                                                    type="checkbox" 
                                                                    className="cm-toggle"
                                                                />
                                                                <span style={{marginLeft: 5, color: "white", fontSize: 12}}>
                                                                    <label htmlFor={resource?._id+ID_CONCAT+action?._id}>
                                                                    {action?.action_title} {resource?.resource_title}</label>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    })
                                                }
                                                {
                                                    !resource?.can_actions && <p style={{fontSize: 12, color: "white", margin: "10px 0"}}>
                                                        <i style={{color: "yellow", marginRight: 10}} className="fa-solid fa-exclamation-triangle"></i>
                                                        No Available ACL Actions
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </>
                        }
                    </div>
                }
                {
                    (!isCreateNewRole && !isCreateNewRolePrivilege) &&
                    <div onClick={updatePrivilegeOnSubmit}
                        className="standard-action-button" style={{marginTop: 10}}>
                        <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-check"></i>
                        Update Role
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
                                Create New Role
                            </div> :
                            <div onClick={()=>openCloseCreateNewRoleForm(false)} 
                                style={{color: "orange", marginTop: 40, marginLeft: 20, cursor: "pointer"}}>
                                <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-arrow-left"></i>
                                Back
                            </div>
                        }
                        </> :
                        <div onClick={()=>openCloseCreateNewRoleForm(true)} 
                            style={{margin: "20px 0", color: "yellow", cursor: "pointer", fontSize: 13, textDecoration: "underline"}}>
                            <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-plus"></i>
                            New Role
                        </div>
                    }
                    {
                        isCreateNewRole ?
                        <>
                            {
                                isCreateNewRolePrivilege ?
                                <div onClick={createNewPrivilegeOnSubmit} className="standard-action-button">
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-check"></i>
                                    Save Privilege
                                </div> :
                                <div onClick={newRoleOnSubmit}
                                    className="standard-action-button">
                                    <i style={{marginRight: 10, color: "rgba(255,255,255,0.5)"}} className="fa fa-check"></i>
                                    Save Role
                                </div>
                            }
                        </>:
                        <div onClick={()=>showNewUserForm(true)} 
                            style={{margin: "20px 0", color: "yellow", cursor: "pointer", fontSize: 13, textDecoration: "underline"}}>
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