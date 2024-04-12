import { return_airline_by_code } from "../data/airline_codes";
import { select_booking_from_list } from "./helper-functions";

function returnEachRecentBookingMarkup(booking, index, type){
    //console.log("rendered booking: ", booking);
    
    let trip_round = "N/A";
    let ref_number = "N/A";
    let booking_type = "N/A";
    let email_address = "N/A";
    let airline = "N/A";
    let booking_date = booking?.createdAt?.split("T")[0] || "N/A";
    let total_amount = booking?.originPayloads[0]?.total_amount || "N/A";

    if(booking.type.toLowerCase() === "flight"){
        ref_number = booking?.originPayloads[0]?.booking_reference || "N/A";
        if(booking?.createdAt){
            trip_round = booking?.trip_type;
            booking_type = `
                <i style="margin-right: 5px; color: rgb(255,122,122)" class="fa fa-history"></i>
                <i style="margin-right: 5px; color: aqua" class="fa fa-plane"></i>
                ${trip_round?.toUpperCase()}
            `;
        }
        email_address = booking?.travellers[0]?.email;
        airline = booking?.airline;
    }

    return `
        <tr id="${type}_each_rendered_booking_item_${index}" >
            <td class="bookings-pane-booking-list-column first booking-type-col">
                ${booking_type}
            </td>
            <td class="bookings-pane-booking-list-column second">
                ${ref_number}
            </td>
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                ${email_address}
            </td>
            <td class="bookings-pane-booking-list-column second mobile-hidden">
                ${airline}
            </td>
            <td class="bookings-pane-booking-list-column first">
                ${booking_date}
            </td>
            <td class="bookings-pane-booking-list-column second edit-icon">
                $${total_amount}
            </td>
        </tr>
    `;
}

