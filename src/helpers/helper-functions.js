import $ from "jquery";
import { getBookingById } from "./endpoint-calls";
import CONSTANTS from "../constants/Constants";

export let all_pages_arr;
export let search_pages_arr;


// pagination globals
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
let last_page_number_index = CONSTANTS.pagination.length; // Pagination lenght, anything after will be require to use the next button
export let search_last_page_number_index = CONSTANTS.pagination.length; // Pagination lenght, anything after will be require to use the next button

export function reset_pagination_params(){
    current_active_page_number = 1;
    search_current_active_page_number = 1;
    first_page_number_index = 0;
    search_first_page_number_index = 0;
    last_page_number_index = CONSTANTS.pagination.length; // Pagination lenght, anything after will be require to use the next button
    search_last_page_number_index = CONSTANTS.pagination.length; // Pagination lenght, anything after will be require to use the next button
}

// where refers to the originating page section. eg. home, search, etc.
let where = "home";
export function select_booking_from_list(where_param, id="none"){
    where = where_param;
    // Clearing current Health Status Data
    window.__forceSetBookingHealthCheckerData({});
    // Resets
    document.getElementById("selected_booking_general_information_container").innerHTML = "";
    document.getElementById("selected_booking_travelers_or_guests_list").innerHTML = "";
    document.getElementById("selected_booking_flights_segments_container").innerHTML = "";
    document.getElementById("selected_booking_flights_prices_container").innerHTML = "";
    document.getElementById("selected_booking_booking_vs_payment_status_information").innerHTML = "";
    document.getElementById("selected_booking_additional_info_container").innerHTML = "";

    show_bookings_pane_selected_results_page()
    getBookingById(id);
}

export function back_from_selected_result_pane(){
    if(where === "home"){
        show_bookings_pane_main_page();
    }else if(where === "results"){
        show_bookings_pane_search_results_page();
    }
}

export function show_main_menu(){
    $("#main-menu-container").animate({
        width: "toggle"
    });
}

