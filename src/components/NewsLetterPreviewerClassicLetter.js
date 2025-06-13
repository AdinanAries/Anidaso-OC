const LOGO_PLACEHOLDER = "https://welldugo-oc-53db16692066.herokuapp.com/static/media/LOGO_PLACEHOLDER.6fc45b94.jpg";

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
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 14px;">
                            Dear Customer,</p>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 14px;">
                            Are you dreaming of your next getaway, family visit, or business trip? I’m here to help make your travel plans smooth, stress-free, and affordable.
                            <br/><br/>
                            As your trusted independent travel agent, I offer personalized service with competitive pricing on flights to destinations worldwide. Whether it’s a quick weekend escape or a long-awaited international adventure, I’ve got you covered.
                            <br/><br/>
                            <span style="font-weight: bolder;">
                                Book your flights now using this link:</span>
                        </p>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="margin: 10px;">
                        <div class="nl-focusable-container-elem nl-button-container" tabindex="-1"
                            style="cursor: pointer;">
                            <a style="text-decoration: none;" class="nl-button-hyper-tag" onclick="return false;" target="_blank" href="">
                                <p tabindex="-1" contenteditable=${isEditMode}
                                    style="padding: 20px; color: white; background-color: black; border-radius: 50px; width: 300px; text-align: center;">
                                    Book Now</p>
                            </a> 
                            <div class="nl-button-settings-container">
                                <p contenteditable="false" style="font-size: 14px; color: black; text-align: left;">
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
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 14px;">
                            Why book with me?
                            <br/><br/>
                            ✅ Personalized support before and after your trip<br/>
                            ✅ Access to exclusive deals and flexible flight options<br/>
                            ✅ One-on-one service – no call centers or hold music<br/>
                            <br/><br/>
                            Need help choosing the best route or fare? Just reply to this email – I’m happy to assist!
                            <br/><br/>
                            Let’s get you on your way.
                        </p>
                    </div>
                    <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                        <div onclick="removeElement(event)" class="nl-page-elem-delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="font-size: 14px;">
                            Warm regards,  
                            <br/>
                            ${(userDetails?.first_name || "First Name")} ${(userDetails?.last_name || "Last Name")}
                        </p>
                    </div>
                    <div style="display: flex;">
                        <div class="nl-focusable-container-elem" tabindex="-1" style="padding: 10px;">
                            <p>
                                <span style=" font-size: 14px;" class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    ${(userDetails?.email || "youremail@server.com")}
                                </span>
                                <br/>
                                <span style="font-size: 14px;" class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    ${(userDetails?.phone || "+1 123 456 7890")}
                                </span>
                                <br/>
                                <span style=" font-size: 14px;" class="nl-highlightable-text" tabindex="-1" contenteditable=${isEditMode}>
                                    ${(userDetails?.website_url || "https://yourwebsiteurl.com")}
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
            <tr>
                <td>
                    <div style="padding: 10px;">
                        <h3 class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="text-align: center; color: crimson; font-weight: bolder; margin-bottom: 10px;">
                            Disclaimer
                        </h3>
                        <p class="nl-highlightable-text nl-focusable-text" tabindex="-1" contenteditable=${isEditMode} style="text-align: center; color: red;">
                            As an independent travel agent, I act solely as an intermediary between clients and travel service providers, including airlines, hotels, cruise lines, and tour operators. I do not own or operate any of these services and cannot guarantee the performance or quality of services provided by third parties.
                            All travel arrangements are subject to the terms and conditions of the relevant travel suppliers. I am not responsible for changes, cancellations, delays, or other unforeseen events beyond my control. Clients are advised to carefully review all supplier policies, including those related to cancellation, refund, and travel insurance.
                            It is the responsibility of the traveler to ensure they have valid travel documents, including passports, visas, and any required health certifications. I strongly recommend the purchase of comprehensive travel insurance to cover potential risks and disruptions.
                            By booking through me, clients acknowledge and accept these terms
                        </p>
                    </div>
                </td>
        </tbody>
    </table>`;
}

export default NewsLetterPreviewerClassicLetter;