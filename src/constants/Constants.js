const CONSTANTS = {
    our_company: {
        name: "Byte The Code LLC",
        product: "Wellgo-OC.com",
        product_market_name: "Welldugo-OC.com",
        contacts: {
            support: {
                email: "adinanaries@outlook.com",
                tel: "+17327999546",
                mobile: "+17327999546",
            }
        }
    },
    language_support: {
        enabled: false,
        default: "ENGLISH"
    },
    currency_support: {
        enabled: false,
        default: "USD"
    },
    app_role_constants: {
        owner: 1,
        admin: 2,
        agent: 3,
    },
    app_page_constants: {
        bookings: 1,
        packges_and_deals: 2,
        support: 3,
        sales: 4,
        marketing: 5,
        customers: 6,
        analytics: 7,
        channels: 8,
        staff: 9,
        partners: 10
    },
    app_resource_constants: {
        account: 1,
        app_settings: 2,
    },
    app_resource_can_actions: {
        create_account: 1,
        edit_account: 2,
        delete_account: 3,
        view_ccount: 4,
        view_app_settings: 5,
        update_app_ettings: 6,
    },
    viewport_threshold: 1000,
    infant_age_threshold: 5,
    special_str_separator: " [$/*S#_P#_R#T*/$] ",
    round_trip: "ROUND-TRIP",
    one_way: "ONE-WAY",
    duffel: "DUFFEL",
    dev: "DEVELOPMENT",
    prod: "PRODUCTION",
    default_currency: "USD",
    default_language: "ENGLISH",
    local_storage: {
        wellgo_usr_curr: "wellgo_usr_curr",
        wellgo_usr_lang: "wellgo_usr_lang",
        flight_search_object: "search_obj",
        logged_in_usr: "logged_in_usr",
        product_type: "product_type",
        hotel_search_obj: "hotel_search_obj"
    },
    log_types: {
        activity: "activity",
        warning: "warning",
        error: "error",
        booking_error: "booking-error"
    },
    resource_types: {
        booking_history: "Booking History",
        user_favorites: "User Favorites",
    },
    checkout_pages: {
        info: "INFO_PAGE",
        pnr: "PNR_PAGE",
        payment: "PAYMENT_PAGE",
        hotel: {
            guests: "GUESTS_PAGE",
        },
        rental_car: {
            driver_forms: "DRIVER_FORMS_PAGE"
        }
    },
    site_pages: {
        account: "account",
        landing: "home",
        search: "search",
        trips: "trips",
        explore: "explore",
        deals: "deals",
        support: "support",
    },
    pagination: {
        length: 5,
    },
    duffel_checkout: {
        payment: {
            types: {
                balance: "balance",
                arc_bsp_cash: "arc_bsp_cash",
            }
        }
    },
    prices: {
        markup_percentage: 10,
    },
    product_types: {
        flights: 0,
        stays: 1,
        rental_cars: 2,
    },
    bot: {
        prompt_types: {
            warn: "warn",
            prompt: "prompt",
        },
        responses: {
            introduction_greetings: "introduction greetings",
            no_hotel_booking: "no hotel booking",
            no_language_support: "no language support",
            no_currency_support: "no currency support",
            no_cars_renting: "no cars renting",
            no_travel_packages : "no travel packages",
            uncompleted_pnr: "incomplete passenger name record",
            not_logged_in_on_checkout_complete: "checkout completed but user is not logged in",
        }
    },
    envs: [ "PRODUCTION", "DEVELOPMENT", "STAGE" ],
    is_test_mode: false,
    disabled_features: {
        payment: false,
        stays_search: true,
        rental_car_search: true,
        flight_search: false,
        travel_packages: true,
        bot_aide: {
            chat: true,
            prompts: false,
            settings: true,
            history_page: true,
        },
        user_account: {
            frequent_flyer_and_membership: true,
        }
    }
}

export default CONSTANTS;