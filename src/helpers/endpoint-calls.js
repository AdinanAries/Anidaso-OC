import $ from "jquery";
import { 
    show_bookings_pane_search_results_page, 
    set_search_pagination_initial_pages_numbers, 
    add_event_listeners_to_page_numbers, 
    search_pages_arr, 
    search_last_page_number_index 
} from "./helper-functions";
import { 
    render_recent_bookings_markup, 
    render_search_result_bookings_markup, 
    render_selected_booking_details, 
    render_component_loader_markup, 
    render_no_booking_found_markup 
} from "./markup-rendering";

import { getApiHost, getUserToken, deleteUserToken } from "../constants/Environment";

const API_URL = getApiHost();
const USER_TOKEN = getUserToken();

const serverBaseURL = API_URL;

let recentBookingsPaginationSkip = 1;
let recentBookingsPaginationLimit = 20;
let sp_recentBookingsPaginationSkip = 1;
let sp_recentBookingsPaginationLimit = 20;

//this makes endpoint call to get bookings by provided reference number
function getBookingByRefNumber(ref_number){

    if(document.getElementById("booking-container-search-results-pane").style.display === "none"){
        show_bookings_pane_search_results_page();
    }
    render_component_loader_markup("bookings-pane-search-results-bookings-list");

    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/api/bookings/get-by-reference-number/${ref_number}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${USER_TOKEN}`
        },
        success: res => {
            
            if(res.length < 1){
                render_no_booking_found_markup("bookings-pane-search-results-bookings-list");
                return null;
            }

            //setting pagination
            set_search_pagination_initial_pages_numbers("search", 300, 10, 
                                                "search_results_bookings_pagination_list_markup", 
                                                "search_pagination_page_numbers_list", 
                                                "search_bookings_pagination_nextbtn", 
                                                "search_bookings_pagination_prevbtn");
            for(let r=0; r<search_last_page_number_index; r++){
                add_event_listeners_to_page_numbers("search", search_pages_arr[r]);
            }

            console.log(res);
            render_search_result_bookings_markup(res, "confirmation");
        },
        error: err => {
            render_no_booking_found_markup("bookings-pane-search-results-bookings-list");
            console.log(err);
        }
    });
}

export function getBookingById(id){
    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/api/bookings/get-by-id/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${USER_TOKEN}`
        },
        success: async res => {
            console.log(res);
            let order_id = res?.originPayloads[0]?.id;
            let bi = await get_and_return_booking_intent(order_id);
            res.booking_intent=bi;
            console.log("bi:", res.booking_intent);
            render_selected_booking_details(res);
        },
        error: err => {
            console.log(err);
        }
    });
}

function searchHotelBookings(name, city, email, checkin, checkout){

    if(document.getElementById("booking-container-search-results-pane").style.display === "none"){
        show_bookings_pane_search_results_page();
    }
    render_component_loader_markup("bookings-pane-search-results-bookings-list");

    let postObj = {
        name: name,
        city: city,
        email: email,
        checkin: checkin,
        checkout: checkout
    };

    $.ajax({
        type: "POST",
        url: `${serverBaseURL}/search-booked-hotel/`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(postObj),
        success: res => {
            console.log(res.length)
            if(res.length < 1){
                render_no_booking_found_markup("bookings-pane-search-results-bookings-list");
                return null;
            }

            //setting pagination
            set_search_pagination_initial_pages_numbers("search", 300, 10, "search_results_bookings_pagination_list_markup", "search_pagination_page_numbers_list", "search_bookings_pagination_nextbtn", "search_bookings_pagination_prevbtn");
            for(let r=0; r<search_last_page_number_index; r++){
                add_event_listeners_to_page_numbers("search", search_pages_arr[r]);
            }

            console.log(res);
            render_search_result_bookings_markup(res, "hotel");
        },
        error: err =>{
            console.log(err);
        }
    });

}

function searchFlghtBookings(origin, destination, email, departure, returnDt, skip, limit){

    if(document.getElementById("booking-container-search-results-pane").style.display === "none"){
        show_bookings_pane_search_results_page();
    }
    render_component_loader_markup("bookings-pane-search-results-bookings-list");

    let postObj = {
        origin: origin,
        destination: destination,
        email: email,
        departureDate: departure,
        returnDate: returnDt
    };

    $.ajax({
        type: "POST",
        url: `${serverBaseURL}/api/bookings/search/${skip}/${limit}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${USER_TOKEN}`
        },
        data: JSON.stringify(postObj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (res, status, xhr) => {
            
            if(res.length < 1){
                render_no_booking_found_markup("bookings-pane-search-results-bookings-list");
                return null;
            }

            //setting pagination
            let total_items = parseInt(xhr.getResponseHeader('pagination-total-items'));
            
            set_search_pagination_initial_pages_numbers(
                "search", total_items, limit, 
                "search_results_bookings_pagination_list_markup", 
                "search_pagination_page_numbers_list", 
                "search_bookings_pagination_nextbtn", 
                "search_bookings_pagination_prevbtn",
                onclickSearchBookedFlights
            );
            
            for(let r=0; r<=search_last_page_number_index; r++){
                add_event_listeners_to_page_numbers(
                    "search", 
                    search_pages_arr[r], 
                    onclickSearchBookedFlights,
                    limit
                );
            }

            console.log(res);
            render_search_result_bookings_markup(res, "flight");
        },
        error: err =>{
            render_no_booking_found_markup("bookings-pane-search-results-bookings-list");
            console.log(err);
        }
    });

}

