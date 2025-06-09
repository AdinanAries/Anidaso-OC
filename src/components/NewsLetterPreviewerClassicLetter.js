import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

const NewsLetterPreviewerClassicLetter = (props) => {

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

    return `<table ondragend="handleDragEnd(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" ondragover="handleDragOver(event)" style="width: 100%; border-spacing: 0; min-height: 300px; min-width: 350px; background-color: white;">
        <tbody>
            <tr>
                <td>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 13px;">
                            Dear Customer,</p>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 13px;">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                            voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque    
                        </p>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="margin: 10px;">
                        <div class="nl-focusable-container-elem nl-button-container" tabindex="-1"
                            style="cursor: pointer;">
                            <a style="text-decoration: none;" class="nl-button-hyper-tag" onclick="return false;" target="_blank" href="">
                                <p tabindex="-1" contenteditable=${isEditMode}
                                    style="padding: 20px; color: white; background-color: black; border-radius: 50px; width: 300px; text-align: center;">
                                    Visit Our Website</p>
                            </a> 
                            <div class="nl-button-settings-container">
                                <p contenteditable="false" style="font-size: 13px; color: black; text-align: left;">
                                    <i style="margin-right: 5px;" class="fa-solid fa-globe"></i>
                                    Edit Button Link:</p>
                                <div>
                                    <p class="nl-button-url-input-elem"
                                        style="margin-top: 5px; border: none; background-color: rgba(0,0,0,0.07); min-width: 300px; padding: 10px; border-radius: 50px;"
                                        contenteditable="true"
                                    ></p>
                                </div>
                            </div>
                        </div>
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 13px;">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                            voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque    
                        </p>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 13px;">
                            Thank You!    
                        </p>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 13px;">
                            Mohammed Adinan
                        </p>
                    </div>
                    <div style="display: flex;">
                        <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                            <p>
                                <span style="font-size: 13px;" tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                    <i style="margin-right: 10px;" class="fa-solid fa-envelope"></i>
                                </span>
                                <span style=" font-size: 13px;" class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    youremail@server.com
                                </span>
                            </p>
                            <p>
                                <span style="font-size: 13px;" tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                    <i style="margin-right: 10px;" class="fa-solid fa-phone"></i>
                                </span>
                                <span style="font-size: 13px;" class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    +1 234 322 3433
                                </span>
                            </p>
                            <p>
                                <span style=" font-size: 13px;" tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                    <i style="margin-right: 10px;" class="fa-solid fa-globe"></i>
                                </span>
                                <span style=" font-size: 13px;" class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    https://yourwebsite.com
                                </span>
                            </p>
                            <div class="nl-focusable-container-elem" tabindex="-1">
                                <h3 style="font-family: courier; margin-top: 10px;" class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    ${business_name || "Company Name"}
                                </h3>
                                <div style="top: -15px; right: -15px;" onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <div class="nl-focusable-container-elem" tabindex="-1">
                                <p style="margin-top: 5px;">
                                    <img style="height: 40px;" src=${LOGO_PLACEHOLDER} />
                                </p>
                                <div  style="top: -5px; right: -5px;" onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>`;
}

export default NewsLetterPreviewerClassicLetter;