import $ from "jquery";
import { show_bookings_pane_search_results_page, set_search_pagination_initial_pages_numbers, add_event_listeners_to_page_numbers, search_pages_arr, search_last_page_number_index } from "./helper-functions";
import { render_recent_bookings_markup, render_search_result_bookings_markup, render_selected_booking_details, render_component_loader_markup, render_no_booking_found_markup } from "./markup-rendering";

const serverBaseURL = "http://localhost:4000";

let recentBookingsPaginationSkip = 1;
let recentBookingsPaginationLimit = 20;

function getBookingByConfirmation(confirmation){

    if(document.getElementById("booking-container-search-results-pane").style.display === "none"){
        show_bookings_pane_search_results_page();
    }
    render_component_loader_markup("bookings-pane-search-results-bookings-list");

    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-booking-by-confirmation-number/${confirmation}`,
        success: res => {
            
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
        url: `${serverBaseURL}/get-booking-by-id/${id}`,
        success: res => {
            console.log(res);
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

function searchFlghtBookings(origin, destination, email, departure, returnDt){

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
        url: `${serverBaseURL}/search-booked-flight/`,
        data: JSON.stringify(postObj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: res => {
            
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
            render_search_result_bookings_markup(res, "flight");
        },
        error: err =>{
            render_no_booking_found_markup("bookings-pane-search-results-bookings-list");
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
        getBookingByConfirmation(confirmation);
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

export function onclickSearchBookedFlights(){

    let origin = document.getElementById("booked-flight-search-origin-input").value;
    let destination = document.getElementById("booked-flight-search-destination-input").value;
    let email = document.getElementById("booked-flight-search-email-input").value;
    //let dates = document.getElementById("booked-flight-search-dates-input").value;
    //let departure = dates.split(" - ")[0];
    //let returnDt = dates.split(" - ")[1];
    let departure = document.getElementById("booked-flight-search-dates-input").value;
    let returnDt = "";

    searchFlghtBookings(origin, destination, email, departure, returnDt)
}

//onpageload functions
function get_recent_bookings(skip, limit){

    render_component_loader_markup("bookings-pane-recent-bookings-list");

    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-recent-bookings/${skip}/${limit}`,
        success: res => {
            console.log(res);
            if(res.lenght < 1){
                render_no_booking_found_markup("bookings-pane-recent-bookings-list");
            }
            render_recent_bookings_markup(res);
        },
        error: err => {
            render_no_booking_found_markup("bookings-pane-recent-bookings-list");
            console.log(err);
        }
    });
}

setTimeout(()=>{
    get_recent_bookings(recentBookingsPaginationSkip, recentBookingsPaginationLimit);
})