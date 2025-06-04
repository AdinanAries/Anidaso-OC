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

    return <table onDragEnd={handleDragEnd} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragOver={handleDragOver} style={{width: "100%", borderSpacing: 0, minHeight: 300, minWidth: 350, backgroundColor: "white"}}>
        <tbody>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1" 
                        style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "25px 20px", borderBottom: "1px solid rgba(0,0,0,0.1)",}}>
                        <img style={{height: 40, marginRight: 10}} src={LOGO_PLACEHOLDER} />
                        <h3 style={{fontFamily: 'courier'}} className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode}>
                            {business_name || "Company Name"}
                        </h3>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="nl-focusable-container-elem" tabIndex="-1" style={{padding: "20px 0", minHeight: 300}}>
                        <div onClick={removeElement} className="nl-page-elem-delete-button">
                            <i className="fa-solid fa-trash-can"></i>
                        </div>
                        <div className="nl-focusable-container-elem" tabIndex="-1" style={{padding: 10}}>
                            <div onClick={removeElement} className="nl-page-elem-delete-button">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                            <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{fontSize: 13, textAlign: "center"}}>
                                Edit page body here</p>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div tabIndex="-1" className="nl-focusable-container-elem" style={{padding: "30px 10px", borderTop: "1px solid rgba(0,0,0,0.1)"}}>
                        <p style={{textAlign: "center"}}>
                            <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style={{marginRight: 10}} className="fa-solid fa-envelope"></i>
                            </span>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                youremail@server.com
                            </span>
                        </p>
                        <p style={{textAlign: "center", marginTop: 5}}>
                            <span tabIndex="-1" className="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style={{marginRight: 10}} className="fa-solid fa-phone"></i>
                            </span>
                            <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                +1 234 322 3433
                            </span>
                        </p>
                        <p style={{textAlign: "center", marginTop: 5}}>
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
                </td>
            </tr>
        </tbody>
    </table>;
}

export default NewsLetterPreviewer;