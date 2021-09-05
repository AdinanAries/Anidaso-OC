import $ from "jquery";

const serverBaseURL = "http://localhost:6000";

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

function getFlightBookingById(id){
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

function getHotelBookingById(id){
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

//actions
export function onclickGetBookingByConfirmation(){

    let confirmation = document.getElementById("input").value;
    if(confirmation === ""){
        alert("please enter confirmation number");
    }else{
        getBookingByConfirmation(confirmation);
    }
    
}