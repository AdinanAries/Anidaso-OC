import { return_airline_by_code } from "../data/airline_codes";
import { select_booking_from_list } from "./helper-functions";

function returnEachRecentBookingMarkup(booking, index, type){
    //console.log("rendered booking: ", booking);

    let ref_number = "";
    let booking_type = "";
    let email_address = "";
    let Supplier = "";
    let booking_date = `
        ${booking.booking_date.substring(4,10)}, ${booking.booking_date.substring(11,15)}
    `;

    if(booking.booking_type === "flight"){
        ref_number = booking.booking_data.data.associatedRecords[0].reference;
        if(booking.booking_date){
            booking_type = `
                <i style="margin-right: 5px; color: rgb(255,122,122)" class="fa fa-history"></i>
                <i style="margin-right: 5px; color: aqua" class="fa fa-plane"></i>
                flight
            `;
        }
        email_address = booking.booking_data.data.travelers[0].contact.emailAddress;
        Supplier = `
            ${return_airline_by_code(booking.booking_data.data.flightOffers[0].validatingAirlineCodes[0])[0].name}
        `;
    }

    return `
        <tr id="${type}_each_rendered_booking_item_${index}" >
            <td class="bookings-pane-booking-list-column first booking-type-col">
                ${booking_type}
            </td>
            <td class="bookings-pane-booking-list-column second">
                ${ref_number}
            </td>
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                ${email_address}
            </td>
            <td class="bookings-pane-booking-list-column second mobile-hidden">
                ${Supplier}
            </td>
            <td class="bookings-pane-booking-list-column first">
                ${booking_date}
            </td>
            <td class="bookings-pane-booking-list-column second edit-icon">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </td>
        </tr>
    `;
}

function returnEachFlightSearchBookingMarkup(booking, index, type){
    //console.log("rendered booking: ", booking);

    let ref_number = "";
    let booking_type = "";
    let email_address = "";
    let Supplier = "";
    let booking_date = `
        ${booking.booking_date.substring(4,10)}, ${booking.booking_date.substring(11,15)}
    `;

    if(booking.booking_type === "flight"){
        ref_number = booking.booking_data.data.associatedRecords[0].reference;
        if(booking.booking_date){
            booking_type = `
                <i style="margin-right: 5px; color: rgb(255,122,122)" class="fa fa-history"></i>
                <i style="margin-right: 5px; color: aqua" class="fa fa-plane"></i>
                flight
            `;
        }
        email_address = booking.booking_data.data.travelers[0].contact.emailAddress;
        Supplier = `
            ${return_airline_by_code(booking.booking_data.data.flightOffers[0].validatingAirlineCodes[0])[0].name}
        `;
    }

    return `
        <tr id="${type}_each_rendered_booking_item_${index}">
            <td class="bookings-pane-booking-list-column first booking-type-col">
                <i style="margin-right: 5px; color: rgb(255,122,122);" class="fa fa-history"></i>
                <i style="margin-right: 5px; color: aqua;" class="fa fa-plane"></i>
                One-way
            </td>
            <td class="bookings-pane-booking-list-column second">
                Mar 24 - Mar 26
            </td>
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                adinanaries@outlook.com
            </td>
            <td class="bookings-pane-booking-list-column second mobile-hidden">
                Mohammed Adinan
            </td>
            <td class="bookings-pane-booking-list-column first">
                MAD - CDG
            </td>
        </tr>
    `;
}

