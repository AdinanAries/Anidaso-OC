import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

const NewsLetterPreviewerLight = (props) => {

    const {
        isEditMode,
        userDetails,
        currentElemToolsState,
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

    return `<table ondragend='handleDragEnd(event)' ondragleave='handleDragLeave(event)' ondrop="handleDrop(event)" ondragover="handleDragOver(event)" style="width: 100%; border-spacing: 0; background-color: rgb(238, 253, 255);">
        <tbody>
            <tr>
                <td>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="background: black; padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="color: white; font-size: 13px; text-align: center;">
                            Sed ut perspiciatis unde omnis iste natus error?</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="nl-focusable-container-elem" tabindex="-1" 
                        style="display: flex; align-items: center; justify-content: center; background-color:rgb(26, 26, 26); padding: 10px;">
                        <div class="nl-focusable-container-elem" tabindex="-1">
                            <img style="height: 40px; margin-right: 10px;" src=${LOGO_PLACEHOLDER} />
                            <div  style="top: -5px; right: -5px;" onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        <div class="nl-focusable-container-elem" tabindex="-1">
                            <h3 style="color: orange; font-family: courier;" class="nl-highlightable-text nl-focusable-text" tabIndex="-1" contenteditable=${isEditMode}>
                                ${business_name || "Company Name"}
                            </h3>
                            <div style="top: -15px; right: -15px;" onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="nl-focusable-container-elem" tabindex="-1"
                        style="background-image: url('${currentElemToolsState?.background_image}'); background-size: cover; background-repeat: no-repeat; height: 400px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="padding: 40px 20px; padding-bottom: 0;">
                        <h1 class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} 
                            style="font-size: 33px; font-weight: bolder; text-align: center; color: rgb(24, 61, 95);">
                            Travel Safe!</h1>
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="padding: 10px;">
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} 
                            style="text-align: center; color: rgb(0, 73, 95);">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                            voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                        </p>
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div>
                        <div class="nl-focusable-container-elem nl-button-container" tabindex="-1" style="margin-top: 10px;">
                            <div class="nl-focusable-container-elem nl-button-container" tabindex="-1"
                                style="cursor: pointer; width: 300px; margin: auto; text-align: center;">
                                <a style="text-decoration: none;" class="nl-button-hyper-tag" onclick="return false;" target="_blank" href="">
                                    <p tabindex="-1" contenteditable=${isEditMode}
                                        style="padding: 20px; color: white; background-color: black; border-radius: 50px;">
                                        Visit Our Website</p>
                                </a> 
                                <div class="nl-button-settings-container">
                                    <p content-editable="false" style="font-size: 13px; color: black; text-align: left;">
                                        <i style="margin-right: 5px;" class="fa-solid fa-globe"></i>
                                        Edit Button Link:</p>
                                    <div>
                                        <input oninput="buttonUrlOnInput(event)"
                                            style="margin-top: 5px; border: none; background-color: rgba(0,0,0,0.07); min-width: 300px; padding: 10px; border-radius: 50px;"
                                            value=""
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="padding: 10px; margin-top: 30px;">
                        <h3 class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="text-align: center; color: crimson; font-weight: bolder; margin-bottom: 10px;">
                            Important Notice
                        </h3>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="text-align: center; color: red;">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                        </p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div tabindex="-1" class="nl-focusable-container-elem" style="padding: 30px 10px; margin-top: 20px;">
                        <p style="text-align: center; color: rgb(0, 46, 90);">
                            <span tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style="marginRight: 10px;" class="fa-solid fa-envelope"></i>
                            </span>
                            <span class="nl-highlightable-text" taiIndex="-1" contenteditable=${isEditMode}>
                                youremail@server.com
                            </span>
                        </p>
                        <p style="text-align: center; margin-top: 5px; color: rgb(0, 46, 90);">
                            <span tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style="marginRight: 10px" className="fa-solid fa-phone"></i>
                            </span>
                            <span class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                +1 234 322 3433
                            </span>
                        </p>
                        <p style="text-align: center; margin-top: 5px; color: rgb(0, 46, 90);">
                            <span tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                <i style="margin-right: 10px;" class="fa-solid fa-globe"></i>
                            </span>
                            <span class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                https://yourwebsite.com
                            </span>
                        </p>
                        <div onclick="removeElement(event);" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>`;
}

export default NewsLetterPreviewerLight;