// Importing Css
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '../../home_page_search_form/style.css';
document.head.appendChild(link);

const Jquery = document.createElement('script');
Jquery.setAttribute('src', 'https://code.jquery.com/jquery-latest.min.js');
document.head.appendChild(Jquery);

// Importing Font Awesome
const FaScript = document.createElement('script');  
FaScript.setAttribute('src','https://kit.fontawesome.com/28527db20b.js');
FaScript.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(FaScript);

const MomentJs = document.createElement('script');
MomentJs.setAttribute('src', '../../home_page_search_form/daterangepicker-master/moment.min.js');
document.head.appendChild(MomentJs);

const DatePickerScript = document.createElement('script');
DatePickerScript.setAttribute('src', '../../home_page_search_form/daterangepicker-master/daterangepicker.js');
setTimeout(()=>{document.head.appendChild(DatePickerScript)}, 100);

const DatePickerStyle = document.createElement('link');
DatePickerStyle.rel = 'stylesheet';
DatePickerStyle.href = '../../home_page_search_form/daterangepicker-master/daterangepicker.css';
document.head.appendChild(DatePickerStyle);

const AirportsScript = document.createElement('script');
AirportsScript.setAttribute('src', '../../home_page_search_form/Airports.js');
document.head.appendChild(AirportsScript);

const AirportsAutoCompleteScript = document.createElement('script');
AirportsAutoCompleteScript.setAttribute('src', '../../home_page_search_form/autocompletes.js');
document.head.appendChild(AirportsAutoCompleteScript);

function isLocalStorageEnabled() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

if(!isLocalStorageEnabled()){
    // Set page path to redirect to local storage disabled page
    window.location = 'https://google.com';
}

function instantiateSearchObj(){
  var search_obj = {
    type: "one-way",
    itinerary: {
      departure: {
        airport: "",
        date: ""
      },
      arrival:{
        airport: "",
        date: "" // Not Arrival Date, but Date for Returning Flight if Round Trip
      },
      cabin: "economy",
      travelers: {
        adults: 1,
        children: 0,
        infants: 0
      }
    }
  }
  if(localStorage.getItem("search_obj")){
    //other code here
  }else{
    localStorage.setItem("search_obj", JSON.stringify(search_obj));
  }

  // Hotel search
  const hotel_search_obj = {
    checkin_date: "",
    checkout_date: "",
    location: {
      iata: 0,
      long: 0,
      lat: 0,
    },
    flights: {
      included: false,
      origin_airport: {
        iata: 0,
        long: 0,
        lat: 0,
      }
    },
    cars: {
      included: false,
    },
    rooms: [
      {
        total_adults: 1,
        children: []
      }
    ]
  }

  if(localStorage.getItem("hotel_search_obj")){
    //other code here
  }else{
    localStorage.setItem("hotel_search_obj", JSON.stringify(hotel_search_obj));
  }
}

// Constants
const WDG_SEARCH_FORM_PRODUCT_TYPES = {
    flights: 0,
    hotels: 1,
    cars: 2
}

const WDG_CONSTANTS = {
    one_way: "one-way",
    round_trip: "round-trip",
    current_product_type: WDG_SEARCH_FORM_PRODUCT_TYPES?.flights
}

