import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";

const NewsLetterPreviewerSlickBg = (props) => {

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

    return `<table ondragend="handleDragEnd(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" ondragover="handleDragOver(event)" style="width: 100%; border-spacing: 0; background-color: white;">
        <tbody>
            <tr>
                <td>
                    <div class="nl-focusable-container-elem" tabindex="-1"
                        style="background-image: url('${currentElemToolsState?.background_image}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                        <div class="nl-focusable-container-elem" tabindex="-1" 
                            style="padding: 25px 20px;">
                            <div style="display: flex; align-items: center; justify-content: center;">
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
                            </div>
                            <div class="nl-focusable-container-elem" tabindex="-1" style="width: fit-content; margin: auto;">
                                <p style="text-align: center; color: rgb(134, 197, 255);">
                                    <span tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                        <i style="margin-right: 10px;" class="fa-solid fa-phone"></i>
                                    </span>
                                    <span class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                        +1 234 322 3433
                                    </span>
                                </p>
                                <div style="top: -15px; right: -15px;" onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        
                        <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 50px 20px; background-color: rgba(0, 0, 0, 0.64);">
                            <div>
                                <h1 class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} 
                                    style="fontSize: 33px; font-weight: bolder; color: white; text-shadow: 1px 2px 3px black; text-align: center;">
                                    Your Next Trip!</h1>
                                <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} 
                                style="text-align: center; color: white; margin-top: 20px;">
                                Are you dreaming of your next getaway, family visit, or business trip? I’m here to help make your travel plans smooth, stress-free, and affordable.
                                <br/><br/>
                                As your trusted independent travel agent, I offer personalized service with competitive pricing on flights to destinations worldwide. Whether it’s a quick weekend escape or a long-awaited international adventure, I’ve got you covered.
                                <br/><br/>
                                Book your flights now using this link:
                            </p>
                            <div>
                            <div class="nl-focusable-container-elem" tabindex="-1" style="margin-top: 30px;">
                                <div class="nl-focusable-container-elem nl-button-container" tabindex="-1"
                                    style="cursor: pointer; width: 300px; margin: auto; text-align: center;">
                                    <a style="text-decoration: none;" class="nl-button-hyper-tag" onclick="return false;" target="_blank" href="">
                                        <p tabindex="-1" contenteditable=${isEditMode}
                                            style="padding: 20px; color: white; background-color: #665E00; border-radius: 50px;">
                                            Book Now</p>
                                    </a> 
                                    <div class="nl-button-settings-container">
                                        <p contenteditable=false style="fontSize: 13px; color: black; textAlign: left;">
                                            <i style="marginR-right: 5px;" class="fa-solid fa-globe"></i>
                                            Edit Button Link:</p>
                                        <div>
                                            <p class="nl-button-url-input-elem"
                                                style="margin-top: 5px; border: none; background-color: rgba(0,0,0,0.07); min-width: 300px; padding: 10px; border-radius: 50px;"
                                                contenteditable="true"
                                            ></p>
                                        </div>
                                    </div>
                                </div>
                                <div style="padding: 10px; margin-top: 20px;">
                                    <h3 class="nl-highlightable-text nl-focusable-text" tabIindex="-1" contenteditable=${isEditMode} style="text-align: center; color: crimson; font-weight: bolder; margin-bottom: 10px;">
                                        Disclaimer
                                    </h3>
                                    <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="text-align: center; color: red;">
                                        As an independent travel agent, I act solely as an intermediary between clients and travel service providers, including airlines, hotels, cruise lines, and tour operators. I do not own or operate any of these services and cannot guarantee the performance or quality of services provided by third parties.
                                        All travel arrangements are subject to the terms and conditions of the relevant travel suppliers. I am not responsible for changes, cancellations, delays, or other unforeseen events beyond my control. Clients are advised to carefully review all supplier policies, including those related to cancellation, refund, and travel insurance.
                                        It is the responsibility of the traveler to ensure they have valid travel documents, including passports, visas, and any required health certifications. I strongly recommend the purchase of comprehensive travel insurance to cover potential risks and disruptions.
                                        By booking through me, clients acknowledge and accept these terms
                                    </p>
                                </div>
                                <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                        </div>
                            <div tabindex="-1" class="nl-focusable-container-elem" style="padding: 30px 10px; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                                <p style="text-align: center; color: rgb(134, 197, 255);">
                                    <span tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                        <i style="marginR-right: 10px;" class="fa-solid fa-envelope"></i>
                                    </span>
                                    <span class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                        youremail@server.com
                                    </span>
                                </p>
                                
                                <p style="text-align: center; margin-top: 5px; color: rgb(134, 197, 255);">
                                    <span tabindex="-1" class="nl-focusable-container-elem nl-focusable-icon-container-elem">
                                        <i style="marginR-right: 10px;" class="fa-solid fa-globe"></i>
                                    </span>
                                    <span class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                        https://yourwebsite.com
                                    </span>
                                </p>
                                <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                            <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                                <i class="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>`;
}

export default NewsLetterPreviewerSlickBg;