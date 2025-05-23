import { return_airline_by_code } from "../data/airline_codes";
import { select_booking_from_list } from "./helper-functions";

function returnEachRecentBookingMarkup(booking, index, type){
    //console.log("rendered booking: ", booking);
    
    let trip_round = "N/A";
    let ref_number = "N/A";
    let booking_type = "N/A";
    let email_address = "N/A";
    let airline = "N/A";
    let booking_date = booking?.createdAt;
    let total_amount = booking?.originPayloads[0]?.total_amount || "N/A";
    let departure_airport_code = booking?.takeoff_airport_code || "N/A";
    let destination_airport_code = booking?.destination_airport_code || "N/A";

    if(booking.type.toLowerCase() === "flight"){
        ref_number = booking?.originPayloads[0]?.booking_reference || "N/A";
        if(booking?.createdAt){
            trip_round = booking?.trip_type;
            booking_type = `
                <i style="margin-right: 5px; color: rgba(255,255,255,0.5); font-size: 10px;" class="fa fa-plane-departure"></i>
                ${departure_airport_code} - ${destination_airport_code} (${trip_round})
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

function returnEachBookingAttemptMarkup(b_attempt, index, type){
    console.log("rendered booking attempt: ", b_attempt);
    
    let ref_number = "N/A";
    let email_address = "N/A";
    let booking_date = b_attempt?.createdAt;
    let total_amount = b_attempt?.booking_order?.data?.payments?.[0].amount || "N/A";
    let isSuccess = false;
    let isUncompletedBooking = false;
    let message = "";

    if(
        b_attempt?.booking_status?.toLowerCase() === "confirmed" &&
        b_attempt?.payment_status?.toLowerCase() === "succeeded"
    ){
        message = "Both booking and payment were successful!";
        isSuccess = true;
    } else if (b_attempt?.booking_status?.toLowerCase() === "confirmed") {
        message = "Booking succeeded but payment failed";
    } else if (b_attempt?.payment_status?.toLowerCase() === "succeeded") {
        message = "Payment was made for unsuccessful booking";
    } else {
        message = "Both booking and payment were unsuccessful";
    }

    if(b_attempt?.booking_status?.toLowerCase() === "order_initiated"){
        isUncompletedBooking = true;
    }

    if(b_attempt?.is_error){
        message = b_attempt?.error_activity_description;
    }

    if(!b_attempt.type){ // Defaults to Flight Booking
        ref_number = b_attempt?.booking_order?.data?.booking_reference || "N/A";
        email_address = b_attempt?.booking_order?.data?.passengers?.[0].email;
    }

    return `
        <tr id="${type}_each_rendered_booking_attempt_item_${index}" >
            <td class="bookings-pane-booking-list-column first booking-type-col">
                <i style="margin-right: 5px; color: rgba(255,255,255,0.5); font-size: 10px;" class="fa fa-plane-departure"></i>
                ${total_amount}
            </td>
            ${
                isUncompletedBooking ?
                `<td class="bookings-pane-booking-list-column second" style="background: rgb(0, 74, 101); color: white;">
                    <i style="margin-right: 5px; color: yellow;" class="fa fa-person-walking-arrow-loop-left"></i>
                    Uncompleted
                </td>` :
                `<td class="bookings-pane-booking-list-column second" style="background: ${isSuccess ? "rgb(0, 101, 94)" : "rgb(255, 157, 122)"}"; color: white;">
                    <i style="margin-right: 5px; color: ${isSuccess ? "lightgreen" : "red"};" 
                        class="fa-solid fa-${isSuccess ? "check" : "exclamation-triangle"}"></i>
                    ${(isSuccess ? "Success" : "Failed")}
                </td>`
            }
            <td class="bookings-pane-booking-list-column first mobile-hidden">
                ${email_address}
            </td>
            ${
                isUncompletedBooking ? 
                `<td class="bookings-pane-booking-list-column second mobile-hidden">
                    Booking was not completed
                </td>` :
                `<td class="bookings-pane-booking-list-column second mobile-hidden">
                    ${message}
                </td>`
            }
            <td class="bookings-pane-booking-list-column first">
                ${booking_date}
            </td>
            <td class="bookings-pane-booking-list-column second edit-icon">
                XYYEVW
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
            <tr class="header">
                <td class="header">
                    Booking
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
                    Timestamp
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

export function render_booking_attempts_markup(b_attempt){
    if(document.getElementById("bookings-pane-booking-attempts-list"))
        document.getElementById("bookings-pane-booking-attempts-list").innerHTML = `
            <tr class="header">
                <td class="header">
                    Booking
                </td>
                <td class="header" style="background-color: lightgrey;">
                    Status
                </td>
                <td class="header mobile-hidden">
                    Email
                </td>
                <td class="header mobile-hidden">
                    Condition
                </td>
                <td class="header">
                    Timestamp
                </td>
                <td class="header">
                    Ref. Number
                </td>
            </tr>
        `;

    for(let b=0; b < b_attempt.length; b++){
        if(document.getElementById("bookings-pane-booking-attempts-list"))
            document.getElementById("bookings-pane-booking-attempts-list")
                .innerHTML += returnEachBookingAttemptMarkup(b_attempt[b], b, "all_attempts");
        /*setTimeout(()=>{
            if(document.getElementById(`recent_each_rendered_booking_item_${b}`))
                document.getElementById(`recent_each_rendered_booking_item_${b}`).addEventListener("click", evnt => {
                    select_booking_from_list('home', bookings[b]._id);
                });
        }, 200);*/
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
    let services = data?.services || [];

    let services_markup = `
        <p style="font-size: 13px; color: red; margin: 10px; text-decoration: underline;">
            <i style="margin-right: 5px;" class="fa-solid fa-exclamation-triangle"></i>
            No Extra Services Included
        </p>
    `;
    if (services.length > 0) {
        services_markup = `
            <p style="font-size: 13px; color: white; margin: 10px; text-decoration: underline;">
                <i style="margin-right: 5px; color: lightgreen;" class="fa-solid fa-info-circle"></i>
                Extra Services Included
            </p>
        `;
        services.forEach(each=>{
            services_markup += `
                <p class="page-data-info-p" style="color: yellow;">
                    ${each?.type} (${each?.quantity}):
                    <span>
                        ${each?.total_amount} (${each?.total_currency})
                    </span>
                </p>
            `;
        });
    }

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
            ${services_markup}
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

    for(let i=0; i<slices?.length; i++){
        let segments = slices[i]?.segments;
        let stops_count = (slices[i]?.segments?.length - 1);
        let slice_title = "Flight Segment";
        let slice_color = "skyblue";
        let color = "yellowgreen";
        if(i%2){
            //slice_title = "Return Flight";
            color = "lightgreen";
            slice_color = "yellow";
        }

        let stops_markup = ""
        stops_markup = (stops_count > 1) ? `${stops_count} stops` : `1 stop`;
        if(stops_count < 1) stops_markup = "nonstop";
        let duration = slices[i]?.duration || "N/A";

        markup += `
            <p style="color: ${slice_color}; font-size: 13px; margin-top: 20px; margin-bottom: 10px;">
                <i style="color: lightgreen; margin-right: 5px;" class="fa fa-check"></i>
                 ${slice_title} (${stops_markup})
                <span style="margin-left: 10px; color: orange;">${duration}</span>
            </p>
            <div>
        `;
        for(let j=0; j<segments?.length; j++){
            let alts=(j%2);
            //let color = (alts) ? "yellowgreen" : "lightgreen";

            let airports = `
                ${segments[j]?.origin?.name || "N/A"}, 
                ${segments[j]?.origin?.city_name || "N/A"}, 
                (${segments[j]?.origin?.iata_country_code || "N/A"})
                <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                ${segments[j]?.destination?.name || "N/A"}, 
                ${segments[j]?.destination?.city_name || "N/A"}, 
                (${segments[j]?.destination?.iata_country_code || "N/A"})
            `;
            
            let travel_dates = `
                ${segments[j]?.departure_datetime?.replaceAll("T", " @ ") || "N/A"}
                <span style="color: rgba(255,255,255,0.5); margin: 0 10px;">-</span>
                ${segments[j]?.arrival_datetime?.replaceAll("T", " @ ") || "N/A"}
            `;

            let aircraft = segments[j]?.aircraft?.name || "N/A";
            let operating_carrier = segments[j]?.operating_carrier?.name || "N/A";

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

function return_selected_flight_booking_additional_info_markup(additional_info){

    let data_provider_live_mode_markup = "";
    let lvm_color_val="";
    let lvm_body_msg="";
    let lvm_icon="";
    let lvm_bg_color_val="";

    if(additional_info?.provider_live_mode){
        lvm_color_val="lightgreen";
        lvm_body_msg="Merchant was in Live Mode during this booking!";
        lvm_icon="check";
        lvm_bg_color_val="rgba(0,255,0,0.1)";
    } else {
        lvm_color_val="red";
        lvm_body_msg="Warning: Merchant was in Test Mode during this booking!"
        lvm_icon="exclamation-triangle";
        lvm_bg_color_val="rgba(255,0,0,0.1)";
    }

    data_provider_live_mode_markup += `
        <div style="background-color: ${lvm_bg_color_val}; color: rgba(255,255,255,0.8); padding: 10px; margin: 10px 0; border-left: 3px solid ${lvm_color_val}; font-size: 13px;">
            <i style="color: ${lvm_color_val}; margin-right: 10px"
                class="fa fa-${lvm_icon}"></i>
            ${lvm_body_msg}
        </div>
    `;

    let data_provider_payment_status_markup = "";
    let color_val="";
    let body_msg="";
    let icon="";
    let bg_color_val="";

    if (additional_info?.provider_payment_status){
        if(additional_info?.provider_payment_status?.awaiting_payment){
            let payment_required_by = additional_info?.provider_payment_status?.payment_required_by;
            let price_guarantee_expires_at = additional_info?.provider_payment_status?.price_guarantee_expires_at;
            color_val="red";
            body_msg="Warning: Merchant payment for this flight was not completed."
                    +(payment_required_by ? ` Payment required by: ${payment_required_by}.` : "")
                    +(price_guarantee_expires_at ? ` Price guarantee expires at: ${price_guarantee_expires_at}.` : "");
            icon="exclamation-triangle";
            bg_color_val="rgba(255,0,0,0.1)";
        } else {
            let paid_at = additional_info?.provider_payment_status?.paid_at;
            color_val="lightgreen";
            body_msg="Merchant payment was completed successfully"+(paid_at ? ` @ ${paid_at}` : "");
            icon="check";
            bg_color_val="rgba(0,255,0,0.1)";
        }
    }

    data_provider_payment_status_markup += `
        <div style="background-color: ${bg_color_val}; color: rgba(255,255,255,0.8); padding: 10px; margin: 10px 0; border-left: 3px solid ${color_val}; font-size: 13px;">
            <i style="color: ${color_val}; margin-right: 10px"
                class="fa fa-${icon}"></i>
            ${body_msg}
        </div>
    `;

    let data_provider_available_actions_markup = `
        <div style="background-color: rgba(255,0,0,0.1); color: rgba(255,255,255,0.8); padding: 10px; margin: 10px 0; border-left: 3px solid red; font-size: 13px;">
            <i style="color: red; margin-right: 10px"
                class="fa fa-exclamation-triangle"></i>
            Booking changes not allowed for this booking!
        </div>
    `;
    let data_provider_available_actions = additional_info?.available_actions;

    if(data_provider_available_actions){
        data_provider_available_actions_markup = `
            <p style="font-size: 13px; color: white; margin: 10px; text-decoration: underline;">
                <i style="margin-right: 5px; color: lightgreen;" class="fa-solid fa-info-circle"></i>
                Actions Included as follows:
            </p>
        `;
        data_provider_available_actions.forEach(each=>{
            data_provider_available_actions_markup += `
                <p style="color: yellow; font-size: 13px; margin-bottom: 5px;">
                    <i style="color: green; margin-right: 10px"
                        class="fa fa-check"></i> ${each?.toUpperCase()}:
                    <span style="margin-left: 10px; color: rgba(255,255,255,0.8);">allowed</span>
                </p>
            `;
        });
    }

    return `
        ${data_provider_live_mode_markup}
        ${data_provider_available_actions_markup}
        ${data_provider_payment_status_markup}
    `;
}

function render_selected_booking_vs_payment_status (booking_payment) {

    let b_success=(booking_payment?.booking_status.toLowerCase()==="confirmed");
    let p_success=(booking_payment?.payment_status.toLowerCase()==="succeeded");
    let color_val="";
    let body_msg="";
    let icon="";
    let bg_color_val="";
    if (b_success && p_success) {
        color_val = "lightgreen";
        bg_color_val = "rgba(0,255,0,0.1)";
        body_msg="Both booking and payment were successful";
        icon="check";
    } else {
        color_val = "red";
        bg_color_val = "rgba(255,0,0,0.1)";
        icon="exclamation-triangle";
        if (b_success && !p_success) {
            body_msg="Booking was successful, but payment failed";
        } else if (!b_success && p_success) {
            body_msg="Payment was successful, but booking failed";
        } else {
            body_msg="Both booking and payment failed";
        }
    }

    let bp_payment_live_mode_markup = "";
    if(!booking_payment?.payment_intent?.livemode){
        bp_payment_live_mode_markup = `
            <p style="padding: 10px; margin: 10px; border: 3px dashed orange; background-color: red; color: yellow;">
                <i style="color: orange; margin-right: 10px"
                    class="fa fa-exclamation-triangle"></i>
                Warning: Payment was made in Test Mode!
            </p>
        `;
    }

    document.getElementById("selected_booking_booking_vs_payment_status_information").innerHTML = `
        <div style="background-color: ${bg_color_val}; color: rgba(255,255,255,0.8); padding: 10px; margin: 10px 0; border-left: 3px solid ${color_val}; font-size: 13px;">
            <i style="color: ${color_val}; margin-right: 10px"
                class="fa fa-${icon}"></i>
            ${body_msg}
            ${bp_payment_live_mode_markup}
            <p style="color: red; font-size: 13px; text-align: center; cursor: pointer; margin-top: 10px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.1)"
            id="show_more_selected_booking_booking_vs_payment_status_information_btn">Show Json Data</p>
        </div>
        <p>
            <pre id="selected_booking_booking_vs_payment_status_information_json_details"
                 style="background-color: white; border: 2px dashed red; font-size: 13px; display: none; margin-bottom: 10px"
                >${JSON.stringify(booking_payment, null, 2)}</pre>
        </p>
    `;
    setTimeout(()=>{
        document.getElementById("show_more_selected_booking_booking_vs_payment_status_information_btn").addEventListener("click", evnt => {
            let elem = document.getElementById('selected_booking_booking_vs_payment_status_information_json_details');
            let btn_elem = document.getElementById('show_more_selected_booking_booking_vs_payment_status_information_btn');
            if(elem?.style?.display === 'none'){
                elem.style.display = 'block';
                btn_elem.innerText = "Hide Json Data";
            }else {
                elem.style.display = 'none';
                btn_elem.innerText = "Show Json Data";
            }
            
        });
    }, 200);
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
    console.log("here:::", booking);
    window.__forceSetBookingHealthCheckerData(booking);

    let general_info = {};
    let additional_info = {};
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
        general_info.services = booking.originPayloads[0].services;
        // additional information
        additional_info.provider_payment_status = booking.originPayloads[0].payment_status;
        additional_info.available_actions = booking.originPayloads[0].available_actions;
        additional_info.provider_live_mode = booking.originPayloads[0].live_mode;        

        //document.getElementById("selected_booking_status_display_container")
        //  .innerHTML = return_selected_booking_status_display_markup("flight", "status");
        document.getElementById("selected_booking_general_information_container")
            .innerHTML = return_selected_booking_general_info("flight", general_info);
        document.getElementById("selected_booking_travelers_or_guests_list")
            .innerHTML = return_selected_flight_booking_travelers_markup(passengers);
        document.getElementById("selected_booking_flights_segments_container")
            .innerHTML = return_selected_flight_booking_segments_markup(slices);
        document.getElementById("selected_booking_additional_info_container")
            .innerHTML = return_selected_flight_booking_additional_info_markup(additional_info);
        document.getElementById("selected_booking_flights_prices_container")
            .innerHTML = return_selected_flight_booking_payment_markup(payment_obj);

        // Rendering booking status against payment status.
        let bp_status = booking?.booking_intent;
        render_selected_booking_vs_payment_status (bp_status);
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

export function render_stats_totals_summery_values(titles_arr, values_arr){
    let markup = `
        <tr class="headers">
            <td>
                Title
            </td>
            <td>
                Total
            </td>
        </tr>
    `;

    let total_booking_attempts = 0;
    let total_confirmed_bookings = 0;
    let total_payment_attempts = 0;
    let total_confirmed_payments = 0;
    let total_failed_bookings = 0;
    
    for(let i=0; i<titles_arr.length;i++){

        if (titles_arr[i] === "Booking Attempts") total_booking_attempts = parseInt(values_arr[i]);
        if (titles_arr[i] === "Confirmed Bookings") total_confirmed_bookings = parseInt(values_arr[i]);
        if (titles_arr[i] === "Payment Attempts") total_payment_attempts = parseInt(values_arr[i]);
        if (titles_arr[i] === "Confirmed Payments") total_confirmed_payments = parseInt(values_arr[i]);
        if (titles_arr[i] === "Failed Bookings") total_failed_bookings = parseInt(values_arr[i]);

        let additional_css = (titles_arr[i] === "Failed Bookings") ? "theme-attention" : "";
        additional_css = (
            (total_booking_attempts > total_confirmed_bookings && titles_arr[i] === "Confirmed Bookings") ||
            (total_payment_attempts > total_confirmed_payments && titles_arr[i] === "Confirmed Payments") ||
            (total_failed_bookings > 0 && titles_arr[i] === "Failed Bookings")
        ) ? "theme-warning" : additional_css;

        let additional_markup = (additional_css === "theme-warning" && titles_arr[i] !== "Failed Bookings") ? 
            `<span class="tool-tip-parent">
                <span class="tool-tip" style="left: -100px; color: black; z-index: 1;">
                    more ${(titles_arr[i] === "Confirmed Bookings") ? "booking" : ""} 
                    ${(titles_arr[i] === "Confirmed Payments") ? "payment" : ""} 
                    attempts than confirmed 
                    ${(titles_arr[i] === "Confirmed Bookings") ? "bookings" : ""}
                    ${(titles_arr[i] === "Confirmed Payments") ? "payments" : ""} 
                </span>
                <i class="fa fa-exclamation-triangle"></i>
            </span>` : "";

        additional_markup += (additional_css === "theme-warning" && titles_arr[i] === "Failed Bookings") ? 
            `<span class="tool-tip-parent">
                <span class="tool-tip" style="left: -100px; color: black; z-index: 1;">
                    ${total_failed_bookings} failed bookings
                </span>
                <i class="fa fa-exclamation-triangle"></i>
            </span>` : "";

        markup+=`
            <tr>
                <td class="title ${additional_css}">
                    ${titles_arr[i]}
                </td>
                <td class=" ${additional_css}">
                    ${values_arr[i]}
                    ${additional_markup}
                </td>
            </tr>
        `;
    }
    return markup;
}