const wdg_init_search_form = async () => {

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
    const CLIENT_APP_URL="https://welldugo-agent-client-app-82f461dc93ac.herokuapp.com";

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
                product_type_selector: {
                    activeBackgroundColor: data?.homePageSearchFormProductTypeSelectorActiveBackground,
                    activeIconColor: data?.homePageSearchFormProductTypeSelectorActiveIcon,
                    activeTextColor: data?.homePageSearchFormProductTypeSelectorActiveTextColor,
                    backgroundColor: data?.homePageSearchFormProductTypeSelectorBackground,
                    borderRadius: (data?.homePageSearchFormProducttypeSelectorBorderRadius+"px"),
                    iconColor: data?.homePageSearchFormProductTypeSelectorIcon,
                    textColor: data?.homePageSearchFormProductTypeSelectorTextColor,
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

    // Product Type Selector
    // Flights
    let flights_type_selector_container = document.createElement('div');
    flights_type_selector_container.style.cursor="pointer";
    flights_type_selector_container.style.fontSize="13px";
    flights_type_selector_container.style.marginRight="5px";
    flights_type_selector_container.style.color=style_obj?.product_type_selector?.activeTextColor;
    flights_type_selector_container.style.background=style_obj?.product_type_selector?.activeBackgroundColor;
    flights_type_selector_container.style.borderRadius=style_obj?.product_type_selector?.borderRadius;
    flights_type_selector_container.style.padding="10px 20px";
    let flights_type_selector_icon = document.createElement('i');
    flights_type_selector_icon.style.color = style_obj?.product_type_selector?.activeIconColor;
    flights_type_selector_icon.style.marginRight = "10px";
    flights_type_selector_icon.classList.add('fa-solid');
    flights_type_selector_icon.classList.add('fa-plane');
    let flights_type_selector_title = document.createElement('span');
    flights_type_selector_title.innerText="Flights";
    flights_type_selector_container.appendChild(flights_type_selector_icon);
    flights_type_selector_container.appendChild(flights_type_selector_title);

    // Stays
    let Stays_type_selector_container = document.createElement('div');
    Stays_type_selector_container.style.cursor="pointer";
    Stays_type_selector_container.style.fontSize="13px";
    Stays_type_selector_container.style.marginRight="5px";
    Stays_type_selector_container.style.color=style_obj?.product_type_selector?.textColor;
    Stays_type_selector_container.style.background=style_obj?.product_type_selector?.backgroundColor;
    Stays_type_selector_container.style.borderRadius=style_obj?.product_type_selector?.borderRadius;
    Stays_type_selector_container.style.padding="10px 20px";
    let Stays_type_selector_icon = document.createElement('i');
    Stays_type_selector_icon.style.color = style_obj?.product_type_selector?.iconColor;
    Stays_type_selector_icon.style.marginRight = "10px";
    Stays_type_selector_icon.classList.add('fa-solid');
    Stays_type_selector_icon.classList.add('fa-building');
    let Stays_type_selector_title = document.createElement('span');
    Stays_type_selector_title.innerText="Stays";
    Stays_type_selector_container.appendChild(Stays_type_selector_icon);
    Stays_type_selector_container.appendChild(Stays_type_selector_title);

    // Cars
    let Cars_type_selector_container = document.createElement('div');
    Cars_type_selector_container.style.cursor="pointer";
    Cars_type_selector_container.style.fontSize="13px";
    Cars_type_selector_container.style.marginRight="5px";
    Cars_type_selector_container.style.color=style_obj?.product_type_selector?.textColor;
    Cars_type_selector_container.style.background=style_obj?.product_type_selector?.backgroundColor;
    Cars_type_selector_container.style.borderRadius=style_obj?.product_type_selector?.borderRadius;
    Cars_type_selector_container.style.padding="10px 20px";
    let Cars_type_selector_icon = document.createElement('i');
    Cars_type_selector_icon.style.color = style_obj?.product_type_selector?.iconColor;
    Cars_type_selector_icon.style.marginRight = "10px";
    Cars_type_selector_icon.classList.add('fa-solid');
    Cars_type_selector_icon.classList.add('fa-car');
    let Cars_type_selector_title = document.createElement('span');
    Cars_type_selector_title.innerText="Cars";
    Cars_type_selector_container.appendChild(Cars_type_selector_icon);
    Cars_type_selector_container.appendChild(Cars_type_selector_title);
    

    let product_type_select_container = document.createElement('div');
    product_type_select_container.classList.add('wdg-flex-container');
    product_type_select_container.classList.add('wdg-wrapper');
    product_type_select_container.appendChild(flights_type_selector_container);
    product_type_select_container.appendChild(Stays_type_selector_container);
    product_type_select_container.appendChild(Cars_type_selector_container);


    // Departure Airport Input
    let departure_airport_input_container = document.createElement('div');
    departure_airport_input_container.classList.add('wdg-airport-input-fld-container');
    let departure_airport_input_icon = document.createElement('i');
    departure_airport_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    departure_airport_input_icon.classList.add('fa-solid');
    departure_airport_input_icon.classList.add('fa-plane-departure');
    let departure_airport_input = document.createElement('input');
    departure_airport_input.id="search_forms_from_where_input_fld";
    departure_airport_input.readOnly=true;
    departure_airport_input.style.color=style_obj?.form_airport_input?.textColor;
    departure_airport_input_container.style.border=style_obj?.form_airport_input?.border;
    departure_airport_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    departure_airport_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    departure_airport_input.placeholder = 'Enter departure airport';
    departure_airport_input_container.appendChild(departure_airport_input_icon);
    departure_airport_input_container.appendChild(departure_airport_input);

    // Destination Airport Input
    let destination_airport_input_container = document.createElement('div');
    destination_airport_input_container.classList.add("wdg-airport-input-fld-container");
    let destination_airport_input_icon = document.createElement('i');
    destination_airport_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    destination_airport_input_icon.classList.add('fa-solid');
    destination_airport_input_icon.classList.add('fa-plane-arrival');
    let destination_airport_input = document.createElement('input');
    destination_airport_input.id="search_forms_to_where_input_fld";
    destination_airport_input.readOnly=true;
    destination_airport_input.style.color=style_obj?.form_airport_input?.textColor;
    destination_airport_input_container.style.border=style_obj?.form_airport_input?.border;
    destination_airport_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    destination_airport_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    destination_airport_input.placeholder = 'Enter destination airport';
    destination_airport_input_container.appendChild(destination_airport_input_icon);
    destination_airport_input_container.appendChild(destination_airport_input);

    // Adding Departure Auto Complete Markup
    let departure_airport_auto_complete_container=document.createElement('div');
    departure_airport_auto_complete_container.id="departure_airport_auto_complete_container";
    departure_airport_auto_complete_container.classList.add('airports_inputs_with_auto_complete');
    let departure_airport_auto_complete_input=document.createElement('input');
    departure_airport_auto_complete_input.id="from_where_airports_auto_complete_input_fld";
    departure_airport_auto_complete_input.classList.add('airports_auto_complete_input');
    let departure_airport_auto_complete_input_container=document.createElement('div');
    departure_airport_auto_complete_input_container.classList.add('airports_auto_complete_input_container');
    let departure_airport_auto_complete_close_button=document.createElement('div');
    departure_airport_auto_complete_close_button.classList.add('airports_auto_complete_close_btn');
    let departure_airport_auto_complete_close_button_icon = document.createElement('i');
    departure_airport_auto_complete_close_button_icon.classList.add('fa-solid');
    departure_airport_auto_complete_close_button_icon.classList.add('fa-times');
    let departure_airport_auto_complete_list_container=document.createElement('div');
    departure_airport_auto_complete_list_container.classList.add('airports_auto_complete_list_container');
    let departure_airport_auto_complete_list=document.createElement('ul');
    departure_airport_auto_complete_list.id='flights_auto_complete_from_where_input_list';
    
    departure_airport_auto_complete_list_container.appendChild(departure_airport_auto_complete_list);
    departure_airport_auto_complete_close_button.appendChild(departure_airport_auto_complete_close_button_icon);
    departure_airport_auto_complete_input_container.appendChild(departure_airport_auto_complete_input);
    departure_airport_auto_complete_input_container.appendChild(departure_airport_auto_complete_close_button);
    departure_airport_auto_complete_container.appendChild(departure_airport_auto_complete_input_container);
    departure_airport_auto_complete_container.appendChild(departure_airport_auto_complete_list_container);
    departure_airport_input_container.appendChild(departure_airport_auto_complete_container);

    // Adding Destination Auto Complete Markup
    let destination_airport_auto_complete_container=document.createElement('div');
    destination_airport_auto_complete_container.id="destination_airport_auto_complete_container";
    destination_airport_auto_complete_container.classList.add('airports_inputs_with_auto_complete');
    let destination_airport_auto_complete_input=document.createElement('input');
    destination_airport_auto_complete_input.id="to_where_airports_auto_complete_input_fld";
    destination_airport_auto_complete_input.classList.add('airports_auto_complete_input');
    let destination_airport_auto_complete_input_container=document.createElement('div');
    destination_airport_auto_complete_input_container.classList.add('airports_auto_complete_input_container');
    let destination_airport_auto_complete_close_button=document.createElement('div');
    destination_airport_auto_complete_close_button.classList.add('airports_auto_complete_close_btn');
    let destination_airport_auto_complete_close_button_icon = document.createElement('i');
    destination_airport_auto_complete_close_button_icon.classList.add('fa-solid');
    destination_airport_auto_complete_close_button_icon.classList.add('fa-times');
    let destination_airport_auto_complete_list_container=document.createElement('div');
    destination_airport_auto_complete_list_container.classList.add('airports_auto_complete_list_container');
    let destination_airport_auto_complete_list=document.createElement('ul');
    destination_airport_auto_complete_list.id='flights_auto_complete_to_where_input_list';
    
    destination_airport_auto_complete_list_container.appendChild(destination_airport_auto_complete_list);
    destination_airport_auto_complete_close_button.appendChild(destination_airport_auto_complete_close_button_icon);
    destination_airport_auto_complete_input_container.appendChild(destination_airport_auto_complete_input);
    destination_airport_auto_complete_input_container.appendChild(destination_airport_auto_complete_close_button);
    destination_airport_auto_complete_container.appendChild(destination_airport_auto_complete_input_container);
    destination_airport_auto_complete_container.appendChild(destination_airport_auto_complete_list_container);
    destination_airport_input_container.appendChild(destination_airport_auto_complete_container);

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

    // Travellers
    let travellers_input_container = document.createElement('div');
    travellers_input_container.classList.add('wdg-cb-psng-tr-inner-container');
    let travellers_input_icon = document.createElement('i');
    travellers_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    travellers_input_icon.classList.add('fa-solid');
    travellers_input_icon.classList.add('fa-user');
    let travellers_input_title=document.createElement('span');
    travellers_input_title.innerText="1 adult";
    travellers_input_container.appendChild(travellers_input_icon);
    travellers_input_container.appendChild(travellers_input_title);
    travellers_input_container.style.border=style_obj?.form_airport_input?.border;
    travellers_input_container.style.backgroundColor=style_obj?.form_airport_input?.backgroundColor;
    travellers_input_container.style.borderRadius=style_obj?.form_airport_input?.borderRadius;
    let travelers_select_number_input_container=document.createElement('div');
    travelers_select_number_input_container.id="wdg_travelers_select_number_input_container";
    travelers_select_number_input_container.classList.add('forms_class_guests_cabin_settings_pane');
    travelers_select_number_input_container.innerHTML=`
      <div id="add_travelers_settings_pane" style="padding: 15px; display: block;">
        <p style="color: rgba(0, 0, 0, 0.7); font-family: Prompt, sans-serif; font-weight: bolder; font-size: 17px; margin-top: 10px; margin-bottom: 20px;">
          Add Travelers
        </p>
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px;">
          <div style="color: rgba(0, 0, 0, 0.7); height: 30px; font-family: Prompt, sans-serif; display: flex; flex-direction: column; justify-content: center;">
            Adults
            <p style="font-size: 12px; color: rgba(0, 0, 0, 0.6); margin-top: -10px;">
              18 and above
            </p>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="cursor: pointer; border-radius: 100%; border: 1px solid rgba(0, 0, 0, 0.3); width: 35px; height: 35px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              -
            </div>
            <div id="add_travelers_display_adults_number" style="color: rgba(0, 0, 0, 0.7); width: 40px; height: 30px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              1
            </div>
            <div style="cursor: pointer; border-radius: 100%; border: 1px solid rgba(0, 0, 0, 0.3); width: 35px; height: 35px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              +
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px; border-radius: 30px;">
          <div style="color: rgba(0, 0, 0, 0.7); height: 30px; font-family: Prompt, sans-serif; display: flex; flex-direction: column; justify-content: center;">
            Children
            <p style="font-size: 12px; color: rgba(0, 0, 0, 0.6); margin-top: -10px;">
              Ages 2 to 17
            </p>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="cursor: pointer; border-radius: 100%; border: 1px solid rgba(0, 0, 0, 0.3); width: 35px; height: 35px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              -
            </div>
            <div id="add_travelers_display_children_number" style="color: rgba(0, 0, 0, 0.7); width: 40px; height: 30px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              1
            </div>
            <div style="cursor: pointer; border-radius: 100%; border: 1px solid rgba(0, 0, 0, 0.3); width: 35px; height: 35px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              +
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 10px; border-radius: 30px;">
          <div style="color: rgba(0, 0, 0, 0.7); font-family: Prompt, sans-serif; height: 30px; display: flex; flex-direction: column; justify-content: center;">
            Infants
            <p style="font-size: 12px; color: rgba(0, 0, 0, 0.6); margin-top: -10px;">
              Younger than 2
            </p>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="cursor: pointer; border-radius: 100%; border: 1px solid rgba(0, 0, 0, 0.3); width: 35px; height: 35px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              -
            </div>
            <div id="add_travelers_display_infants_number" style="color: rgba(0, 0, 0, 0.7); width: 40px; height: 30px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              1
            </div>
            <div style="cursor: pointer; border-radius: 100%; border: 1px solid rgba(0, 0, 0, 0.3); width: 35px; height: 35px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
              +
            </div>
          </div>
        </div>
      </div>
      <div onclick="WDG_toggle_show_travelers_input_page(false)" 
        style="background-color: ${style_obj?.search_btn?.backgroundColor}; color: ${style_obj?.search_btn?.color}; cursor: pointer; padding: 10px; text-align: center; margin: 0 10px; margin-bottom: 10px; border-radius: ${style_obj?.search_btn.borderRadius};">
        done
      </div>
    `
    cb_psng_tr_input_container.appendChild(travelers_select_number_input_container);
    cb_psng_tr_input_container.appendChild(cabin_select_input_container);
    cb_psng_tr_input_container.appendChild(trip_round_select_input_container);
    cb_psng_tr_input_container.appendChild(travellers_input_container);
    
    // Travel Dates Input
    let date_input_container = document.createElement('div');
    date_input_container.classList.add("wdg-date-input-fld-container");
    let date_airport_input_icon = document.createElement('i');
    date_airport_input_icon.style.color = style_obj?.form_airport_input?.iconColor;
    date_airport_input_icon.classList.add('fa-solid');
    date_airport_input_icon.classList.add('fa-calendar-alt');
    let trave_dates_input = document.createElement('input');
    trave_dates_input.id = "departure_return_dates_input";
    trave_dates_input.readOnly=true;
    trave_dates_input.style.position = 'relative';
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
    form_inputs_parent_container.id="wdg_flights_search_form_inputs";
    form_inputs_parent_container.classList.add('wdg-wrapper');
    form_inputs_parent_container.style.paddingTop = "0";
    form_inputs_parent_container.style.paddingBottom = "0";
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

    // Hotels Here
    let stays_form_inputs_parent_container = document.createElement('div');
    stays_form_inputs_parent_container.innerText = "Hotels Inputs Here";
    stays_form_inputs_parent_container.style.display = "none";
    stays_form_inputs_parent_container.id="wdg_hotels_search_form_inputs";

    // Cars Here
    let cars_form_inputs_parent_container = document.createElement('div');
    cars_form_inputs_parent_container.innerText = "Cars Inputs Here";
    cars_form_inputs_parent_container.style.display = "none";
    cars_form_inputs_parent_container.id="wdg_cars_search_form_inputs";

    // Form Header
    /*let form_header = document.createElement("h1");
    form_header.classList.add('wdg-search-form-header');
    form_header.style.color = style_obj?.form_header?.color;
    form_header.innerText = "Search Flights";
    let form_header_container = document.createElement('div');
    form_header_container.classList.add('wdg-wrapper');
    form_header_container.appendChild(form_header);*/

    //---------
    form_parent.appendChild(product_type_select_container);
    form_parent.appendChild(form_inputs_parent_container);
    form_parent.appendChild(stays_form_inputs_parent_container);
    form_parent.appendChild(cars_form_inputs_parent_container);
    form_parent.appendChild(buttonsContainer);

    // Select Product Type Functions
    const wdg_search_form_select_product_type_on_click = (type_p) => {
    
        flights_type_selector_container.style.color=style_obj?.product_type_selector?.textColor;
        flights_type_selector_container.style.background=style_obj?.product_type_selector?.backgroundColor;
        flights_type_selector_icon.style.color = style_obj?.product_type_selector?.iconColor;

        Stays_type_selector_container.style.color=style_obj?.product_type_selector?.textColor;
        Stays_type_selector_container.style.background=style_obj?.product_type_selector?.backgroundColor;
        Stays_type_selector_icon.style.color = style_obj?.product_type_selector?.iconColor;

        Cars_type_selector_container.style.color=style_obj?.product_type_selector?.textColor;
        Cars_type_selector_container.style.background=style_obj?.product_type_selector?.backgroundColor;
        Cars_type_selector_icon.style.color = style_obj?.product_type_selector?.iconColor;

        form_inputs_parent_container.style.display="none";
        stays_form_inputs_parent_container.style.display="none";
        cars_form_inputs_parent_container.style.display="none";
    
        if(type_p===WDG_SEARCH_FORM_PRODUCT_TYPES?.flights){

          flights_type_selector_container.style.color=style_obj?.product_type_selector?.activeTextColor;
          flights_type_selector_container.style.background=style_obj?.product_type_selector?.activeBackgroundColor;
          flights_type_selector_icon.style.color = style_obj?.product_type_selector?.activeIconColor;
          WDG_CONSTANTS.current_product_type=WDG_SEARCH_FORM_PRODUCT_TYPES?.flights;
          form_inputs_parent_container.style.display="block";

        }else if(type_p===WDG_SEARCH_FORM_PRODUCT_TYPES?.hotels){

          Stays_type_selector_container.style.color=style_obj?.product_type_selector?.activeTextColor;
          Stays_type_selector_container.style.background=style_obj?.product_type_selector?.activeBackgroundColor;
          Stays_type_selector_icon.style.color = style_obj?.product_type_selector?.activeIconColor;
          WDG_CONSTANTS.current_product_type=WDG_SEARCH_FORM_PRODUCT_TYPES?.hotels;
          stays_form_inputs_parent_container.style.display="block";
    
        } else if(type_p===WDG_SEARCH_FORM_PRODUCT_TYPES?.cars){
    
          Cars_type_selector_container.style.color=style_obj?.product_type_selector?.activeTextColor;
          Cars_type_selector_container.style.background=style_obj?.product_type_selector?.activeBackgroundColor;
          Cars_type_selector_icon.style.color = style_obj?.product_type_selector?.activeIconColor;
          WDG_CONSTANTS.current_product_type=WDG_SEARCH_FORM_PRODUCT_TYPES?.cars;
          cars_form_inputs_parent_container.style.display="block";

        }
    }

    // Travelers Input Functions
    travellers_input_container?.addEventListener('click', event => {
        WDG_toggle_show_travelers_input_page(true);
    });
      
    // Product Type onClick Functions
    flights_type_selector_container?.addEventListener('click', event => {
        wdg_search_form_select_product_type_on_click(WDG_SEARCH_FORM_PRODUCT_TYPES?.flights);
    });
    Stays_type_selector_container?.addEventListener('click', event => {
        wdg_search_form_select_product_type_on_click(WDG_SEARCH_FORM_PRODUCT_TYPES?.hotels);
    });
    Cars_type_selector_container?.addEventListener('click', event => {
        wdg_search_form_select_product_type_on_click(WDG_SEARCH_FORM_PRODUCT_TYPES?.cars);
    });
    departure_airport_auto_complete_close_button?.addEventListener('click', event => {
        window.toggle_show_from_where_airport_input_auto_complete(false);
    });
    destination_airport_auto_complete_close_button?.addEventListener('click', event => {
        window.toggle_show_to_where_airport_input_auto_complete(false);
    });

    // Search Button onClick Function
    form_search_btn?.addEventListener('click', event => {

        if(!departure_airport_input.value){
            departure_airport_input.click();
            return;
        }

        if(!destination_airport_input.value){
            destination_airport_input.click();
            return;
        }

        if(!trave_dates_input.value){
            trave_dates_input.click();
            return;
        }

        const _WDG_SEARCH_OBJ = JSON.parse(localStorage.getItem("search_obj"));
        let _travel_dates=_WDG_SEARCH_OBJ?.itinerary?.departure?.date;
        if(_WDG_SEARCH_OBJ?.type===WDG_CONSTANTS?.round_trip){
            _travel_dates+= ` - ${_WDG_SEARCH_OBJ?.itinerary?.arrival?.date}`;
        }
        let __lnk = (CLIENT_APP_URL+"/?product="+WDG_CONSTANTS?.current_product_type+"&type="+_WDG_SEARCH_OBJ?.type+"&date="+_travel_dates+"&dpt_airport="+_WDG_SEARCH_OBJ?.itinerary?.departure?.airport+"&dst_airport="+_WDG_SEARCH_OBJ?.itinerary?.arrival?.airport+"&cabin="+_WDG_SEARCH_OBJ?.itinerary?.cabin+"&adults="+_WDG_SEARCH_OBJ?.itinerary?.travelers?.adults+"&children="+_WDG_SEARCH_OBJ?.itinerary?.travelers?.children+"&infants="+_WDG_SEARCH_OBJ?.itinerary?.travelers?.infants+"&ag="+ag);
        console.log(__lnk);
        window.location.href = __lnk;
    })
}

const WDG_toggle_show_travelers_input_page = (is_show) => {
  if(is_show){
    document.getElementById("wdg_travelers_select_number_input_container").style.display="block";
  }else{
    document.getElementById("wdg_travelers_select_number_input_container").style.display="none";
  }
}

const WDG_DateChoosersInit = (type=WDG_CONSTANTS.one_way) => {
    if(document.getElementById("departure_return_dates_input"))
      document.getElementById("departure_return_dates_input").value="";
    $(function() {
      $('#departure_return_dates_input').daterangepicker({
        singleDatePicker: (type===WDG_CONSTANTS.one_way),
        opens: 'left',
        minDate: new Date(),
        autoUpdateInput: false,
        locale: {
          cancelLabel: 'Clear'
        }
      }, function(start, end, label) {
    
        setTimeout(()=>{
          if(document.getElementById("departure_return_dates_input"))
              document.getElementById("departure_return_dates_input").value = start.toString().substring(0,11) + ((type===WDG_CONSTANTS.round_trip) ? " - "+ end.toString().substring(0,11) : "");
        }, 100);
    
        let flight_search_data = JSON.parse(localStorage.getItem("search_obj"));
        flight_search_data.itinerary.departure.date = start.format('YYYY-MM-DD');
        flight_search_data.itinerary.arrival.date="";
        if(type===WDG_CONSTANTS.round_trip){
          flight_search_data.itinerary.arrival.date = end.format('YYYY-MM-DD');
        }
    
        window.localStorage.setItem("search_obj", JSON.stringify(flight_search_data));
    
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      });
    });
}

window.addEventListener('DOMContentLoaded', function () {
    wdg_init_search_form();
    this.setTimeout(()=>{
        WDG_DateChoosersInit();
        instantiateSearchObj();
        wdg_init_airports_auto_complete();
    }, 300);
});