function returnEachHotelSearchBookingMarkup(booking, index, type){
    return `
        <tr id="${type}_each_rendered_booking_item_${index}">
            <td class="bookings-pane-booking-list-column first booking-type-col">
                Despite...
            </td>
            <td class="bookings-pane-booking-list-column second">
                Mar 24
            </td>
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                Accra, GH
            </td>
            <td class="bookings-pane-booking-list-column second mobile-hidden">
                Mohammed Adinan
            </td>
            <td class="bookings-pane-booking-list-column first">
                adinanaries@outlook.com
            </td>
        </tr>
    `;
}
export function render_recent_bookings_markup(bookings){
    document.getElementById("bookings-pane-recent-bookings-list").innerHTML = `
        <tr className="header">
            <td class="header">
                Type
            </td>
            <td class="header">
                Ref. Number
            </td>
            <td class="header mobile-hidden">
                Email
            </td>
            <td class="header mobile-hidden">
                Supplier
            </td>
            <td class="header">
                Booking Date
            </td>
            <td class="header"></td>
        </tr>
    `;

    for(let b=0; b < bookings.length; b++){
        document.getElementById("bookings-pane-recent-bookings-list").innerHTML += returnEachRecentBookingMarkup(bookings[b], b, "recent");
        setTimeout(()=>{
            document.getElementById(`recent_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                select_booking_from_list('home', bookings[b]._id);
            });
        }, 200);
    }
}

export function render_search_result_bookings_markup(bookings, type="confirmation"){

    if(type === "confirmation"){
        document.getElementById("bookings-pane-search-results-bookings-list").innerHTML = `
            <tr className="header">
                <td class="header">
                    Type
                </td>
                <td class="header">
                    Ref. Number
                </td>
                <td class="header mobile-hidden">
                    Email
                </td>
                <td class="header mobile-hidden">
                    Supplier
                </td>
                <td class="header">
                    Booking Date
                </td>
                <td class="header"></td>
            </tr>
        `;

        for(let b=0; b < bookings.length; b++){
            document.getElementById("bookings-pane-search-results-bookings-list").innerHTML += returnEachRecentBookingMarkup(bookings[b], b, "search");
            setTimeout(()=>{
                document.getElementById(`search_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('results', bookings[b]._id);
                });
            }, 200);
        }
    }else if(type === "flight"){
        document.getElementById("bookings-pane-search-results-bookings-list").innerHTML = `
            <tr class="header">
                <td class="header">
                    Type
                </td>
                <td class="header">
                    Travel Dates
                </td>
                <td class="header mobile-hidden">
                    Email
                </td>
                <td class="header mobile-hidden">
                    Name
                    </td>
                <td class="header">
                    Airports
                </td>
            </tr>
        `;

        for(let b=0; b < bookings.length; b++){
            document.getElementById("bookings-pane-search-results-bookings-list").innerHTML += returnEachFlightSearchBookingMarkup(bookings[b], b, "search");
            setTimeout(()=>{
                document.getElementById(`search_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('results', bookings[b]._id);
                });
            }, 200);
        }
    }else if(type === "hotel"){
        document.getElementById("bookings-pane-search-results-bookings-list").innerHTML = `
            <tr>
                <td class="header">
                    Hotel Name
                </td>
                <td class="header">
                    Checkin
                </td>
                <td class="header mobile-hidden">
                    City
                </td>
                <td class="header mobile-hidden">
                    Cust. Name
                </td>
                <td class="header">
                    Email
                </td>
            </tr>
        `;

        for(let b=0; b < bookings.length; b++){
            document.getElementById("bookings-pane-search-results-bookings-list").innerHTML += returnEachHotelSearchBookingMarkup(bookings[b], b, "search");
            setTimeout(()=>{
                document.getElementById(`search_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('results', bookings[b]._id);
                });
            }, 200);
        }
    }
}

function return_selected_booking_flight_status(status){
    return `
        <div style="background-color: rgb(43,23,99); border-top-left-radius: 6px; border-top-right-radius: 6px; border-bottom: 4px solid rgba(255,255,255,0.4); padding: 10px; margin-bottom: 10px;">
            <p style="color: white; margin: 5px; font-size: 13px; font-weight: bolder; letter-spacing: 1px;">
                <i style="color: crimson; margin-right: 10px; font-size: 17px" class="fa fa-plane"></i>
                Fight Booking
            </p>
            <div class="booking-status-tracker">
                <div class="booking-status-tracker-stage" style="border-top: 5px solid lightgreen">
                    <div class="booking-status-tracker-stage-point" style="background-color: green; right: calc(100% - 14px)">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="booking-status-tracker-stage-point" style="background-color: green">
                        <i class="fa fa-ticket"></i>
                    </div>
                    <p class="booking-status-tracker-stage-title" style="display: flex; justify-content: space-between; width: calc(100% + 40px); margin-left: -20px">
                        <span>Booked</span> <span>Ticketed</span></p>
                </div>
                <div  class="booking-status-tracker-stage"style="border-top: 5px solid gold;">
                    <div class="booking-status-tracker-stage-point" style="background-color: goldenrod;">
                        <i class="fa fa-briefcase"></i>
                    </div>
                    <p class="booking-status-tracker-stage-title">
                        Checked-in</p>
                </div>
                <div class="booking-status-tracker-stage" style="border-top: 5px solid orange;">
                    <div class="booking-status-tracker-stage-point" style="background-color: orangered;">
                    <i class="fa fa-plane"></i>
                    </div>
                    <p class="booking-status-tracker-stage-title">
                        Boarded</p>
                </div>
                <div class="booking-status-tracker-stage" style="border-top: 5px solid red;">
                    <p class="booking-status-tracker-stage-title">
                        Flown</p>
                    <div class="booking-status-tracker-stage-point active animated-status-icon">
                        <i class="fa fa-check"></i>
                    </div>
                </div>
            </div>
            <div style="letter-spacing: 1px; padding: 10px; padding-left: 15px; border-left: 3px solid orange; background-color: rgba(255,255,255,0.1); color: white; fontSize: 13px">
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Status: 
                    <span style="margin-left: 10px; color: orange">
                        Flown
                    </span>
                </p>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Record ID: 
                    <span style="margin-left: 10px; color: orange;">
                        97362223673836
                    </span>
                </p>
            </div>
        </div>
    `;
}