function returnEachFlightSearchBookingMarkup(booking, index, type){
    //console.log("rendered booking: ", booking);
    
    /*{
        "originPayloads": [
            {
                "documents": [
                    {
                        "passenger_ids": [
                            "pas_0000AgBAgqaXF9lCGwIDkU"
                        ],
                        "unique_identifier": "1",
                        "type": "electronic_ticket"
                    }
                ],
                "synced_at": "2024-03-24T14:14:32Z",
                "available_actions": [
                    "cancel",
                    "change",
                    "update"
                ],
                "airline_initiated_changes": [],
                "cancellation": null,
                "tax_currency": "USD",
                "base_currency": "USD",
                "base_amount": "462.75",
                "tax_amount": "83.29",
                "total_currency": "USD",
                "payment_status": {
                    "paid_at": "2024-03-24T14:14:32Z",
                    "price_guarantee_expires_at": null,
                    "payment_required_by": null,
                    "awaiting_payment": false
                },
                "created_at": "2024-03-24T14:14:32.570929Z",
                "booking_reference": "UKJVGL",
                "slices": [
                    {
                        "changeable": true,
                        "destination_type": "airport",
                        "origin_type": "airport",
                        "fare_brand_name": "Basic",
                        "conditions": {
                            "change_before_departure": {
                                "penalty_currency": "GBP",
                                "penalty_amount": "70.00",
                                "allowed": true
                            }
                        },
                        "segments": [
                            {
                                "origin_terminal": "2",
                                "destination_terminal": "1",
                                "aircraft": {
                                    "iata_code": "773",
                                    "name": "Boeing 777-300",
                                    "id": "arc_00009VMF8AhXSSRnQDI6HE"
                                },
                                "departing_at": "2024-03-25T18:34:00",
                                "arriving_at": "2024-03-26T06:31:00",
                                "operating_carrier": {
                                    "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                                    "logo_lockup_url": null,
                                    "iata_code": "ZZ",
                                    "conditions_of_carriage_url": null,
                                    "name": "Duffel Airways",
                                    "id": "arl_00009VME7D6ivUu8dn35WK"
                                },
                                "marketing_carrier": {
                                    "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                                    "logo_lockup_url": null,
                                    "iata_code": "ZZ",
                                    "conditions_of_carriage_url": null,
                                    "name": "Duffel Airways",
                                    "id": "arl_00009VME7D6ivUu8dn35WK"
                                },
                                "departure_terminal": "2",
                                "arrival_terminal": "1",
                                "operating_carrier_flight_number": "5888",
                                "marketing_carrier_flight_number": "5888",
                                "arrival_datetime": "2024-03-26T06:31:00",
                                "departure_datetime": "2024-03-25T18:34:00",
                                "distance": "5536.604381236755",
                                "passengers": [
                                    {
                                        "baggages": [
                                            {
                                                "quantity": 1,
                                                "type": "checked"
                                            },
                                            {
                                                "quantity": 1,
                                                "type": "carry_on"
                                            }
                                        ],
                                        "cabin_class_marketing_name": "Economy",
                                        "passenger_id": "pas_0000AgBAgqaXF9lCGwIDkU",
                                        "seat": null,
                                        "cabin_class": "economy"
                                    }
                                ],
                                "duration": "PT7H57M",
                                "destination": {
                                    "city_name": "London",
                                    "iata_city_code": "LON",
                                    "iata_country_code": "GB",
                                    "icao_code": "EGLL",
                                    "iata_code": "LHR",
                                    "latitude": 51.470311,
                                    "longitude": -0.458118,
                                    "city": {
                                        "city_name": null,
                                        "iata_city_code": "LON",
                                        "iata_country_code": "GB",
                                        "icao_code": null,
                                        "iata_code": "LON",
                                        "latitude": null,
                                        "longitude": null,
                                        "time_zone": null,
                                        "type": "city",
                                        "name": "London",
                                        "id": "cit_lon_gb"
                                    },
                                    "time_zone": "Europe/London",
                                    "type": "airport",
                                    "name": "Heathrow Airport",
                                    "id": "arp_lhr_gb"
                                },
                                "origin": {
                                    "city_name": "New York",
                                    "iata_city_code": "NYC",
                                    "iata_country_code": "US",
                                    "icao_code": "KLGA",
                                    "iata_code": "LGA",
                                    "latitude": 40.777062,
                                    "longitude": -73.873281,
                                    "city": {
                                        "city_name": null,
                                        "iata_city_code": "NYC",
                                        "iata_country_code": "US",
                                        "icao_code": null,
                                        "iata_code": "NYC",
                                        "latitude": null,
                                        "longitude": null,
                                        "time_zone": null,
                                        "type": "city",
                                        "name": "New York",
                                        "id": "cit_nyc_us"
                                    },
                                    "time_zone": "America/New_York",
                                    "type": "airport",
                                    "name": "LaGuardia Airport",
                                    "id": "arp_lga_us"
                                },
                                "id": "seg_0000AgBAgqq8JAEl3Jag3n"
                            }
                        ],
                        "duration": "PT7H57M",
                        "destination": {
                            "city_name": "London",
                            "iata_city_code": "LON",
                            "iata_country_code": "GB",
                            "icao_code": "EGLL",
                            "iata_code": "LHR",
                            "latitude": 51.470311,
                            "longitude": -0.458118,
                            "city": {
                                "city_name": null,
                                "iata_city_code": "LON",
                                "iata_country_code": "GB",
                                "icao_code": null,
                                "iata_code": "LON",
                                "latitude": null,
                                "longitude": null,
                                "time_zone": null,
                                "type": "city",
                                "name": "London",
                                "id": "cit_lon_gb"
                            },
                            "time_zone": "Europe/London",
                            "type": "airport",
                            "name": "Heathrow Airport",
                            "id": "arp_lhr_gb"
                        },
                        "origin": {
                            "city_name": "New York",
                            "iata_city_code": "NYC",
                            "iata_country_code": "US",
                            "icao_code": "KLGA",
                            "iata_code": "LGA",
                            "latitude": 40.777062,
                            "longitude": -73.873281,
                            "city": {
                                "city_name": null,
                                "iata_city_code": "NYC",
                                "iata_country_code": "US",
                                "icao_code": null,
                                "iata_code": "NYC",
                                "latitude": null,
                                "longitude": null,
                                "time_zone": null,
                                "type": "city",
                                "name": "New York",
                                "id": "cit_nyc_us"
                            },
                            "time_zone": "America/New_York",
                            "type": "airport",
                            "name": "LaGuardia Airport",
                            "id": "arp_lga_us"
                        },
                        "id": "sli_0000AgBArLeV06y64P3IgL"
                    },
                    {
                        "changeable": true,
                        "destination_type": "airport",
                        "origin_type": "airport",
                        "fare_brand_name": "Basic",
                        "conditions": {
                            "change_before_departure": {
                                "penalty_currency": "GBP",
                                "penalty_amount": "70.00",
                                "allowed": true
                            }
                        },
                        "segments": [
                            {
                                "origin_terminal": "2",
                                "destination_terminal": "1",
                                "aircraft": {
                                    "iata_code": "773",
                                    "name": "Boeing 777-300",
                                    "id": "arc_00009VMF8AhXSSRnQDI6HE"
                                },
                                "departing_at": "2024-03-27T20:07:00",
                                "arriving_at": "2024-03-28T00:04:00",
                                "operating_carrier": {
                                    "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                                    "logo_lockup_url": null,
                                    "iata_code": "ZZ",
                                    "conditions_of_carriage_url": null,
                                    "name": "Duffel Airways",
                                    "id": "arl_00009VME7D6ivUu8dn35WK"
                                },
                                "marketing_carrier": {
                                    "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                                    "logo_lockup_url": null,
                                    "iata_code": "ZZ",
                                    "conditions_of_carriage_url": null,
                                    "name": "Duffel Airways",
                                    "id": "arl_00009VME7D6ivUu8dn35WK"
                                },
                                "departure_terminal": "2",
                                "arrival_terminal": "1",
                                "operating_carrier_flight_number": "5888",
                                "marketing_carrier_flight_number": "5888",
                                "arrival_datetime": "2024-03-28T00:04:00",
                                "departure_datetime": "2024-03-27T20:07:00",
                                "distance": "5536.604381236755",
                                "passengers": [
                                    {
                                        "baggages": [
                                            {
                                                "quantity": 1,
                                                "type": "checked"
                                            },
                                            {
                                                "quantity": 1,
                                                "type": "carry_on"
                                            }
                                        ],
                                        "cabin_class_marketing_name": "Economy",
                                        "passenger_id": "pas_0000AgBAgqaXF9lCGwIDkU",
                                        "seat": null,
                                        "cabin_class": "economy"
                                    }
                                ],
                                "duration": "PT7H57M",
                                "destination": {
                                    "city_name": "New York",
                                    "iata_city_code": "NYC",
                                    "iata_country_code": "US",
                                    "icao_code": "KLGA",
                                    "iata_code": "LGA",
                                    "latitude": 40.777062,
                                    "longitude": -73.873281,
                                    "city": {
                                        "city_name": null,
                                        "iata_city_code": "NYC",
                                        "iata_country_code": "US",
                                        "icao_code": null,
                                        "iata_code": "NYC",
                                        "latitude": null,
                                        "longitude": null,
                                        "time_zone": null,
                                        "type": "city",
                                        "name": "New York",
                                        "id": "cit_nyc_us"
                                    },
                                    "time_zone": "America/New_York",
                                    "type": "airport",
                                    "name": "LaGuardia Airport",
                                    "id": "arp_lga_us"
                                },
                                "origin": {
                                    "city_name": "London",
                                    "iata_city_code": "LON",
                                    "iata_country_code": "GB",
                                    "icao_code": "EGLL",
                                    "iata_code": "LHR",
                                    "latitude": 51.470311,
                                    "longitude": -0.458118,
                                    "city": {
                                        "city_name": null,
                                        "iata_city_code": "LON",
                                        "iata_country_code": "GB",
                                        "icao_code": null,
                                        "iata_code": "LON",
                                        "latitude": null,
                                        "longitude": null,
                                        "time_zone": null,
                                        "type": "city",
                                        "name": "London",
                                        "id": "cit_lon_gb"
                                    },
                                    "time_zone": "Europe/London",
                                    "type": "airport",
                                    "name": "Heathrow Airport",
                                    "id": "arp_lhr_gb"
                                },
                                "id": "seg_0000AgBAgqq8JAEl3Jag3q"
                            }
                        ],
                        "duration": "PT7H57M",
                        "destination": {
                            "city_name": "New York",
                            "iata_city_code": "NYC",
                            "iata_country_code": "US",
                            "icao_code": "KLGA",
                            "iata_code": "LGA",
                            "latitude": 40.777062,
                            "longitude": -73.873281,
                            "city": {
                                "city_name": null,
                                "iata_city_code": "NYC",
                                "iata_country_code": "US",
                                "icao_code": null,
                                "iata_code": "NYC",
                                "latitude": null,
                                "longitude": null,
                                "time_zone": null,
                                "type": "city",
                                "name": "New York",
                                "id": "cit_nyc_us"
                            },
                            "time_zone": "America/New_York",
                            "type": "airport",
                            "name": "LaGuardia Airport",
                            "id": "arp_lga_us"
                        },
                        "origin": {
                            "city_name": "London",
                            "iata_city_code": "LON",
                            "iata_country_code": "GB",
                            "icao_code": "EGLL",
                            "iata_code": "LHR",
                            "latitude": 51.470311,
                            "longitude": -0.458118,
                            "city": {
                                "city_name": null,
                                "iata_city_code": "LON",
                                "iata_country_code": "GB",
                                "icao_code": null,
                                "iata_code": "LON",
                                "latitude": null,
                                "longitude": null,
                                "time_zone": null,
                                "type": "city",
                                "name": "London",
                                "id": "cit_lon_gb"
                            },
                            "time_zone": "Europe/London",
                            "type": "airport",
                            "name": "Heathrow Airport",
                            "id": "arp_lhr_gb"
                        },
                        "id": "sli_0000AgBArLeV06y64P3IgM"
                    }
                ],
                "passengers": [
                    {
                        "loyalty_programme_accounts": [],
                        "born_on": "1992-12-01",
                        "infant_passenger_id": null,
                        "family_name": "Adinan",
                        "given_name": "Mohammed",
                        "gender": "m",
                        "phone_number": "+17327999546",
                        "email": "m.adinanan@yahoo.com",
                        "title": "mr",
                        "type": "adult",
                        "id": "pas_0000AgBAgqaXF9lCGwIDkU"
                    }
                ],
                "live_mode": false,
                "total_amount": "546.04",
                "conditions": {
                    "refund_before_departure": {
                        "penalty_currency": "GBP",
                        "penalty_amount": "70.00",
                        "allowed": true
                    },
                    "change_before_departure": {
                        "penalty_currency": "GBP",
                        "penalty_amount": "70.00",
                        "allowed": true
                    }
                },
                "cancelled_at": null,
                "changes": [],
                "content": "managed",
                "services": [],
                "type": "instant",
                "owner": {
                    "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                    "logo_lockup_url": null,
                    "iata_code": "ZZ",
                    "conditions_of_carriage_url": null,
                    "name": "Duffel Airways",
                    "id": "arl_00009VME7D6ivUu8dn35WK"
                },
                "id": "ord_0000AgBArLeV06y64P3IgK"
            }
        ],
        "travellers": [
            {
                "loyalty_programme_accounts": [],
                "born_on": "1992-12-01",
                "infant_passenger_id": null,
                "family_name": "Adinan",
                "given_name": "Mohammed",
                "gender": "m",
                "phone_number": "+17327999546",
                "email": "m.adinanan@yahoo.com",
                "title": "mr",
                "type": "adult",
                "id": "pas_0000AgBAgqaXF9lCGwIDkU"
            }
        ],
        "_id": "6600354ab4840abdd0d82a97",
        "apiProvider": "Duffel",
        "providerBookingID": "ord_0000AgBArLeV06y64P3IgK",
        "type": "Flight",
        "anonymous_id": "0240351809a23918e256f8a93730a66c18c3b36d5e9943fe99e5d79f4248942103e3c9b2830fb40af89548b273184a0f0422f6ee82df0779af5bef6d",
        "airline": "Duffel Airways",
        "ariline_code": "ZZ",
        "trip_type": "round-trip",
        "cabin_type": "economy",
        "takeoff_airport": "LaGuardia Airport",
        "takeoff_airport_code": "LGA",
        "takeoff_city": "New York",
        "destination_airport": "LaGuardia Airport",
        "destination_airport_code": "LGA",
        "destination_city": "New York",
        "departure_date": "2024-03-25T18:34:00",
        "return_date": "2024-03-28T00:04:00",
        "createdAt": "2024-03-24T14:14:34.931Z",
        "updatedAt": "2024-03-24T14:14:34.931Z",
        "__v": 0
    }*/

    let ref_number = "N/A";
    let booking_type = "N/A";
    let email_address = "N/A";
    let departure_airport_code = "N/A";
    let destination_airport_code = "N/A";
    let departure_date = "N/A";
    let trip_round = "N/A";
    let passenger_name = "N/A";
    let airline = "N/A";

    if(booking?.type?.toLowerCase() === "flight"){
        if(booking?.createdAt){
            trip_round = booking?.trip_type;
            booking_type = `
                <i style="margin-right: 5px; color: rgb(255,122,122);" class="fa fa-history"></i>
                <i style="margin-right: 5px; color: aqua;" class="fa fa-plane"></i>
                ${trip_round}
            `;
        }
        ref_number = booking?.originPayloads[0]?.booking_reference;
        email_address = booking?.travellers[0]?.email;
        departure_airport_code = booking?.takeoff_airport_code;
        destination_airport_code = booking?.destination_airport_code;
        departure_date = booking?.departure_date;
        passenger_name = `${booking?.travellers[0]?.given_name} ${booking?.travellers[0]?.family_name}`;
        airline = booking?.airline;
    }

    return `
        <tr id="${type}_each_rendered_booking_item_${index}">
            <td class="bookings-pane-booking-list-column first booking-type-col">
                ${booking_type}
            </td>
            <td class="bookings-pane-booking-list-column second">
                ${departure_date}
            </td>
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                ${email_address}
            </td>
            <td class="bookings-pane-booking-list-column second mobile-hidden">
                ${passenger_name}
            </td>
            <td class="bookings-pane-booking-list-column first">
                ${departure_airport_code} - ${destination_airport_code}
            </td>
        </tr>
    `;
}

