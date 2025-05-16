function wdg_init_airports_auto_complete(){

    window.toggle_show_from_where_airport_input_auto_complete = (is_show=true) => {
        if(is_show)
            document.getElementById("departure_airport_auto_complete_container").style.display="block";
        else
            document.getElementById("departure_airport_auto_complete_container").style.display="none";
    }
    window.toggle_show_to_where_airport_input_auto_complete = (is_show=true) => {
        if(is_show)
            document.getElementById("destination_airport_auto_complete_container").style.display="block";
        else
            document.getElementById("destination_airport_auto_complete_container").style.display="none";
    }

    //Array filter method wrapped in function to improve code reuse
    function filter_airports_array_based_input_value(elem_value){

        return AirportsData.filter(each => {
            return (
            each.city.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", "")) 
            || each.name.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || each.IATA.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || each.country.toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.city + each.name).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.city + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.city + each.country + each.name + each.IATA).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.country + each.city + each.name + each.IATA).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.name + each.city + each.country + each.IATA).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.name + each.IATA + each.city + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.IATA + each.name + each.city + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.IATA + each.city + each.name + each.country).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.IATA + each.city + each.country + each.name).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            || (each.IATA + each.country + each.city + each.name).toLowerCase().replaceAll(" ", "").includes(elem_value.toLowerCase().replaceAll(" ", ""))
            )
        });

    }

    if(document.getElementById("from_where_airports_auto_complete_input_fld")){
        document.getElementById("from_where_airports_auto_complete_input_fld").addEventListener("input", (evnt)=>{
            let counter = 0;
            document.getElementById("flights_auto_complete_from_where_input_list").innerHTML = "";
            let flights = [];

            //if backspace has been pressed, don't auto-complete on input
            if(!evnt.data){
                return null;
            }

            if(evnt.target.value){

                flights = filter_airports_array_based_input_value(evnt.target.value);

                flights = flights.map(elem => {
                        counter++;
                        return counter < 6 && `
                            <li><div onclick="changeAirportsFromInput('${elem.city} - ${elem.name} (${elem.IATA})', '${elem.IATA}', '${elem.ICAO}');" class="autocomplete_list_each_item_container">
                                <div>
                                    <p class="autocomplete_list_airport_city_name">
                                        <i class="fa fa-plane"></i>
                                        ${elem.city} (${elem.IATA} - ${elem.name})
                                    </p>
                                    <p class="autocomplete_list_country_name">
                                        ${elem.country}
                                    </p>
                                </div>
                            </div></li>`;
                        
                    })
            }
            //console.log(flights);
            document.getElementById("flights_auto_complete_from_where_input_list").innerHTML = flights.join('').replaceAll("false","");
        })
    }

    window.changeAirportsFromInput = (airport, iata, icao) => {
        window.toggle_show_from_where_airport_input_auto_complete(false);
        document.getElementById("from_where_airports_auto_complete_input_fld").value = airport;
        document.getElementById("search_forms_from_where_input_fld").value = airport;
        add_origin_input_airport_to_history(iata)
        let flight_search_data = JSON.parse(localStorage.getItem("search_obj"));
        flight_search_data.itinerary.departure.airport = iata;
        //fligh_search_data.origin_iata = iata;

        if(iata === "\\N" || iata === "N"){
            add_origin_input_airport_to_history(icao)
            flight_search_data.itinerary.departure.airport = icao;
            //fligh_search_data.origin_iata = icao;
            document.getElementById("from_where_airports_auto_complete_input_fld").value = airport.split("(")[0] + " (" + icao + ")";
            document.getElementById("search_forms_from_where_input_fld").value = airport.split("(")[0] + " (" + icao + ")";
        }

        window.localStorage.setItem("search_obj", JSON.stringify(flight_search_data));
    }

    //Destination Airports Auto Completion
    if(document.getElementById("to_where_airports_auto_complete_input_fld")){
        document.getElementById("to_where_airports_auto_complete_input_fld").addEventListener("input", (evnt)=>{
            let counter = 0;
            document.getElementById("flights_auto_complete_to_where_input_list").innerHTML = "";
            let flights = [];

            //if backspace has been pressed, don't auto-complete on input
            if(!evnt.data){
                return null;
            }

            if(evnt.target.value){

                flights = filter_airports_array_based_input_value(evnt.target.value);

                flights = flights.map(elem => {
                    counter++;
                    return counter < 6 && `
                            <li><div onclick="changeAirportsToInput('${elem.city} - ${elem.name} (${elem.IATA})', '${elem.IATA}', '${elem.ICAO}');" class="autocomplete_list_each_item_container">
                                <div>
                                    <p class="autocomplete_list_airport_city_name">
                                        <i class="fa fa-plane"></i>
                                        ${elem.city} (${elem.IATA} - ${elem.name})
                                    </p>
                                    <p class="autocomplete_list_country_name">
                                        ${elem.country}
                                    </p>
                                </div>
                            </div></li>`;
                    
                });
            }
            //console.log(flights);
            document.getElementById("flights_auto_complete_to_where_input_list").innerHTML = flights.join('').replaceAll("false","");
        })
    }

    window.changeAirportsToInput = (airport, iata, icao) => {
        window.toggle_show_to_where_airport_input_auto_complete(false);
        document.getElementById("to_where_airports_auto_complete_input_fld").value = airport;
        document.getElementById("search_forms_to_where_input_fld").value = airport;
        add_destination_input_airport_to_history(iata)
        let flight_search_data = JSON.parse(localStorage.getItem("search_obj"));
        flight_search_data.itinerary.arrival.airport = iata;
        //fligh_search_data.destination_iata = iata;

        if(iata === "\\N" || iata === "N"){
            add_destination_input_airport_to_history(icao)
            flight_search_data.itinerary.arrival.airport = icao;
            //fligh_search_data.destination_iata = icao;
            document.getElementById("to_where_airports_auto_complete_input_fld").value = airport.split("(")[0] + " (" + icao + ")";
            document.getElementById("search_forms_to_where_input_fld").value =  airport.split("(")[0] + " (" + icao + ")";
        }

        window.localStorage.setItem("search_obj", JSON.stringify(flight_search_data));
    }

    //-------------------------------------------------------------------------------------------------------------------
    if(document.getElementById("sp_from_where_airports_auto_complete_input_fld")){
        //search results page forms
        document.getElementById("sp_from_where_airports_auto_complete_input_fld").addEventListener("input", (evnt)=>{
            let counter = 0;
            document.getElementById("sp_flights_auto_complete_from_where_input_list").innerHTML = "";
            let flights = [];

            //if backspace has been pressed, don't auto-complete on input
            if(!evnt.data){
                return null;
            }

            if(evnt.target.value){

                flights = filter_airports_array_based_input_value(evnt.target.value);

                flights = flights.map(elem => {
                        counter++;
                        return counter < 6 && `
                            <li><div onclick="sp_changeAirportsFromInput('${elem.city} - ${elem.name} (${elem.IATA})', '${elem.IATA}', '${elem.ICAO}');" class="autocomplete_list_each_item_container">
                                <div>
                                    <p class="autocomplete_list_airport_city_name">
                                        <i class="fa fa-plane"></i>
                                        ${elem.city} (${elem.IATA} - ${elem.name})
                                    </p>
                                    <p class="autocomplete_list_country_name">
                                        ${elem.country}
                                    </p>
                                </div>
                            </div></li>`;
                        
                    })
            }
            //console.log(flights);
            document.getElementById("sp_flights_auto_complete_from_where_input_list").innerHTML = flights.join('').replaceAll("false","");
        })
    }


    function sp_changeAirportsFromInput(airport, iata, icao){
        document.getElementById("sp_from_where_airports_auto_complete_input_fld").value = airport;
        document.getElementById("sp_search_forms_from_where_input_fld").value = airport;
        sp_add_origin_input_airport_to_history(iata)
        let flight_search_data = JSON.parse(localStorage.getItem("search_obj"));
        flight_search_data.itinerary.departure.airport = iata;
        //fligh_search_data.origin_iata = iata;

        if(iata === "\\N" || iata === "N"){
            sp_add_origin_input_airport_to_history(icao)
            flight_search_data.itinerary.departure.airport = icao;
            //fligh_search_data.origin_iata = icao;
            document.getElementById("sp_from_where_airports_auto_complete_input_fld").value = airport.split("(")[0] + " (" + icao + ")";
            document.getElementById("sp_search_forms_from_where_input_fld").value = airport.split("(")[0] + " (" + icao + ")";
        }

        window.localStorage.setItem("search_obj", JSON.stringify(flight_search_data));
    }

    //Destination Airports Auto Completion
    if(document.getElementById("sp_to_where_airports_auto_complete_input_fld")){
        document.getElementById("sp_to_where_airports_auto_complete_input_fld").addEventListener("input", (evnt)=>{
            let counter = 0;
            document.getElementById("sp_flights_auto_complete_to_where_input_list").innerHTML = "";
            let flights = [];

            //if backspace has been pressed, don't auto-complete on input
            if(!evnt.data){
                return null;
            }

            if(evnt.target.value){

                flights = filter_airports_array_based_input_value(evnt.target.value);

                flights = flights.map(elem => {
                    counter++;
                    return counter < 6 && `
                            <li><div onclick="sp_changeAirportsToInput('${elem.city} - ${elem.name} (${elem.IATA})', '${elem.IATA}', '${elem.ICAO}');" class="autocomplete_list_each_item_container">
                                <div>
                                    <p class="autocomplete_list_airport_city_name">
                                        <i class="fa fa-plane"></i>
                                        ${elem.city} (${elem.IATA} - ${elem.name})
                                    </p>
                                    <p class="autocomplete_list_country_name">
                                        ${elem.country}
                                    </p>
                                </div>
                            </div></li>`;
                    
                });
            }
            //console.log(flights);
            document.getElementById("sp_flights_auto_complete_to_where_input_list").innerHTML = flights.join('').replaceAll("false","");
        })
    }


    function sp_changeAirportsToInput(airport, iata, icao){
        if(document.getElementById("sp_to_where_airports_auto_complete_input_fld"))
            document.getElementById("sp_to_where_airports_auto_complete_input_fld").value = airport;
        if(document.getElementById("sp_search_forms_to_where_input_fld"))
            document.getElementById("sp_search_forms_to_where_input_fld").value = airport;
        sp_add_destination_input_airport_to_history(iata)
        let flight_search_data = JSON.parse(localStorage.getItem("search_obj"));
        flight_search_data.itinerary.arrival.airport = iata;
        //fligh_search_data.destination_iata = iata;

        if(iata === "\\N" || iata === "N"){
            sp_add_destination_input_airport_to_history(icao)
            flight_search_data.itinerary.arrival.airport = icao;
            //fligh_search_data.destination_iata = icao;
            if(document.getElementById("sp_to_where_airports_auto_complete_input_fld"))
                document.getElementById("sp_to_where_airports_auto_complete_input_fld").value = airport.split("(")[0] + " (" + icao + ")";
            if(document.getElementById("sp_search_forms_to_where_input_fld"))
                document.getElementById("sp_search_forms_to_where_input_fld").value =  airport.split("(")[0] + " (" + icao + ")";
        }

        window.localStorage.setItem("search_obj", JSON.stringify(flight_search_data));
    }

    //---------------------------------------------------------------------------------------------------------------------
    /*function *filter(array, condition, maxSize) {
        if (!maxSize || maxSize > array.length) {
        maxSize = array.length;
        }
        let count = 0;
        let i = 0;
        while ( count< maxSize && i < array.length ) {
        if (condition(array[i])) {
            yield array[i];
            count++;
        }
        i++;
        }
    }
    
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    console.log( Array.from( filter(array, i => i % 2 === 0, 2 ) ) );*/
    let aiports_input_history = {
        from: [],
        to: []
    }

    function add_origin_input_airport_to_history(aita){

        if(window.localStorage.getItem("airports_input_history")){
            let airports_history = JSON.parse(window.localStorage.getItem("airports_input_history"));
            
            //removing existing same vlaue
            airports_history.from = airports_history.from.filter(each => {
                return (each !== aita)
            });

            let temp_airports = [];
            if(airports_history.from.length > 4){
                for(let i=1; i<5; i++){
                    temp_airports.push(airports_history.from[i]);
                }
                console.log(temp_airports);
                airports_history.from = [...temp_airports, aita];
            }else{
                airports_history.from.push(aita);
            }
            localStorage.setItem("airports_input_history", JSON.stringify(airports_history));
        }else{
            aiports_input_history.from.push(aita);
            window.localStorage.setItem("airports_input_history", JSON.stringify(aiports_input_history));
        }
        
    }
    function add_destination_input_airport_to_history(aita){

        if(window.localStorage.getItem("airports_input_history")){
            let airports_history = JSON.parse(window.localStorage.getItem("airports_input_history"));
            
            //removing existing same vlaue
            airports_history.to = airports_history.to.filter(each => {
                return (each !== aita)
            });

            let temp_airports = [];
            if(airports_history.to.length > 4){
                for(let i=1; i<5; i++){
                    temp_airports.push(airports_history.to[i]);
                }
                console.log(temp_airports);
                airports_history.to = [...temp_airports, aita];
            }else{
                airports_history.to.push(aita);
            }
            localStorage.setItem("airports_input_history", JSON.stringify(airports_history));
        }else{
            aiports_input_history.to.push(aita);
            window.localStorage.setItem("airports_input_history", JSON.stringify(aiports_input_history));
        }
        
    }

    function show_all_origin_airport_history(){

        document.getElementById("flights_auto_complete_from_where_input_list").innerHTML = "";
        let airports_history = JSON.parse(window.localStorage.getItem("airports_input_history"));
        console.log(airports_history)
        for(let i = (airports_history.from.length-1); ; ){
            let airport;
            if(i<0) break;
            airport = AirportsData.filter(each => {
                return (each.IATA === airports_history.from[i] || each.ICAO === airports_history.from[i]);
            });
            if(airport.length===0){ 
                i--;
                continue;
            }
            document.getElementById("flights_auto_complete_from_where_input_list").innerHTML += return_history_markup(airport[0], "origin");
            i--;
        }
    }

    if(document.getElementById("search_forms_from_where_input_fld")){
        document.getElementById("search_forms_from_where_input_fld").addEventListener("click", e => {
            window.toggle_show_from_where_airport_input_auto_complete(true);
            show_all_origin_airport_history();
        });
    }

    function show_all_destination_airport_history(){

        if(document.getElementById("flights_auto_complete_to_where_input_list"))
            document.getElementById("flights_auto_complete_to_where_input_list").innerHTML = "";
        let airports_history = JSON.parse(window.localStorage.getItem("airports_input_history"));
        for(let i = (airports_history.to.length-1); ; ){
            if(i<0) break;
            let airport = AirportsData.filter(each => {
                return (each.IATA === airports_history.to[i] || each.ICAO === airports_history.to[i]);
            });
            if(document.getElementById("flights_auto_complete_to_where_input_list"))
                document.getElementById("flights_auto_complete_to_where_input_list").innerHTML += return_history_markup(airport[0], "destination");
            i--;
        }
    }

    if(document.getElementById("search_forms_to_where_input_fld")){
        document.getElementById("search_forms_to_where_input_fld").addEventListener("click", e => {
            window.toggle_show_to_where_airport_input_auto_complete(true);
            show_all_destination_airport_history();
        });
    }

    function return_history_markup(obj, type){
        if(type === "origin"){
            return `
                <li><div onclick="changeAirportsFromInput('${obj.city} - ${obj.name} (${obj.IATA})', '${obj.IATA}', '${obj.ICAO}');" style="padding: 10px; display: flex; flex-direction: row; cursor: pointer;">
                    <div style="height: 35px; margin-right: 15px; display: flex; flex-direction: column; justify-content: center;">
                        <i class="fa fa-history" style="color: rgba(0,0,0,0.3); font-size: 22px;"></i>
                    </div>
                    <div>
                        <div>
                            <p style="font-size: 14px; color: rgba(0,0,0,0.9); font-family: 'Prompt', sans-serif;">
                                ${obj.city} (${(obj.IATA === "\\N" || obj.IATA === "N") ? obj.ICAO : obj.IATA} - ${obj.name})
                            </p>
                            <p style="font-size: 13px; color: rgba(0,0,0,0.8);">
                                ${obj.country}
                            </p>
                        </div>
                    </div>
                </div></li>
            `;
        }else{
            return `
                <li><div onclick="changeAirportsToInput('${obj.city} - ${obj.name} (${obj.IATA})', '${obj.IATA}', '${obj.ICAO}');" style="padding: 10px; display: flex; flex-direction: row; cursor: pointer;">
                    <div style="height: 35px; margin-right: 15px; display: flex; flex-direction: column; justify-content: center;">
                        <i class="fa fa-history" style="color: rgba(0,0,0,0.3); font-size: 22px;"></i>
                    </div>
                    <div>
                        <div>
                            <p style="font-size: 14px; color: rgba(0,0,0,0.9); font-family: 'Prompt', sans-serif;">
                                ${obj.city} (${(obj.IATA === "\\N" || obj.IATA === "N") ? obj.ICAO : obj.IATA} - ${obj.name})
                            </p>
                            <p style="font-size: 13px; color: rgba(0,0,0,0.8);">
                                ${obj.country}
                            </p>
                        </div>
                    </div>
                </div></li>
            `;
        }
        
    }


    //search page airports history
    let sp_aiports_input_history = {
        from: [],
        to: []
    }
    function sp_add_origin_input_airport_to_history(aita){

        if(window.localStorage.getItem("sp_airports_input_history")){
            let airports_history = JSON.parse(window.localStorage.getItem("sp_airports_input_history"));
            
            //removing existing same vlaue
            airports_history.from = airports_history.from.filter(each => {
                return (each !== aita)
            });

            let temp_airports = [];
            if(airports_history.from.length > 4){
                for(let i=1; i<5; i++){
                    temp_airports.push(airports_history.from[i]);
                }
                console.log(temp_airports);
                airports_history.from = [...temp_airports, aita];
            }else{
                airports_history.from.push(aita);
            }
            localStorage.setItem("sp_airports_input_history", JSON.stringify(airports_history));
        }else{
            sp_aiports_input_history.from.push(aita);
            window.localStorage.setItem("sp_airports_input_history", JSON.stringify(sp_aiports_input_history));
        }
        
    }
    function sp_add_destination_input_airport_to_history(aita){

        if(window.localStorage.getItem("sp_airports_input_history")){
            let airports_history = JSON.parse(window.localStorage.getItem("sp_airports_input_history"));
            
            //removing existing same vlaue
            airports_history.to = airports_history.to.filter(each => {
                return (each !== aita)
            });

            let temp_airports = [];
            if(airports_history.to.length > 4){
                for(let i=1; i<5; i++){
                    temp_airports.push(airports_history.to[i]);
                }
                console.log(temp_airports);
                airports_history.to = [...temp_airports, aita];
            }else{
                airports_history.to.push(aita);
            }
            localStorage.setItem("sp_airports_input_history", JSON.stringify(airports_history));
        }else{
            aiports_input_history.to.push(aita);
            window.localStorage.setItem("sp_airports_input_history", JSON.stringify(sp_aiports_input_history));
        }
        
    }

    function sp_show_all_origin_airport_history(){

        document.getElementById("sp_flights_auto_complete_from_where_input_list").innerHTML = "";
        let airports_history = JSON.parse(window.localStorage.getItem("sp_airports_input_history"));
        //console.log(airports_history)
        for(let i = (airports_history.from.length-1); ; ){
            let airport;
            if(i<0) break;
            airport = AirportsData.filter(each => {
                return (each.IATA === airports_history.from[i] || each.ICAO === airports_history.from[i]);
            });
            if(airport.length===0){ 
                i--;
                continue;
            }
            document.getElementById("sp_flights_auto_complete_from_where_input_list").innerHTML += sp_return_history_markup(airport[0], "origin");
            i--;
        }
    }

    if(document.getElementById("sp_search_forms_from_where_input_fld")){
        document.getElementById("sp_search_forms_from_where_input_fld").addEventListener("click", e => {
            sp_show_all_origin_airport_history();
        });
    }

    function sp_show_all_destination_airport_history(){
        if(document.getElementById("sp_flights_auto_complete_to_where_input_list"))
            document.getElementById("sp_flights_auto_complete_to_where_input_list").innerHTML = "";
        let airports_history = JSON.parse(window.localStorage.getItem("sp_airports_input_history"));
        for(let i = (airports_history.to.length-1); ; ){
            if(i<0) break;
            let airport = AirportsData.filter(each => {
                return (each.IATA === airports_history.to[i] || each.ICAO === airports_history.to[i]);
            });
            if(document.getElementById("sp_flights_auto_complete_to_where_input_list").innerHTML)
                document.getElementById("sp_flights_auto_complete_to_where_input_list").innerHTML += sp_return_history_markup(airport[0], "destination");
            i--;
        }
    }

    if(document.getElementById("sp_search_forms_to_where_input_fld")){
        document.getElementById("sp_search_forms_to_where_input_fld").addEventListener("click", e => {
            sp_show_all_destination_airport_history();
        });
    }

    function sp_return_history_markup(obj, type){
        if(type === "origin"){
            return `
                <li><div onclick="sp_changeAirportsFromInput('${obj.city} - ${obj.name} (${obj.IATA})', '${obj.IATA}', '${obj.ICAO}');" style="padding: 10px; display: flex; flex-direction: row; cursor: pointer;">
                    <div style="height: 35px; margin-right: 15px; display: flex; flex-direction: column; justify-content: center;">
                        <i class="fa fa-history" style="color: rgba(0,0,0,0.3); font-size: 22px;"></i>
                    </div>
                    <div>
                        <div>
                            <p style="font-size: 14px; color: rgba(0,0,0,0.9); font-family: 'Prompt', sans-serif;">
                                ${obj.city} (${(obj.IATA === "\\N" || obj.IATA === "N") ? obj.ICAO : obj.IATA} - ${obj.name})
                            </p>
                            <p style="font-size: 13px; color: rgba(0,0,0,0.8);">
                                ${obj.country}
                            </p>
                        </div>
                    </div>
                </div></li>
            `;
        }else{
            return `
                <li><div onclick="sp_changeAirportsToInput('${obj.city} - ${obj.name} (${obj.IATA})', '${obj.IATA}', '${obj.ICAO}');" style="padding: 10px; display: flex; flex-direction: row; cursor: pointer;">
                    <div style="height: 35px; margin-right: 15px; display: flex; flex-direction: column; justify-content: center;">
                        <i class="fa fa-history" style="color: rgba(0,0,0,0.3); font-size: 22px;"></i>
                    </div>
                    <div>
                        <div>
                            <p style="font-size: 14px; color: rgba(0,0,0,0.9); font-family: 'Prompt', sans-serif;">
                                ${obj.city} (${(obj.IATA === "\\N" || obj.IATA === "N") ? obj.ICAO : obj.IATA} - ${obj.name})
                            </p>
                            <p style="font-size: 13px; color: rgba(0,0,0,0.8);">
                                ${obj.country}
                            </p>
                        </div>
                    </div>
                </div></li>
            `;
        }
        
    }
}