function return_selected_booking_status_display_markup(type, status){
    if(type === "flight"){
       return return_selected_booking_flight_status(status);
    }else if(type === "hotel"){
        //return hotel status rendering here
    }
     
}
function return_selected_booking_flight_general_info(data){
    return `
        <p class="page-data-info-p">
            Type: 
            <span>
                <i style="color: crimson; margin-right: 5px;" class="fa fa-plane"></i>
                Fights
            </span>
        </p>
        <p class="page-data-info-p">
            Reference Number: 
            <span>
                ${data.ref_number}
            </span>
        </p>
    `;
}
function return_selected_booking_general_info(type, data){
    if(type === "flight"){
        return return_selected_booking_flight_general_info(data);
     }else if(type === "hotel"){
         //return hotel status rendering here
     }
}

function return_selected_flight_booking_travelers_markup(travelers){
    console.log(travelers);
    
    let travelers_markup = "";

    for(let t=0; t<travelers.length;t++){
        travelers_markup += `
            <div style="margin-bottom: 20px; border-left: 3px solid orangered; padding: 10px;" >
                <p style="font-size: 14px; font-weight: bolder; margin-bottom: 5px; color: brown;">
                    <i style="font-weight: bolder; marginRight: 5px;" class="fa fa-user"></i>
                    Mohammed Adinan
                </p>
                <p style="font-size: 14px; margin-bottom: 5px;" >
                    Male, March 23rd 1992
                </p>
                <p style="font-size: 14px; margin-bottom: 5px;" >
                    Passport: G0291090
                </p>
            </div>
        `;
    }

    return travelers_markup;
}

export function render_selected_booking_details(booking){
    console.log(booking);
    let general_info = {};

    if(booking.booking_type === "flight"){

        //general information here
        general_info.ref_number = booking.booking_data.data.associatedRecords[0].reference;

        document.getElementById("selected_booking_status_display_container").innerHTML = return_selected_booking_status_display_markup("flight", "status");
        document.getElementById("selected_booking_general_information_container").innerHTML = return_selected_booking_general_info("flight", general_info);
        document.getElementById("selected_booking_travelers_or_guests_list").innerHTML = return_selected_flight_booking_travelers_markup(booking.booking_data.data.travelers);
    }
}

export function render_component_loader_markup(elem_id){
    document.getElementById(elem_id).innerHTML = `
        <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; background-color: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.3);">
            <div style="width: 100%; text-align: center;" class="loader2 loader--style2" title="1">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"/>
                    </path>
                </svg>
                <p style="text-align: center; font-size: 13px; color: rgba(255,255,255,0.7);">
                    loading...
                </p>
            </div>
        </div>
    `;
}

export function render_no_booking_found_markup(elem_id){
    document.getElementById(elem_id).innerHTML = `
        <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; background-color: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.3);">
            <div style="width: 100%; text-align: center;">
                <i style="color: orangered; font-size: 30px" class="fa fa-exclamation-triangle"></i>
                <p style="text-align: center; font-size: 14px; margin-top: 5px; color: rgb(255,255,255,0.7);">
                    Oops! No booking found.
                </p>
            </div>
        </div>
    `;
}