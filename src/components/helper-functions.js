import $ from "jquery";

export function show_main_menu(){
    $("#main-menu-container").animate({
        width: "toggle"
    });
}

export function show_booking_search_type_form(type){
    if(type === "flights"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-flights-option");
        document.getElementById("bookings-pane-booked-hotels-search-form").style.display = "none";
        document.getElementById("bookings-pane-booked-cars-search-form").style.display = "none";
        $("#bookings-pane-booked-flights-search-form").toggle("up");
    }else if(type === "hotels"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-hotels-option");
        document.getElementById("bookings-pane-booked-flights-search-form").style.display = "none";
        document.getElementById("bookings-pane-booked-cars-search-form").style.display = "none";
        $("#bookings-pane-booked-hotels-search-form").toggle("up");
    }else if(type === "cars"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-cars-option");
        document.getElementById("bookings-pane-booked-flights-search-form").style.display = "none";
        document.getElementById("bookings-pane-booked-hotels-search-form").style.display = "none";
        $("#bookings-pane-booked-cars-search-form").toggle("up");
    }

}

function setActiveNavOption(className, id){
    Array.from(document.getElementsByClassName(className)).forEach(
        each => each.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

export function toggle_show_main_sections(type){

    if($(window).width() <= 700){
        //show_main_menu();
        document.getElementById("main-menu-container").style.display = "none";
    }

    document.getElementById("notifications-container").style.display = "none";

    document.getElementById("bookings-container").style.display = "none";
    document.getElementById("channels-container").style.display = "none";
    document.getElementById("support-container").style.display = "none";
    document.getElementById("analytics-container").style.display = "none";
    document.getElementById("customers-container").style.display = "none";
    document.getElementById("clients-container").style.display = "none";
    document.getElementById("staff-container").style.display = "none";
    document.getElementById("deals-container").style.display = "none";
    document.getElementById("sales-container").style.display = "none";
    document.getElementById("marketing-container").style.display = "none";
    document.getElementById("settings-container").style.display = "none";

    document.getElementById("top-menu-settings-btn").classList.remove("active");
    document.getElementById("top-menu-notifications-btn").classList.remove("active");

    if(type === "bookings"){
        setActiveNavOption("side-menu-each-item", "side-menu-bookings-item");
        $("#bookings-container").toggle("up");
    }else if(type === "channels"){
        setActiveNavOption("side-menu-each-item", "side-menu-channels-item");
        $("#channels-container").toggle("up");
    }else if(type === "support"){
        setActiveNavOption("side-menu-each-item", "side-menu-support-item");
        $("#support-container").toggle("up");
    }else if(type === "analytics"){
        setActiveNavOption("side-menu-each-item", "side-menu-analytics-item");
        $("#analytics-container").toggle("up");
    }else if(type === "customers"){
        setActiveNavOption("side-menu-each-item", "side-menu-customers-item");
        $("#customers-container").toggle("up");
    }else if(type === "clients"){
        setActiveNavOption("side-menu-each-item", "side-menu-clients-item");
        $("#clients-container").toggle("up");
    }else if(type === "staff"){
        setActiveNavOption("side-menu-each-item", "side-menu-staff-item");
        $("#staff-container").toggle("up");
    }else if(type === "deals"){
        setActiveNavOption("side-menu-each-item", "side-menu-deals-item");
        $("#deals-container").toggle("up");
    }else if(type === "sales"){
        setActiveNavOption("side-menu-each-item", "side-menu-sales-item");
        $("#sales-container").toggle("up");
    }
    else if(type === "marketing"){
        setActiveNavOption("side-menu-each-item", "side-menu-marketing-item");
        $("#marketing-container").toggle("up");
    }else if(type === "settings"){
        setActiveNavOption("side-menu-each-item", "top-menu-settings-btn");
        $("#settings-container").toggle("up");
    }
}

export function show_bookings_pane_search_results_page(){
    document.getElementById("bookings-container-main-pane").style.display = "none";
    document.getElementById("booking-container-selected-results-pane").style.display = "none";
    $("#booking-container-search-results-pane").toggle("up");
}

export function show_bookings_pane_main_page(){
    document.getElementById("booking-container-search-results-pane").style.display = "none";
    document.getElementById("booking-container-selected-results-pane").style.display = "none";
    $("#bookings-container-main-pane").toggle("up");
}

export function show_bookings_pane_selected_results_page(){
    document.getElementById("bookings-container-main-pane").style.display = "none";
    document.getElementById("booking-container-search-results-pane").style.display = "none";
    $("#booking-container-selected-results-pane").toggle("up");
}

export function show_notifications_container(){
    $("#notifications-container").toggle("up");
    setTimeout(()=>{
        if(document.getElementById("notifications-container").style.display === "none"){
            document.getElementById("top-menu-notifications-btn").classList.remove("active");
        }else{
            document.getElementById("top-menu-notifications-btn").classList.add("active");
        }
    }, 500);
}

/*$(".box").animate({
    width: "toggle"
});*/