function returnEachHotelSearchBookingMarkup(booking, index, type){
    return `
        <tr id="${type}_each_rendered_booking_item_${index}">
            <td class="bookings-pane-booking-list-column first booking-type-col">
                Despite...
            </td>
            <td class="bookings-pane-booking-list-column second">
                Mar 24
            </td>
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                Accra, GH
            </td>
            <td class="bookings-pane-booking-list-column second mobile-hidden">
                Mohammed Adinan
            </td>
            <td class="bookings-pane-booking-list-column first">
                adinanaries@outlook.com
            </td>
        </tr>
    `;
}
export function render_recent_bookings_markup(bookings){
    if(document.getElementById("bookings-pane-recent-bookings-list"))
        document.getElementById("bookings-pane-recent-bookings-list").innerHTML = `
            <tr className="header">
                <td class="header">
                    Booking Type
                </td>
                <td class="header">
                    Ref. Number
                </td>
                <td class="header mobile-hidden">
                    Email
                </td>
                <td class="header mobile-hidden">
                    Airline
                </td>
                <td class="header">
                    Booking Date
                </td>
                <td class="header">
                    Total Price
                </td>
            </tr>
        `;

    for(let b=0; b < bookings.length; b++){
        if(document.getElementById("bookings-pane-recent-bookings-list"))
            document.getElementById("bookings-pane-recent-bookings-list")
                .innerHTML += returnEachRecentBookingMarkup(bookings[b], b, "recent");
        setTimeout(()=>{
            if(document.getElementById(`recent_each_rendered_booking_item_${b}`))
                document.getElementById(`recent_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('home', bookings[b]._id);
                });
        }, 200);
    }
}

export function render_search_result_bookings_markup(bookings, type="confirmation"){

    if(type === "confirmation"){
        document.getElementById("bookings-pane-search-results-bookings-list").innerHTML = `
            <tr className="header">
                <td class="header">
                    Type
                </td>
                <td class="header">
                    Ref. Number
                </td>
                <td class="header mobile-hidden">
                    Email
                </td>
                <td class="header mobile-hidden">
                    Airline
                </td>
                <td class="header">
                    Booking Date
                </td>
                <td class="header">
                    Total Price
                </td>
            </tr>
        `;

        for(let b=0; b < bookings.length; b++){
            document.getElementById("bookings-pane-search-results-bookings-list")
                .innerHTML += returnEachRecentBookingMarkup(bookings[b], b, "search");
            setTimeout(()=>{
                document.getElementById(`search_each_rendered_booking_item_${b}`)
                    .addEventListener("click", evnt => {
                        select_booking_from_list('results', bookings[b]._id);
                });
            }, 200);
        }
    }else if(type === "flight"){
        document.getElementById("bookings-pane-search-results-bookings-list").innerHTML = `
            <tr class="header">
                <td class="header">
                    Booking Type
                </td>
                <td class="header">
                    Departure Date
                </td>
                <td class="header mobile-hidden">
                    Email
                </td>
                <td class="header mobile-hidden">
                    Name
                </td>
                <td class="header">
                    Airports
                </td>
            </tr>
        `;

        for(let b=0; b < bookings.length; b++){
            document.getElementById("bookings-pane-search-results-bookings-list")
                .innerHTML += returnEachFlightSearchBookingMarkup(bookings[b], b, "search");
            setTimeout(()=>{
                document.getElementById(`search_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('results', bookings[b]._id);
                });
            }, 200);
        }
    }else if(type === "hotel"){
        document.getElementById("bookings-pane-search-results-bookings-list").innerHTML = `
            <tr>
                <td class="header">
                    Hotel Name
                </td>
                <td class="header">
                    Checkin
                </td>
                <td class="header mobile-hidden">
                    City
                </td>
                <td class="header mobile-hidden">
                    Cust. Name
                </td>
                <td class="header">
                    Email
                </td>
            </tr>
        `;

        for(let b=0; b < bookings.length; b++){
            document.getElementById("bookings-pane-search-results-bookings-list").innerHTML += returnEachHotelSearchBookingMarkup(bookings[b], b, "search");
            setTimeout(()=>{
                document.getElementById(`search_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('results', bookings[b]._id);
                });
            }, 200);
        }
    }
}

function return_selected_booking_flight_status(status){
    return `
        <div style="background-color: rgb(43,23,99); border-top-left-radius: 6px; border-top-right-radius: 6px; border-bottom: 4px solid rgba(255,255,255,0.4); padding: 10px; margin-bottom: 10px;">
            <p style="color: white; margin: 5px; font-size: 13px; font-weight: bolder; letter-spacing: 1px;">
                <i style="color: crimson; margin-right: 10px; font-size: 17px" class="fa fa-plane"></i>
                Fight Booking
            </p>
            <div class="booking-status-tracker">
                <div class="booking-status-tracker-stage" style="border-top: 5px solid lightgreen">
                    <div class="booking-status-tracker-stage-point" style="background-color: green; right: calc(100% - 14px)">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="booking-status-tracker-stage-point" style="background-color: green">
                        <i class="fa fa-ticket"></i>
                    </div>
                    <p class="booking-status-tracker-stage-title" style="display: flex; justify-content: space-between; width: calc(100% + 40px); margin-left: -20px">
                        <span>Booked</span> <span>Ticketed</span></p>
                </div>
                <div  class="booking-status-tracker-stage"style="border-top: 5px solid gold;">
                    <div class="booking-status-tracker-stage-point" style="background-color: goldenrod;">
                        <i class="fa fa-briefcase"></i>
                    </div>
                    <p class="booking-status-tracker-stage-title">
                        Checked-in</p>
                </div>
                <div class="booking-status-tracker-stage" style="border-top: 5px solid orange;">
                    <div class="booking-status-tracker-stage-point" style="background-color: orangered;">
                    <i class="fa fa-plane"></i>
                    </div>
                    <p class="booking-status-tracker-stage-title">
                        Boarded</p>
                </div>
                <div class="booking-status-tracker-stage" style="border-top: 5px solid red;">
                    <p class="booking-status-tracker-stage-title">
                        Flown</p>
                    <div class="booking-status-tracker-stage-point active animated-status-icon">
                        <i class="fa fa-check"></i>
                    </div>
                </div>
            </div>
            <div style="letter-spacing: 1px; padding: 10px; padding-left: 15px; border-left: 3px solid orange; background-color: rgba(255,255,255,0.1); color: white; fontSize: 13px">
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Status: 
                    <span style="margin-left: 10px; color: orange">
                        Flown
                    </span>
                </p>
                <p style="letter-spacing: 1px; color: white; font-size: 13px; margin-bottom: 5px;">
                    Record ID: 
                    <span style="margin-left: 10px; color: orange;">
                        97362223673836
                    </span>
                </p>
            </div>
        </div>
    `;
}

function return_selected_booking_status_display_markup(type, status){
    if(type === "flight"){
       return return_selected_booking_flight_status(status);
    }else if(type === "hotel"){
        //return hotel status rendering here
    }
     
}
function return_selected_booking_flight_general_info(data){

    let ref_number = data?.ref_number || "N/A";
    let data_provider = data?.data_provider || "N/A";
    let departure_date = data?.departure_date || "N/A";
    let return_date = data?.return_date || "N/A";
    let cabin_type = data?.cabin_type || "N/A";
    let takeoff_city = data?.takeoff_city || "N/A";
    let destination_city = data?.destination_city || "N/A";
    let createdAt = data?.createdAt || "N/A";
    let updatedAt = data?.updatedAt || "N/A";
    let airline = data?.airline || "N/A";
    let trip_type = data?.trip_type || "N/A";
    let takeoff_airport = data?.takeoff_airport || "N/A";
    let destination_airport = data?.destination_airport || "N/A";
    let takeoff_airport_code = data?.takeoff_airport_code || "N/A";
    let destination_airport_code = data?.destination_airport_code || "N/A";

    return `
        <div>
            <p class="page-data-info-p">
                Type: 
                <span>
                    Fight Ticket
                </span>
            </p>
            <p class="page-data-info-p">
                Reference Number: 
                <span>
                    ${ref_number}
                </span>
            </p>
            <p class="page-data-info-p">
                Travel Dates: 
                <span>
                    ${departure_date?.replaceAll("T", " @ ")}
                    <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                    ${return_date?.replaceAll("T", " @ ")}
                </span>
            </p>
            <p class="page-data-info-p">
                Travel Airports: 
                <span>
                    ${takeoff_airport}
                    <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                    ${destination_airport}
                </span>
            </p>
            <p class="page-data-info-p">
                Departure - Return Cities: 
                <span>
                    ${takeoff_city}
                    <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                    ${destination_city}
                </span>
            </p>
            <p class="page-data-info-p">
                Airline: 
                <span>
                    ${airline}
                </span>
            </p>
            <p class="page-data-info-p">
                Cabin Type: 
                <span>
                    ${cabin_type}
                </span>
            </p>
            <p class="page-data-info-p">
                Trip Type: 
                <span>
                    ${trip_type}
                </span>
            </p>
            <p class="page-data-info-p">
                Inventory From: 
                <span>
                    ${data_provider}
                </span>
            </p>
            <p class="page-data-info-p">
                Created At: 
                <span>
                    ${createdAt?.replaceAll("T", " @ ")}
                </span>
            </p>
            <p class="page-data-info-p">
                Updated At: 
                <span>
                    ${updatedAt?.replaceAll("T", " @ ")}
                </span>
            </p>
        </div>
    `;
}
function return_selected_booking_general_info(type, data){
    if(type === "flight"){
        return return_selected_booking_flight_general_info(data);
     }else if(type === "hotel"){
         //return hotel status rendering here
     }
}

function return_selected_flight_booking_travelers_markup(travelers){
    
    let travelers_markup = "";

    for(let t=0; t<travelers.length;t++){

        let email=travelers[t].email;
        let full_name=`${travelers[t].given_name} ${travelers[t].family_name}`;
        let gender=travelers[t].gender;
        let dob=travelers[t].born_on;
        let phone=travelers[t].phone_number;

        travelers_markup += `
            <div style="margin-bottom: 20px; border-left: 3px solid orangered; padding: 10px;" >
                <p style="font-size: 13px; font-weight: bolder; margin-bottom: 5px; color: red;">
                    <i style="font-weight: bolder; margin-right: 5px;" class="fa fa-user"></i>
                    ${full_name}
                </p>
                <p style="font-size: 13px; margin-bottom: 5px; color: rgba(255,255,255,0.8);" >
                    ${gender}, ${dob}
                </p>
                <p style="font-size: 13px; margin-bottom: 5px; color: rgba(255,255,255,0.8);" >
                    ${email}, ${phone}
                </p>
            </div>
        `;
    }

    return travelers_markup;
}

function return_selected_flight_booking_segments_markup(slices){

    /*slices = [
        {
            "changeable": true,
            "destination_type": "airport",
            "origin_type": "airport",
            "fare_brand_name": "Basic",
            "conditions": {
                "change_before_departure": {
                    "penalty_currency": "GBP",
                    "penalty_amount": "70.00",
                    "allowed": true
                }
            },
            "segments": [
                {
                    "origin_terminal": "2",
                    "destination_terminal": "1",
                    "aircraft": {
                        "iata_code": "773",
                        "name": "Boeing 777-300",
                        "id": "arc_00009VMF8AhXSSRnQDI6HE"
                    },
                    "departing_at": "2024-03-25T18:34:00",
                    "arriving_at": "2024-03-26T06:31:00",
                    "operating_carrier": {
                        "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                        "logo_lockup_url": null,
                        "iata_code": "ZZ",
                        "conditions_of_carriage_url": null,
                        "name": "Duffel Airways",
                        "id": "arl_00009VME7D6ivUu8dn35WK"
                    },
                    "marketing_carrier": {
                        "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                        "logo_lockup_url": null,
                        "iata_code": "ZZ",
                        "conditions_of_carriage_url": null,
                        "name": "Duffel Airways",
                        "id": "arl_00009VME7D6ivUu8dn35WK"
                    },
                    "departure_terminal": "2",
                    "arrival_terminal": "1",
                    "operating_carrier_flight_number": "5888",
                    "marketing_carrier_flight_number": "5888",
                    "arrival_datetime": "2024-03-26T06:31:00",
                    "departure_datetime": "2024-03-25T18:34:00",
                    "distance": "5536.604381236755",
                    "passengers": [
                        {
                            "baggages": [
                                {
                                    "quantity": 1,
                                    "type": "checked"
                                },
                                {
                                    "quantity": 1,
                                    "type": "carry_on"
                                }
                            ],
                            "cabin_class_marketing_name": "Economy",
                            "passenger_id": "pas_0000AgBAgqaXF9lCGwIDkU",
                            "seat": null,
                            "cabin_class": "economy"
                        }
                    ],
                    "duration": "PT7H57M",
                    "destination": {
                        "city_name": "London",
                        "iata_city_code": "LON",
                        "iata_country_code": "GB",
                        "icao_code": "EGLL",
                        "iata_code": "LHR",
                        "latitude": 51.470311,
                        "longitude": -0.458118,
                        "city": {
                            "city_name": null,
                            "iata_city_code": "LON",
                            "iata_country_code": "GB",
                            "icao_code": null,
                            "iata_code": "LON",
                            "latitude": null,
                            "longitude": null,
                            "time_zone": null,
                            "type": "city",
                            "name": "London",
                            "id": "cit_lon_gb"
                        },
                        "time_zone": "Europe/London",
                        "type": "airport",
                        "name": "Heathrow Airport",
                        "id": "arp_lhr_gb"
                    },
                    "origin": {
                        "city_name": "New York",
                        "iata_city_code": "NYC",
                        "iata_country_code": "US",
                        "icao_code": "KLGA",
                        "iata_code": "LGA",
                        "latitude": 40.777062,
                        "longitude": -73.873281,
                        "city": {
                            "city_name": null,
                            "iata_city_code": "NYC",
                            "iata_country_code": "US",
                            "icao_code": null,
                            "iata_code": "NYC",
                            "latitude": null,
                            "longitude": null,
                            "time_zone": null,
                            "type": "city",
                            "name": "New York",
                            "id": "cit_nyc_us"
                        },
                        "time_zone": "America/New_York",
                        "type": "airport",
                        "name": "LaGuardia Airport",
                        "id": "arp_lga_us"
                    },
                    "id": "seg_0000AgBAgqq8JAEl3Jag3n"
                }
            ],
            "duration": "PT7H57M",
            "destination": {
                "city_name": "London",
                "iata_city_code": "LON",
                "iata_country_code": "GB",
                "icao_code": "EGLL",
                "iata_code": "LHR",
                "latitude": 51.470311,
                "longitude": -0.458118,
                "city": {
                    "city_name": null,
                    "iata_city_code": "LON",
                    "iata_country_code": "GB",
                    "icao_code": null,
                    "iata_code": "LON",
                    "latitude": null,
                    "longitude": null,
                    "time_zone": null,
                    "type": "city",
                    "name": "London",
                    "id": "cit_lon_gb"
                },
                "time_zone": "Europe/London",
                "type": "airport",
                "name": "Heathrow Airport",
                "id": "arp_lhr_gb"
            },
            "origin": {
                "city_name": "New York",
                "iata_city_code": "NYC",
                "iata_country_code": "US",
                "icao_code": "KLGA",
                "iata_code": "LGA",
                "latitude": 40.777062,
                "longitude": -73.873281,
                "city": {
                    "city_name": null,
                    "iata_city_code": "NYC",
                    "iata_country_code": "US",
                    "icao_code": null,
                    "iata_code": "NYC",
                    "latitude": null,
                    "longitude": null,
                    "time_zone": null,
                    "type": "city",
                    "name": "New York",
                    "id": "cit_nyc_us"
                },
                "time_zone": "America/New_York",
                "type": "airport",
                "name": "LaGuardia Airport",
                "id": "arp_lga_us"
            },
            "id": "sli_0000AgBArLeV06y64P3IgL"
        },
        {
            "changeable": true,
            "destination_type": "airport",
            "origin_type": "airport",
            "fare_brand_name": "Basic",
            "conditions": {
                "change_before_departure": {
                    "penalty_currency": "GBP",
                    "penalty_amount": "70.00",
                    "allowed": true
                }
            },
            "segments": [
                {
                    "origin_terminal": "2",
                    "destination_terminal": "1",
                    "aircraft": {
                        "iata_code": "773",
                        "name": "Boeing 777-300",
                        "id": "arc_00009VMF8AhXSSRnQDI6HE"
                    },
                    "departing_at": "2024-03-27T20:07:00",
                    "arriving_at": "2024-03-28T00:04:00",
                    "operating_carrier": {
                        "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                        "logo_lockup_url": null,
                        "iata_code": "ZZ",
                        "conditions_of_carriage_url": null,
                        "name": "Duffel Airways",
                        "id": "arl_00009VME7D6ivUu8dn35WK"
                    },
                    "marketing_carrier": {
                        "logo_symbol_url": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
                        "logo_lockup_url": null,
                        "iata_code": "ZZ",
                        "conditions_of_carriage_url": null,
                        "name": "Duffel Airways",
                        "id": "arl_00009VME7D6ivUu8dn35WK"
                    },
                    "departure_terminal": "2",
                    "arrival_terminal": "1",
                    "operating_carrier_flight_number": "5888",
                    "marketing_carrier_flight_number": "5888",
                    "arrival_datetime": "2024-03-28T00:04:00",
                    "departure_datetime": "2024-03-27T20:07:00",
                    "distance": "5536.604381236755",
                    "passengers": [
                        {
                            "baggages": [
                                {
                                    "quantity": 1,
                                    "type": "checked"
                                },
                                {
                                    "quantity": 1,
                                    "type": "carry_on"
                                }
                            ],
                            "cabin_class_marketing_name": "Economy",
                            "passenger_id": "pas_0000AgBAgqaXF9lCGwIDkU",
                            "seat": null,
                            "cabin_class": "economy"
                        }
                    ],
                    "duration": "PT7H57M",
                    "destination": {
                        "city_name": "New York",
                        "iata_city_code": "NYC",
                        "iata_country_code": "US",
                        "icao_code": "KLGA",
                        "iata_code": "LGA",
                        "latitude": 40.777062,
                        "longitude": -73.873281,
                        "city": {
                            "city_name": null,
                            "iata_city_code": "NYC",
                            "iata_country_code": "US",
                            "icao_code": null,
                            "iata_code": "NYC",
                            "latitude": null,
                            "longitude": null,
                            "time_zone": null,
                            "type": "city",
                            "name": "New York",
                            "id": "cit_nyc_us"
                        },
                        "time_zone": "America/New_York",
                        "type": "airport",
                        "name": "LaGuardia Airport",
                        "id": "arp_lga_us"
                    },
                    "origin": {
                        "city_name": "London",
                        "iata_city_code": "LON",
                        "iata_country_code": "GB",
                        "icao_code": "EGLL",
                        "iata_code": "LHR",
                        "latitude": 51.470311,
                        "longitude": -0.458118,
                        "city": {
                            "city_name": null,
                            "iata_city_code": "LON",
                            "iata_country_code": "GB",
                            "icao_code": null,
                            "iata_code": "LON",
                            "latitude": null,
                            "longitude": null,
                            "time_zone": null,
                            "type": "city",
                            "name": "London",
                            "id": "cit_lon_gb"
                        },
                        "time_zone": "Europe/London",
                        "type": "airport",
                        "name": "Heathrow Airport",
                        "id": "arp_lhr_gb"
                    },
                    "id": "seg_0000AgBAgqq8JAEl3Jag3q"
                }
            ],
            "duration": "PT7H57M",
            "destination": {
                "city_name": "New York",
                "iata_city_code": "NYC",
                "iata_country_code": "US",
                "icao_code": "KLGA",
                "iata_code": "LGA",
                "latitude": 40.777062,
                "longitude": -73.873281,
                "city": {
                    "city_name": null,
                    "iata_city_code": "NYC",
                    "iata_country_code": "US",
                    "icao_code": null,
                    "iata_code": "NYC",
                    "latitude": null,
                    "longitude": null,
                    "time_zone": null,
                    "type": "city",
                    "name": "New York",
                    "id": "cit_nyc_us"
                },
                "time_zone": "America/New_York",
                "type": "airport",
                "name": "LaGuardia Airport",
                "id": "arp_lga_us"
            },
            "origin": {
                "city_name": "London",
                "iata_city_code": "LON",
                "iata_country_code": "GB",
                "icao_code": "EGLL",
                "iata_code": "LHR",
                "latitude": 51.470311,
                "longitude": -0.458118,
                "city": {
                    "city_name": null,
                    "iata_city_code": "LON",
                    "iata_country_code": "GB",
                    "icao_code": null,
                    "iata_code": "LON",
                    "latitude": null,
                    "longitude": null,
                    "time_zone": null,
                    "type": "city",
                    "name": "London",
                    "id": "cit_lon_gb"
                },
                "time_zone": "Europe/London",
                "type": "airport",
                "name": "Heathrow Airport",
                "id": "arp_lhr_gb"
            },
            "id": "sli_0000AgBArLeV06y64P3IgM"
        }
    ]*/

    let markup = `<div  style="margin-bottom: 20px">`;

    for(let i=0; i<slices.length; i++){
        let segments = slices[i]?.segments;
        let stops_count = (slices[i]?.segments?.length - 1);
        let slice_title = "Departure Flight";
        let slice_color = "skyblue";
        if(i===1){
            slice_title = "Return Flight";
            slice_color = "yellow";
        }

        let stops_markup = ""
        stops_markup = (stops_count > 1) ? `${stops_count} stops` : `1 stop`;
        if(stops_count < 1) stops_markup = "nonstop";
        let duration = slices[i]?.duration;

        markup += `
            <p style="color: ${slice_color}; font-size: 13px; margin-top: 20px; margin-bottom: 10px;">
                <i style="color: lightgreen; margin-right: 5px;" class="fa fa-check"></i>
                 ${slice_title} (${stops_markup})
                <span style="margin-left: 10px; color: orange;">${duration}</span>
            </p>
            <div>
        `;
        for(let j=0; j<segments.length; j++){
            let alts=(j%2);
            let color = (alts) ? "yellowgreen" : "lightgreen";

            let airports = `
                ${segments[j]?.origin?.name}, 
                ${segments[j]?.origin?.city_name}, 
                (${segments[j]?.origin?.iata_country_code})
                <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                ${segments[j]?.destination?.name}, 
                ${segments[j]?.destination?.city_name}, 
                (${segments[j]?.destination?.iata_country_code})
            `;
            
            let travel_dates = `
                ${segments[j]?.departure_datetime?.replaceAll("T", " @ ")}
                <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                ${segments[j]?.arrival_datetime?.replaceAll("T", " @ ")}
            `;

            let aircraft = segments[j]?.aircraft?.name;
            let operating_carrier = segments[j]?.operating_carrier?.name;

            markup += `
                <div style="border-left: 3px solid ${color}; padding: 10px; margin-left: 10px;">
                    <p style="font-size: 13px; margin-bottom: 5px; color: ${color};">
                        ${airports}
                    </p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin-bottom: 5px;">
                        ${travel_dates}
                    </p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin-bottom: 5px;">
                        ${operating_carrier}
                    </p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin-bottom: 5px;">
                        ${aircraft}
                    </p>
                </div>
            `;
        }
        markup += `</div>`;
    }

    markup += `</div>`;

    return markup;
}

function return_selected_flight_booking_payment_markup(payment_obj){

    let total_paid = parseFloat(payment_obj?.payment_intent?.amount/100).toFixed(2);
    if(isNaN(total_paid))
        total_paid="0.00"
    let actual_price = payment_obj?.actual_price || "N/A";
    let base_amount = payment_obj?.base_amount || "N/A";
    let tax_amount = payment_obj?.tax_amount || "N/A";

    return `
        <div style="margin-bottom: 20px; border-left: 3px solid lightgreen; padding: 10px; padding-right: 0;">
            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin-bottom: 5px;">
                Base Price: 
                <span style="margin-left: 10px;">$${base_amount}</span>
            </p>
            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin-bottom: 5px;">
                Taxe Amount: 
                <span style="margin-left: 10px;">$${tax_amount}</span>
            </p>
            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin-bottom: 5px;">
                Total: 
                <span style="margin-left: 10px;">$${actual_price}</span>
            </p>
            <p style="color: red; font-size: 13px; font-weight: bolder; margin-bottom: 5px;">
                Amount Charged: 
                <span style="margin-left: 10px;">$${total_paid}</span>
            </p>
        </div>
    `;
}

export function render_selected_booking_details(booking){
    //console.log(booking);
    
    let general_info = {};
    let passengers = [];
    let slices = [];
    let booking_intent = {};
    let payment_obj = {};

    if(booking.type.toLowerCase() === "flight"){
        document.getElementById("selected_booking_flights_segments_container")
            .innerHTML="";
        passengers = booking?.travellers;
        slices = booking?.originPayloads[0]?.slices;
        booking_intent = booking?.booking_intent;
        payment_obj.payment_intent = booking_intent?.payment_intent;
        payment_obj.actual_price = booking?.originPayloads[0]?.total_amount
        payment_obj.base_amount = booking?.originPayloads[0]?.base_amount;
        payment_obj.tax_amount = booking?.originPayloads[0]?.tax_amount;
        // general information here
        general_info.ref_number = booking.originPayloads[0].booking_reference;
        general_info.data_provider = booking.apiProvider;
        general_info.departure_date = booking.departure_date;
        general_info.return_date = booking.return_date;
        general_info.cabin_type = booking.cabin_type;
        general_info.takeoff_city = booking.takeoff_city;
        general_info.destination_city = booking.destination_city;
        general_info.createdAt = booking.createdAt;
        general_info.updatedAt = booking.updatedAt;
        general_info.airline = booking.airline;
        general_info.trip_type = booking.trip_type;
        general_info.takeoff_airport = booking.takeoff_airport;
        general_info.destination_airport = booking.destination_airport;
        general_info.takeoff_airport_code = booking.takeoff_airport_code;
        general_info.destination_airport_code = booking.destination_airport_code;

        //document.getElementById("selected_booking_status_display_container")
        //  .innerHTML = return_selected_booking_status_display_markup("flight", "status");
        document.getElementById("selected_booking_general_information_container")
            .innerHTML = return_selected_booking_general_info("flight", general_info);
        document.getElementById("selected_booking_travelers_or_guests_list")
            .innerHTML = return_selected_flight_booking_travelers_markup(passengers);
        document.getElementById("selected_booking_flights_segments_container")
            .innerHTML = return_selected_flight_booking_segments_markup(slices);
        document.getElementById("selected_booking_flights_prices_container")
            .innerHTML = return_selected_flight_booking_payment_markup(payment_obj);
    }
}

export function render_component_loader_markup(elem_id){
    if(document.getElementById(elem_id))
        document.getElementById(elem_id).innerHTML = `
            <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; background-color: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.3);">
                <div style="width: 100%; text-align: center;" class="loader2 loader--style2" title="1">
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                        <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                            <animateTransform attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.6s"
                            repeatCount="indefinite"/>
                        </path>
                    </svg>
                    <p style="text-align: center; font-size: 13px; color: rgba(255,255,255,0.7);">
                        loading...
                    </p>
                </div>
            </div>
        `;
}

export function render_no_booking_found_markup(elem_id){
    if(document.getElementById(elem_id))
        document.getElementById(elem_id).innerHTML = `
            <div style="min-height: 120px; display: flex; flex-direction: column; justify-content: center; background-color: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.3);">
                <div style="width: 100%; text-align: center;">
                    <i style="color: orangered; font-size: 30px" class="fa fa-exclamation-triangle"></i>
                    <p style="text-align: center; font-size: 14px; margin-top: 5px; color: rgb(255,255,255,0.7);">
                        Oops! No booking found.
                    </p>
                </div>
            </div>
        `;
}