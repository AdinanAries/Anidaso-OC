import $ from "jquery";

export function show_main_menu(){
    $("#main-menu-container").animate({
        width: "toggle"
    });
}

export function show_booking_search_type_form(type){
    if(type === "flights"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-flights-option");
    }else if(type === "hotels"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-hotels-option");
    }else if(type === "cars"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-cars-option");
    }

}

function setActiveNavOption(className, id){
    Array.from(document.getElementsByClassName(className)).forEach(
        each => each.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

/*$(".box").animate({
    width: "toggle"
});*/