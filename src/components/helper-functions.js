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
    document.getElementById("top-menu-notifications-btn").classList.add("active");
    /*setTimeout(()=>{
        if(document.getElementById("notifications-container").style.display === "none"){
            document.getElementById("top-menu-notifications-btn").classList.remove("active");
        }else{
            document.getElementById("top-menu-notifications-btn").classList.add("active");
        }
    }, 500);*/
}

export function hide_notifications_container(){
    $("#notifications-container").toggle("up");
    document.getElementById("top-menu-notifications-btn").classList.remove("active");
}

function generate_pagination_markup_view(numbers_list_elem_id, nextbtn, prevbtn){
    return `
        <div id="${prevbtn}" class="previous-next-btn">
            <i class="fa fa-caret-left"></i>
        </div>
        <div id="${numbers_list_elem_id}" class="numbers">
            
        </div>
        <div id="${nextbtn}" style="margin-left: 5px;" class="previous-next-btn">
            <i class="fa fa-caret-right"></i>
        </div>
    `;
}

function get_all_page_numbers(total_recs, limit){
    let all_number_arr = [];
    for(let p = 1; p < total_recs; p += limit){
        all_number_arr.push(p);
    }
    return all_number_arr;
}

function generate_pagination_page_number(which, seed, limit, total, is_initial=false, current_active_page){
    console.log(seed, limit, total)
    let all_numbers_markup = "";
    
    for(let p = seed; p < total; p+=limit){
        
        if(current_active_page === p){
            all_numbers_markup += `
                <div id="${which}_pagination_each_number_${p}" class="each-number active">
                    ${p}
                </div>
            `;
        }else{
            all_numbers_markup += `
                <div id="${which}_pagination_each_number_${p}" class="each-number">
                    ${p}
                </div>
            `;
        }

        //console.log(`${which}_pagination_each_number_${p}`);

    }

    return all_numbers_markup;
}

export function add_event_listeners_to_page_numbers(which, p){
    
    //console.log("p: ", p, ", which: ", which)
    //console.log(document.getElementById(`${which}_pagination_each_number_${p}`));

    document.getElementById(`${which}_pagination_each_number_${p}`).addEventListener("click", evnt=>{
        //alert(which)
        if(which === "recent"){

            Array.from(document.getElementsByClassName("each-number")).forEach(each => {
                each.classList.remove("active")
            });
            document.getElementById(`${which}_pagination_each_number_${p}`).classList.add("active");

            current_active_page_number = p;

        }else if(which === "search"){

            Array.from(document.getElementsByClassName("each-number")).forEach(each => {
                each.classList.remove("active")
            });
            document.getElementById(`${which}_pagination_each_number_${p}`).classList.add("active");

            search_current_active_page_number = p;
            //alert(search_current_active_page_number)

        }

    });
}

export let all_pages_arr;
export let search_pages_arr;

//depending on page width
let seed;
let search_seed;
let total;
let search_total;
let limit;
let search_limit;
let current_active_page_number = 1;
let search_current_active_page_number = 1;
let first_page_number_index = 0;
export let search_first_page_number_index = 0;
let last_page_number_index = 9;
export let search_last_page_number_index = 9;

export function set_pagination_initial_pages_numbers(which, total_recs, limit_p, container_elem_id, numbers_list_elem_id, nextbtn, prevbtn){
    
    limit = limit_p;
    all_pages_arr = get_all_page_numbers(total_recs, limit);

    //depending on page width
    seed = all_pages_arr[first_page_number_index];
    total = all_pages_arr[last_page_number_index];

    document.getElementById(container_elem_id).innerHTML = generate_pagination_markup_view(numbers_list_elem_id, nextbtn, prevbtn);
    document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, seed, limit, total, true, current_active_page_number);

    document.getElementById(nextbtn).addEventListener("click", evnt => {
        set_pagination_next_pages_numbers(which, numbers_list_elem_id);
    });
    document.getElementById(prevbtn).addEventListener("click", evnt => {
        set_pagination_previous_pages_numbers(which, numbers_list_elem_id)
    });

}