function get_notifications(skip, limit){
    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-notifications/${skip}/${limit}`,
        success: res => {
            //render notification function here
            console.log("notifications response: ", res);
        },
        error: err => {
            console.log(err);
        }
    });
}

export function getNextPageRecentBookings(skip){
    recentBookingsPaginationSkip = skip;
    get_recent_bookings(recentBookingsPaginationSkip, recentBookingsPaginationLimit);
}
//actions
export function onclickGetBookingByConfirmation(){

    let confirmation = document.getElementById("search-booking-by-confirmation-input").value;
    if(confirmation === ""){
        document.getElementById("search-booking-by-confirmation-input").focus();
        document.getElementById("search-booking-by-confirmation-input").placeholder = "confirmation is requied";
        document.getElementById("search-booking-by-confirmation-input").style.backgroundColor = "rgba(255,0,0,0.2)";
    }else{
        getBookingByRefNumber(confirmation);
    }
    
}

export function searchByConfirmationOninput(){
    document.getElementById("search-booking-by-confirmation-input").style.backgroundColor = "white";
}

export function onclickSearchBookedHotel(){

    let name = document.getElementById("booked-hotel-search-name-input").value;
    let city = document.getElementById("booked-hotel-search-city-input").value;
    let email = document.getElementById("booked-hotel-search-email-input").value;
    let dates = document.getElementById("booked-hotel-search-dates-input").value;
    let checkin = dates.split("to")[0];
    let checkout = dates.split("to")[1];

    searchHotelBookings(name, city, email, checkin, checkout);
}

export function onclickSearchBookedFlights(skip=sp_recentBookingsPaginationSkip, limit=sp_recentBookingsPaginationLimit){

    let origin = document.getElementById("booked-flight-search-origin-input")?.iata || "";
    let destination = document.getElementById("booked-flight-search-destination-input")?.iata || "";
    let email = document.getElementById("booked-flight-search-email-input").value;
    //let dates = document.getElementById("booked-flight-search-dates-input").value;
    //let departure = dates.split(" - ")[0];
    //let returnDt = dates.split(" - ")[1];
    let departure = document.getElementById("booked-flight-search-dates-input").value;
    let returnDt = "";
    if(document.getElementById("flight_search_unk_date_checkbox"))
        if(document.getElementById("flight_search_unk_date_checkbox").checked)
        departure="";

    searchFlghtBookings(
        origin, 
        destination, 
        email, 
        departure, 
        returnDt, 
        skip, 
        limit
    );
}

//onpageload functions
function get_recent_bookings(skip, limit){

    render_component_loader_markup("bookings-pane-recent-bookings-list");

    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/api/bookings/get-recent/${skip}/${limit}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${USER_TOKEN}`
        },
        success: (res, status, xhr) => {
            
            //console.log(res);
            if(res.length < 1){
                render_no_booking_found_markup("bookings-pane-recent-bookings-list");
                return null;
            }
            // bookings rendering
            render_recent_bookings_markup(res);
            
            // pagination rendering
            let total_items = parseInt(xhr.getResponseHeader('pagination-total-items'));
            window.__init_pagination_helper_functions(
                "recent", total_items, limit, 
                "recent_bookings_pagination_list_markup", 
                "pagination_page_numbers_list", 
                "recent_bookings_pagination_nextbtn", 
                "recent_bookings_pagination_prevbtn",
                get_recent_bookings
            );
        },
        error: err => {
            render_no_booking_found_markup("bookings-pane-recent-bookings-list");
            console.log(err);
        }
    });
}

export async function get_and_return_booking_intent(order_id){
    return await $.ajax({
        type: "GET",
        url: `${serverBaseURL}/api/bookings/get-booking-intent/${order_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${USER_TOKEN}`
        },
        success: res => {
            console.log(res);
            return res;
        },
        error: err => {
            console.log(err);
            return [];
        }
    });
}

// Initializations
window.__inits_from_endpoing_calls_file = () => {
    get_notifications(0,100);
    get_recent_bookings(recentBookingsPaginationSkip, recentBookingsPaginationLimit);
};