export function rgbToHex(rgb_string) {
    //"rgb(255,255,255)"
    let __proper = rgb_string.replaceAll("rgb(","").replaceAll(")","");
    __proper=__proper.split(",");
    let r=parseInt(__proper[0].trim());
    let g=parseInt(__proper[1].trim());
    let b=parseInt(__proper[2].trim());
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

export function show_booking_search_type_form(type){
    if(type === "flights"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-flights-option");
        document.getElementById("bookings-pane-booked-hotels-search-form").style.display = "none";
        document.getElementById("bookings-pane-booked-cars-search-form").style.display = "none";
        if(document.getElementById("bookings-pane-booked-flights-search-form").style.display==="none")
            $("#bookings-pane-booked-flights-search-form").toggle("up");
    }else if(type === "hotels"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-hotels-option");
        document.getElementById("bookings-pane-booked-flights-search-form").style.display = "none";
        document.getElementById("bookings-pane-booked-cars-search-form").style.display = "none";
        if(document.getElementById("bookings-pane-booked-hotels-search-form").style.display==="none")
            $("#bookings-pane-booked-hotels-search-form").toggle("up");
    }else if(type === "cars"){
        setActiveNavOption("booking-pane-search-type-each-option", "booking-pane-search-type-cars-option");
        document.getElementById("bookings-pane-booked-flights-search-form").style.display = "none";
        document.getElementById("bookings-pane-booked-hotels-search-form").style.display = "none";
        if(document.getElementById("bookings-pane-booked-cars-search-form").style.display==="none")
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
        window.__loadSalesPageData();
    }
    else if(type === "marketing"){
        setActiveNavOption("side-menu-each-item", "side-menu-marketing-item");
        $("#marketing-container").toggle("up");
    }else if(type === "settings"){
        setActiveNavOption("side-menu-each-item", "top-menu-settings-btn");
        $("#settings-container").toggle("up");
        //reload_business_settings_page_customer_app_preview_iframe();
    }
}

export function reload_business_settings_page_customer_app_preview_iframe() {
    try {
        document.getElementById('business-settings-page-customer-app-preview-iframe').contentWindow.location.reload();
    }catch(e){
        document.getElementById('business-settings-page-customer-app-preview-iframe').src = document.getElementById('business-settings-page-customer-app-preview-iframe').src;
        console.warn(e);
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
    if(document.getElementById("booking-container-selected-results-pane").style.display==="none")
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
    
    for(let p = seed; (p-limit) < total; p+=limit){

        let sp_each_number_css_class=""
        if(which==="search"){
            sp_each_number_css_class="sp-pagi-each-number";
        }
        
        if(current_active_page === p){
            all_numbers_markup += `
                <div id="${which}_pagination_each_number_${p}" class="each-number ${sp_each_number_css_class} active">
                    ${p}
                </div>
            `;
        }else{
            all_numbers_markup += `
                <div id="${which}_pagination_each_number_${p}" class="each-number ${sp_each_number_css_class}">
                    ${p}
                </div>
            `;
        }

        //console.log(`${which}_pagination_each_number_${p}`);

    }

    return all_numbers_markup;
}

export function add_event_listeners_to_page_numbers(which, p, call_back, page_size){
    
    //alert(which, p)

    //console.log("p: ", p, ", which: ", which)
    //console.log(document.getElementById(`${which}_pagination_each_number_${p}`));

    if(document.getElementById(`${which}_pagination_each_number_${p}`))
        document.getElementById(`${which}_pagination_each_number_${p}`).addEventListener("click", evnt =>{
            if(which === "recent"){

                Array.from(document.getElementsByClassName("each-number")).forEach(each => {
                    each.classList.remove("active")
                });
                document.getElementById(`${which}_pagination_each_number_${p}`).classList.add("active");

                current_active_page_number = p;
                call_back(p, page_size);

            }else if(which === "search"){
                Array.from(document.getElementsByClassName("sp-pagi-each-number")).forEach(each => {
                    each.classList.remove("active")
                });
                document.getElementById(`${which}_pagination_each_number_${p}`).classList.add("active");

                search_current_active_page_number = p;
                call_back(p, page_size);
                //alert(search_current_active_page_number)

            }

        });
}

export function set_pagination_initial_pages_numbers(
    which, 
    total_recs, 
    limit_p, 
    container_elem_id, 
    numbers_list_elem_id, 
    nextbtn, 
    prevbtn,
    call_back,
){
    
    limit = limit_p;
    all_pages_arr = get_all_page_numbers(total_recs, limit);
    if(all_pages_arr.length<last_page_number_index)
        last_page_number_index=(all_pages_arr.length-1);

    //depending on page width
    seed = all_pages_arr[first_page_number_index];
    total = all_pages_arr[last_page_number_index];
    if(!seed || !total)
        return;
    if(document.getElementById(container_elem_id))
        document.getElementById(container_elem_id).innerHTML = generate_pagination_markup_view(numbers_list_elem_id, nextbtn, prevbtn);
    if(document.getElementById(numbers_list_elem_id))
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, seed, limit, total, true, current_active_page_number);

    if(document.getElementById(nextbtn))
        document.getElementById(nextbtn).addEventListener("click", evnt => {
            set_pagination_next_pages_numbers(which, numbers_list_elem_id, call_back, limit_p);
        });
    if(document.getElementById(prevbtn))
        document.getElementById(prevbtn).addEventListener("click", evnt => {
            set_pagination_previous_pages_numbers(which, numbers_list_elem_id, call_back, limit_p)
        });

}

export function set_search_pagination_initial_pages_numbers(
    which, 
    total_recs, 
    limit_p, 
    container_elem_id, 
    numbers_list_elem_id, 
    nextbtn, 
    prevbtn,
    callback
){

    search_limit = limit_p;
    search_pages_arr = get_all_page_numbers(total_recs, search_limit);
    if(search_pages_arr.length<search_last_page_number_index)
        search_last_page_number_index=(search_pages_arr.length-1);

    //depending on page width
    search_seed = search_pages_arr[search_first_page_number_index];
    search_total = search_pages_arr[search_last_page_number_index];
    
    if(!search_seed || !search_total)
        return;
    if(document.getElementById(container_elem_id))
        document.getElementById(container_elem_id)
            .innerHTML = generate_pagination_markup_view(numbers_list_elem_id, nextbtn, prevbtn);
    if(document.getElementById(numbers_list_elem_id))
        document.getElementById(numbers_list_elem_id)
            .innerHTML = generate_pagination_page_number(
                which, 
                search_seed, 
                search_limit, 
                search_total, 
                true, 
                search_current_active_page_number
            );

    if(document.getElementById(nextbtn))
        document.getElementById(nextbtn).addEventListener("click", evnt => {
            set_search_pagination_next_pages_numbers(which, numbers_list_elem_id, callback, limit_p);
        });
    if(document.getElementById(prevbtn))
        document.getElementById(prevbtn).addEventListener("click", evnt => {
            set_search_pagination_previous_pages_numbers(which, numbers_list_elem_id, callback, limit_p)
        });

}

export function set_pagination_next_pages_numbers(which, numbers_list_elem_id, call_back, limit_p){

    ++first_page_number_index;
    ++last_page_number_index;

    if(last_page_number_index <= all_pages_arr.length){

        seed = all_pages_arr[first_page_number_index];
        total = all_pages_arr[last_page_number_index];
        if(!seed || !total)
            return;
        if(document.getElementById(numbers_list_elem_id))
            document.getElementById(numbers_list_elem_id)
                .innerHTML = generate_pagination_page_number(
                                                        which, 
                                                        seed, 
                                                        limit, 
                                                        total,
                                                        false,
                                                        current_active_page_number
                                                    );

        for(let r=first_page_number_index; r<=last_page_number_index; r++){
            add_event_listeners_to_page_numbers("recent", all_pages_arr[r], call_back, limit_p);
        }

    }else{
        --first_page_number_index;
        --last_page_number_index;
    }
}

export function set_search_pagination_next_pages_numbers(which, numbers_list_elem_id, call_back, limit_p){

    ++search_first_page_number_index;
    ++search_last_page_number_index;

    if(search_last_page_number_index < search_pages_arr.length){

        search_seed = search_pages_arr[search_first_page_number_index];
        search_total = search_pages_arr[search_last_page_number_index];
        if(!search_seed || !search_total)
            return;
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, search_seed, search_limit, search_total,false,search_current_active_page_number);

        for(let r=search_first_page_number_index; r<=search_last_page_number_index; r++){
            add_event_listeners_to_page_numbers("search", search_pages_arr[r], call_back, limit_p);
        }

    }else{
        --search_first_page_number_index;
        --search_last_page_number_index;
    }
}

