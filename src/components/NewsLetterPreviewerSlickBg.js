import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

const NewsLetterPreviewer = (props) => {

    const {
        isEditMode,
        userDetails,
        currentElemToolsState,
        buttonUrlOnInput,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleDragEnd,
        removeElement,
    } = props;

    const {
        business_name,
        logo_url,
        business_email,
        business_phone,
        business_facebook_link,
        business_twitter_link,
        business_instagram_link,
    } = userDetails.company_info;

    return <table onDragEnd={handleDragEnd} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragOver={handleDragOver} style={{width: "100%", borderSpacing: 0, backgroundColor: "white"}}>
        <tbody>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1"
                        style={{backgroundImage: `url('${currentElemToolsState?.background_image}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                        <div className="nl-focusable-container-elem" tabIndex="-1" 
                            style={{padding: "25px 20px"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center",}}>
                                <img style={{height: 40, marginRight: 10}} src={LOGO_PLACEHOLDER} />
                                <h3 style={{color: "orange", fontFamily: 'courier'}} className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode}>
                                    {business_name || "Company Name"}
                                </h3>
                            </div>
                            <p style={{textAlign: "center", marginTop: 10, color: "rgb(134, 197, 255)"}}>
                                <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                    <i style={{marginRight: 10}} className="fa-solid fa-phone"></i>
                                </span>
                                <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                    +1 234 322 3433
                                </span>
                            </p>
                            <div onClick={removeElement} className="nl-page-elem-delete-button">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        
                        <div className="nl-focusable-container-elem" tabIndex="-1" style={{padding: "50px 20px", backgroundColor: "rgba(0, 0, 0, 0.64)"}}>
                            <div>
                                <h1 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} 
                                    style={{fontSize: 33, fontWeight: "bolder", color: "white", textShadow: "1px 2px 3px black", textAlign: "center"}}>
                                    Travel Safe!</h1>
                                <div onClick={removeElement} className="nl-page-elem-delete-button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} 
                                style={{textAlign: "center", color: "white", marginTop: 20,}}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                                voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                                voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                            </p>
                            <div>
                            <div className="nl-focusable-container-elem nl-button-container" tabIndex="-1" style={{marginTop: 30}}>
                                <div className="nl-focusable-container-elem nl-button-container" tabIndex="-1"
                                    style={{cursor: "pointer", width: 300, margin: "auto", textAlign: "center"}}>
                                    <a style={{textDecoration: "none"}} disabled={isEditMode} target="_blank" href={currentElemToolsState?.buttonElemUrl}>
                                        <p tabIndex="-1" contentEditable={isEditMode}
                                            style={{padding: 20, color: "white", backgroundColor: "#665E00", borderRadius: 50}}>
                                            Visit Our Website</p>
                                    </a> 
                                    <div className="nl-button-settings-container">
                                        <p contentEditable={false} style={{fontSize: 13, color: "black", textAlign: "left"}}>
                                            <i style={{marginRight: 5}} className="fa-solid fa-globe"></i>
                                            Edit Button Link:</p>
                                        <div>
                                            <input onInput={buttonUrlOnInput}
                                                style={{marginTop: 5, border: "none", backgroundColor: "rgba(0,0,0,0.07)", minWidth: 300, padding: 10, borderRadius: 50}} 
                                                value={currentElemToolsState?.buttonElemUrl} 
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{padding: 10, marginTop: 60}}>
                                    <h3 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center", color: "crimson", fontWeight: "bolder", marginBottom: 10}}>
                                        Important Notice
                                    </h3>
                                    <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center", color: "red"}}>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                                    </p>
                                </div>
                                <div onClick={removeElement} className="nl-page-elem-delete-button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                        </div>
                            <div tabIndex="-1" className="nl-focusable-container-elem" style={{padding: "30px 10px", marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)"}}>
                                <p style={{textAlign: "center", color: "rgb(134, 197, 255)"}}>
                                    <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                        <i style={{marginRight: 10}} className="fa-solid fa-envelope"></i>
                                    </span>
                                    <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                        youremail@server.com
                                    </span>
                                </p>
                                
                                <p style={{textAlign: "center", marginTop: 5, color: "rgb(134, 197, 255)"}}>
                                    <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                        <i style={{marginRight: 10}} className="fa-solid fa-globe"></i>
                                    </span>
                                    <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                        https://yourwebsite.com
                                    </span>
                                </p>
                                <div onClick={removeElement} className="nl-page-elem-delete-button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <div onClick={removeElement} className="nl-page-elem-delete-button">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>;
}

export default NewsLetterPreviewer;