export function set_search_pagination_initial_pages_numbers(which, total_recs, limit_p, container_elem_id, numbers_list_elem_id, nextbtn, prevbtn){
    
    search_limit = limit_p;
    search_pages_arr = get_all_page_numbers(total_recs, search_limit);

    //depending on page width
    search_seed = search_pages_arr[search_first_page_number_index];
    search_total = search_pages_arr[search_last_page_number_index];

    document.getElementById(container_elem_id).innerHTML = generate_pagination_markup_view(numbers_list_elem_id, nextbtn, prevbtn);
    document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, search_seed, search_limit, search_total, true, search_current_active_page_number);

    document.getElementById(nextbtn).addEventListener("click", evnt => {
        set_search_pagination_next_pages_numbers(which, numbers_list_elem_id);
    });
    document.getElementById(prevbtn).addEventListener("click", evnt => {
        set_search_pagination_previous_pages_numbers(which, numbers_list_elem_id)
    });

}

export function set_pagination_next_pages_numbers(which, numbers_list_elem_id){

    ++first_page_number_index;
    ++last_page_number_index;

    if(last_page_number_index < all_pages_arr.length){

        seed = all_pages_arr[first_page_number_index];
        total = all_pages_arr[last_page_number_index];
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, seed, limit, total,false,current_active_page_number);

        for(let r=first_page_number_index; r<last_page_number_index; r++){
            add_event_listeners_to_page_numbers("recent", all_pages_arr[r]);
        }

    }else{
        --first_page_number_index;
        --last_page_number_index;
    }
}

export function set_search_pagination_next_pages_numbers(which, numbers_list_elem_id){

    ++search_first_page_number_index;
    ++search_last_page_number_index;

    if(search_last_page_number_index < search_pages_arr.length){

        search_seed = search_pages_arr[search_first_page_number_index];
        search_total = search_pages_arr[search_last_page_number_index];
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, search_seed, search_limit, search_total,false,search_current_active_page_number);

        for(let r=search_first_page_number_index; r<search_last_page_number_index; r++){
            add_event_listeners_to_page_numbers("search", search_pages_arr[r]);
        }

    }else{
        --search_first_page_number_index;
        --search_last_page_number_index;
    }
}

export function set_pagination_previous_pages_numbers(which, numbers_list_elem_id){

    --first_page_number_index;
    --last_page_number_index;

    if(first_page_number_index >= 0){

        seed = all_pages_arr[first_page_number_index];
        total = all_pages_arr[last_page_number_index];
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, seed, limit, total, false, current_active_page_number);

        for(let r=first_page_number_index; r<last_page_number_index; r++){
            add_event_listeners_to_page_numbers("recent", all_pages_arr[r]);
        }

    }else{
        ++first_page_number_index;
        ++last_page_number_index;
    }
}

export function set_search_pagination_previous_pages_numbers(which, numbers_list_elem_id){

    --search_first_page_number_index;
    --search_last_page_number_index;

    if(search_first_page_number_index >= 0){

        search_seed = search_pages_arr[search_first_page_number_index];
        search_total = search_pages_arr[search_last_page_number_index];
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, search_seed, search_limit, search_total, false, search_current_active_page_number);

        for(let r=search_first_page_number_index; r<search_last_page_number_index; r++){
            add_event_listeners_to_page_numbers("search", search_pages_arr[r]);
        }

    }else{
        ++search_first_page_number_index;
        ++search_last_page_number_index;
    }
}

$(document).ready(()=>{
    set_pagination_initial_pages_numbers("recent", 300, 20, "recent_bookings_pagination_list_markup", "pagination_page_numbers_list", "recent_bookings_pagination_nextbtn", "recent_bookings_pagination_prevbtn");
    for(let r=0; r<last_page_number_index; r++){
        add_event_listeners_to_page_numbers("recent", all_pages_arr[r]);
    }
    //console.log(document.getElementById("recent_pagination_each_number_1"));
    
});

/*$(".box").animate({
    width: "toggle"
});*/