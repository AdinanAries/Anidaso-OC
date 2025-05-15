// Importing Css
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '../../home_page_search_form/style.css';
document.head.appendChild(link);

// Importing Font Awesome
var FaScript = document.createElement('script');  
FaScript.setAttribute('src','https://kit.fontawesome.com/28527db20b.js');
FaScript.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(FaScript);

const init_search_form = async () => {

    // Form Styles Init
    let style_obj = {
        form_header: {
            color: "white"
        },
        form_airport_input: {
            border: "1px solid rgb(136, 136, 136)",
            backgroundColor: "rgb(250, 250, 250)",
            borderRadius: "9px",
        },
        search_btn: {
            borderRadius: "50px",
            color: "white",
            backgroundColor: "rgb(23, 87, 148)",
            iconColor: "rgba(255,255,255,0.6)"
        }
    };

    // Server URL
    const SVR_URL="https://welldugo-oc-prod-backend-b7f63faaa3a9.herokuapp.com"; //"http://localhost:4000"
    const _PATH="\\api\\booking-engine\\agent\\"

    // Getting Travel Agent
    let scripts = document.getElementsByTagName('script');
    let __this_script = Array.from(scripts).find(each=>each?.outerHTML.includes("/home_page_search_form/searchform.js\" welldugo_ag="))
    let ag=__this_script.getAttribute('welldugo_ag');

    // Fetching the Booking Engine Settings
    try {
        let __booking_engine = await fetch(SVR_URL+_PATH+ag);
        if (!__booking_engine.ok) {
            throw new Error(`HTTP error! status: ${__booking_engine.status}`);
        }
        const data = await __booking_engine.json();
        console.log("EEEEEEEEEEEEEEEEEE:", data);
        if (data?._id){
            // Form Styles from DB
            style_obj = {
                form_header: {
                    color: data
                },
                form_airport_input: {
                    border: ("1px solid "+data?.homePageSearchInputBorderColor),
                    backgroundColor: data?.homePageSearchInputBackground,
                    borderRadius: (data?.homePageSearchInputborderRadius+"px"),
                    iconColor: data?.homePageSearchInputIconColor,
                    textColor: data?.homePageSearchInputTextColor,
                },
                search_btn: {
                    borderRadius: (data?.homePageSearchButtonBorderRadius+"px"),
                    color: data?.homePageSearchButtonTextColor,
                    backgroundColor: data?.homePageSearchButtonBgColor,
                    iconColor: data?.homePageSearchButtonIconColor
                }
            };
        }
    } catch (error) {
        console.error('Fetching error:', error);
    }

    var form_parent = document.getElementById('welldugo_search_form');

    // Departure Airport Input
    let departure_airport_input_container = document.createElement('div');
    departure_airport_input_container.classList.add('wdg-airport-input-fld-container');
    let departure_airport_input_icon = document.createElement('i');
    departure_airport_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    departure_airport_input_icon.classList.add('fa-solid');
    departure_airport_input_icon.classList.add('fa-plane-departure');
    let departure_airport_input = document.createElement('input');
    departure_airport_input.style.color=style_obj?.form_airport_input?.textColor;
    departure_airport_input_container.style.border=style_obj?.form_airport_input?.border;
    departure_airport_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    departure_airport_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    departure_airport_input.placeholder = 'Enter departure airport';
    departure_airport_input_container.appendChild(departure_airport_input_icon);
    departure_airport_input_container.appendChild(departure_airport_input);

    // Departure Airport Input
    let destination_airport_input_container = document.createElement('div');
    destination_airport_input_container.classList.add("wdg-airport-input-fld-container");
    let destination_airport_input_icon = document.createElement('i');
    destination_airport_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    destination_airport_input_icon.classList.add('fa-solid');
    destination_airport_input_icon.classList.add('fa-plane-arrival');
    let destination_airport_input = document.createElement('input');
    destination_airport_input.style.color=style_obj?.form_airport_input?.textColor;
    destination_airport_input_container.style.border=style_obj?.form_airport_input?.border;
    destination_airport_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    destination_airport_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    destination_airport_input.placeholder = 'Enter destination airport';
    destination_airport_input_container.appendChild(destination_airport_input_icon);
    destination_airport_input_container.appendChild(destination_airport_input);

    let dep_dest_airports_input_container = document.createElement('div');
    dep_dest_airports_input_container.classList.add('wdg-flex-to-block-on-mobile');
    dep_dest_airports_input_container.appendChild(departure_airport_input_container);
    dep_dest_airports_input_container.appendChild(destination_airport_input_container);
    

    // Cabin, Passenger, Trip-Round Input
    let cb_psng_tr_input_container = document.createElement('div');
    cb_psng_tr_input_container.classList.add('wdg-cb-psng-tr-input-fld-container');

    // Cabin Select Input
    let cabin_select_input_container = document.createElement('div');
    cabin_select_input_container.classList.add('wdg-cb-psng-tr-inner-container');
    let cabin_select_input_icon = document.createElement('i');
    cabin_select_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    cabin_select_input_icon.classList.add('fa-solid');
    cabin_select_input_icon.classList.add('fa-level-up');
    let cabin_select_input = document.createElement('select');
    cabin_select_input.style.color=style_obj?.form_airport_input?.textColor;
    const economy_class_option = document.createElement('option');
    economy_class_option.value = 'economy';
    economy_class_option.text = 'Economy';
    const premium_class_option = document.createElement('option');
    premium_class_option.value = 'premium';
    premium_class_option.text = 'Premium';
    const business_class_option = document.createElement('option');
    business_class_option.value = 'business';
    business_class_option.text = 'Business';
    const first_class_option = document.createElement('option');
    first_class_option.value = 'first';
    first_class_option.text = 'First';
    cabin_select_input.appendChild(economy_class_option);
    cabin_select_input.appendChild(premium_class_option);
    cabin_select_input.appendChild(business_class_option);
    cabin_select_input.appendChild(first_class_option);
    cabin_select_input_container.style.border=style_obj?.form_airport_input?.border;
    cabin_select_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    cabin_select_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    cabin_select_input_container.appendChild(cabin_select_input_icon);
    cabin_select_input_container.appendChild(cabin_select_input);

    // Trip Round Select Input
    let trip_round_select_input_container = document.createElement('div');
    trip_round_select_input_container.classList.add('wdg-cb-psng-tr-inner-container')
    let trip_round_select_input_icon = document.createElement('i');
    trip_round_select_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    trip_round_select_input_icon.classList.add('fa-solid');
    trip_round_select_input_icon.classList.add('fa-rotate');
    let trip_round_select_input = document.createElement('select');
    trip_round_select_input.style.color=style_obj?.form_airport_input?.textColor;
    const one_way_trip_round_option = document.createElement('option');
    one_way_trip_round_option.value = 'one-way';
    one_way_trip_round_option.text = 'One Way';
    const round_trip_option = document.createElement('option');
    round_trip_option.value = 'round-trip';
    round_trip_option.text = 'Round Trip';
    trip_round_select_input.appendChild(one_way_trip_round_option);
    trip_round_select_input.appendChild(round_trip_option);
    trip_round_select_input_container.style.border=style_obj?.form_airport_input?.border;
    trip_round_select_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    trip_round_select_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    trip_round_select_input_container.appendChild(trip_round_select_input_icon);
    trip_round_select_input_container.appendChild(trip_round_select_input);

    cb_psng_tr_input_container.appendChild(cabin_select_input_container);
    cb_psng_tr_input_container.appendChild(trip_round_select_input_container);

    // Travel Dates Input
    let date_input_container = document.createElement('div');
    date_input_container.classList.add("wdg-date-input-fld-container");
    let date_airport_input_icon = document.createElement('i');
    date_airport_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    date_airport_input_icon.classList.add('fa-solid');
    date_airport_input_icon.classList.add('fa-calendar-alt');
    let trave_dates_input = document.createElement('input');
    trave_dates_input.style.color=style_obj?.form_airport_input?.textColor;
    date_input_container.style.border=style_obj?.form_airport_input?.border;
    date_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    date_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    trave_dates_input.placeholder = 'Travel Dates';
    date_input_container.appendChild(date_airport_input_icon);
    date_input_container.appendChild(trave_dates_input);

    let dpt_date_input_container = document.createElement('div');
    dpt_date_input_container.classList.add('wdg-flex-to-block-on-mobile');
    dpt_date_input_container.appendChild(cb_psng_tr_input_container);
    dpt_date_input_container.appendChild(date_input_container);


    let form_inputs_parent_container = document.createElement('div');
    form_inputs_parent_container.classList.add('wdg-wrapper');
    form_inputs_parent_container.appendChild(dpt_date_input_container);
    form_inputs_parent_container.appendChild(dep_dest_airports_input_container);

    // Search Button
    let form_search_btn = document.createElement('div');
    form_search_btn.classList.add('wdg-search-form-btn');
    form_search_btn.style.borderRadius = style_obj?.search_btn?.borderRadius;
    form_search_btn.style.backgroundColor = style_obj?.search_btn?.backgroundColor;
    form_search_btn.style.color = style_obj?.search_btn?.color;
    let form_search_btn_icon = document.createElement('i');
    form_search_btn_icon.classList.add('fa-solid');
    form_search_btn_icon.classList.add('fa-search');
    form_search_btn_icon.style.color = style_obj?.search_btn?.iconColor;
    form_search_btn.appendChild(form_search_btn_icon);
    form_search_btn.innerHTML += "Search";

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('wdg-search-buttons-container');
    buttonsContainer.classList.add('wdg-wrapper');
    buttonsContainer.appendChild(form_search_btn);

    let __lnk = "https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com/?ngn=1&ag=67fdc8bc45641576b851aafd";
    form_search_btn?.addEventListener('click', event => {
        window.location.href = __lnk;
    })

    // Form Header
    let form_header = document.createElement("h1");
    form_header.classList.add('wdg-search-form-header');
    form_header.style.color = style_obj?.form_header?.color;
    form_header.innerText = "Search Flights";
    let form_header_container = document.createElement('div');
    form_header_container.classList.add('wdg-wrapper');
    form_header_container.appendChild(form_header);

    //---------
    form_parent.appendChild(form_header_container);
    form_parent.appendChild(form_inputs_parent_container);
    form_parent.appendChild(buttonsContainer);
}

window.addEventListener('DOMContentLoaded', function () {
    init_search_form();
});