export function set_pagination_previous_pages_numbers(which, numbers_list_elem_id, call_back, limit_p){

    --first_page_number_index;
    --last_page_number_index;

    if(first_page_number_index >= 0){

        seed = all_pages_arr[first_page_number_index];
        total = all_pages_arr[last_page_number_index];
        if(!seed || !total)
            return;
        document.getElementById(numbers_list_elem_id)
            .innerHTML = generate_pagination_page_number(
                                                    which, 
                                                    seed, 
                                                    limit, 
                                                    total, 
                                                    false, 
                                                    current_active_page_number
                                                );

        for(let r=first_page_number_index; r<=last_page_number_index; r++){
            add_event_listeners_to_page_numbers("recent", all_pages_arr[r], call_back, limit_p);
        }

    }else{
        ++first_page_number_index;
        ++last_page_number_index;
    }
}

export function set_search_pagination_previous_pages_numbers(which, numbers_list_elem_id, call_back, limit_p){

    --search_first_page_number_index;
    --search_last_page_number_index;

    if(search_first_page_number_index >= 0){

        search_seed = search_pages_arr[search_first_page_number_index];
        search_total = search_pages_arr[search_last_page_number_index];
        if(!search_seed || !search_total)
            return;
        document.getElementById(numbers_list_elem_id).innerHTML = generate_pagination_page_number(which, search_seed, search_limit, search_total, false, search_current_active_page_number);

        for(let r=search_first_page_number_index; r<=search_last_page_number_index; r++){
            add_event_listeners_to_page_numbers("search", search_pages_arr[r], call_back, limit_p);
        }

    }else{
        ++search_first_page_number_index;
        ++search_last_page_number_index;
    }
}

export function return_headers_as_array_from_object(obj){
    let keys = Object.keys(obj);
    let headers=[];
    for(let key of keys ){
        let header = key
            ?.toString()
            ?.replaceAll("-", " ")
            ?.replaceAll("_", " ");
        headers.push(header);
    }
    return headers;
}

export function return_values_as_array_from_obj(obj){
    let values = Object.values(obj);
    return values;
}

export const getClient = async () => {
    const client={};
    // Browser
    client.device=navigator.userAgent;
    return client;
}

export const prepareQuilEditorContentForStorage = (html_text) => {
    return html_text?.replaceAll("input", "input style='display: none;'")
            ?.replaceAll('contenteditable="true"', 'contenteditable="false"')
            ?.replaceAll('class="ql-editor"', 'class="ql-editor" style="padding: 0; font-size: 13px;"');
}

export function calculateActionPoints(total_money_amount, actions_per_unit=10){
    // 10 actions = $1
    // 1 action = $x;
    // 10x = 1*1
    // x = 1/10
    //let unit_amout = (1/actions_per_unit);
    if(!total_money_amount){
        alert("Please add total money amount to calculate action points");
        return 0;
    }
    if(!actions_per_unit){
        alert("Please add number of actions per unit to calculate action points");
        return 0;
    }
    return (total_money_amount*actions_per_unit).toFixed(0);

}

export const add_commas_to_number = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const get_three_letter_month_from_num = (num) => {
    let _months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return _months[num];
}

window.__init_pagination_helper_functions = (which, total_recs, limit_p, container_elem_id, numbers_list_elem_id, nextbtn, prevbtn, call_back) => {
    set_pagination_initial_pages_numbers(
        which, 
        total_recs, 
        limit_p, 
        container_elem_id, 
        numbers_list_elem_id, 
        nextbtn, 
        prevbtn, 
        call_back
    );
    for(let r=0; r<=last_page_number_index; r++){
        add_event_listeners_to_page_numbers("recent", all_pages_arr[r], call_back, limit_p);
    }
    //console.log(document.getElementById("recent_pagination_each_number_1"));
    
};

/*$(".box").animate({
    width: "toggle"
});*/