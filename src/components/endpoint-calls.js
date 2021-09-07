import $ from "jquery";
import { show_bookings_pane_search_results_page } from "./helper-functions";

const serverBaseURL = "http://localhost:4000";

let recentBookingsPaginationFirst = 1;
let recentBookingsPaginationLast = 50;

function getBookingByConfirmation(confirmation){
    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-recent-bookings/${confirmation}`,
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}

export function getFlightBookingById(id){
    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-flight-booking-by-id/${id}`,
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}

export function getHotelBookingById(id){
    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-hotel-booking-by-id/${id}`,
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}

function searchHotelBookings(name, city, email, checkin, checkout){

    show_bookings_pane_search_results_page();

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
            console.log(res);
        },
        error: err =>{
            console.log(err);
        }
    });

}

function searchFlghtBookings(origin, destination, email, departure, returnDt){

    show_bookings_pane_search_results_page();

    let postObj = {
        origin: origin,
        destination: destination,
        emai: email,
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
            console.log(res);
        },
        error: err =>{
            console.log(err);
        }
    });

}

export function getNextPageRecentBookings(){
    recentBookingsPaginationFirst = recentBookingsPaginationLast;
    recentBookingsPaginationLast += 50;
    get_recent_bookings(recentBookingsPaginationFirst, recentBookingsPaginationLast);
}
//actions
export function onclickGetBookingByConfirmation(){

    let confirmation = document.getElementById("input").value;
    if(confirmation === ""){
        alert("please enter confirmation number");
    }else{
        getBookingByConfirmation(confirmation);
    }
    
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
    let dates = document.getElementById("booked-flight-search-dates-input").value;
    let departure = dates.split("to")[0];
    let returnDt = dates.split("to")[1];

    searchFlghtBookings(origin, destination, email, departure, returnDt)
}

//onpageload functions
function get_recent_bookings(pagesfrom, pagesto){
    $.ajax({
        type: "GET",
        url: `${serverBaseURL}/get-recent-bookings/${pagesfrom}/${pagesto}`,
        success: res => {
            console.log(res);
        },
        error: err => {
            console.log(err);
        }
    });
}

setTimeout(()=>{
    get_recent_bookings(recentBookingsPaginationFirst, recentBookingsPaginationLast);
})