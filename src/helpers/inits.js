let $ = window.$;

window.__initCreateSearchLinkDateInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#create_search_link_date_input').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
  
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__slDateOnChange(d_val);
      }, 100);
  
    });
  });
  
}

export const dashboardInits = () => {

    window.__inits_from_endpoing_calls_file();
    
    // date choosers
    $(function() {
        $('#booked-flight-search-dates-input').daterangepicker({
          singleDatePicker: true,
          opens: 'left',
          //autoUpdateInput: false,
          locale: {
            cancelLabel: 'Clear'
          }
        }, function(start, end, label) {
      
          setTimeout(()=>{
            document.getElementById("booked-flight-search-dates-input").value = start.format('YYYY-MM-DD'); //+" - "+ end.format('YYYY-MM-DD');
            //document.getElementById("booked-flight-search-dates-input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
          }, 100);
      
          //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
          //fligh_search_data.return_date = end.format('YYYY-MM-DD');
      
          //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
      
          //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
      });

      $(function() {
        $('#booked-hotel-search-dates-input').daterangepicker({
          singleDatePicker: true,
          opens: 'left',
          //autoUpdateInput: false,
          locale: {
            cancelLabel: 'Clear'
          }
        }, function(start, end, label) {
      
          setTimeout(()=>{
            document.getElementById("booked-hotel-search-dates-input").value = start.format('YYYY-MM-DD'); //+" - "+ end.format('YYYY-MM-DD');
            //document.getElementById("booked-flight-search-dates-input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
          }, 100);
      
          //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
          //fligh_search_data.return_date = end.format('YYYY-MM-DD');
      
          //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
      
          //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
      });
    
      $(function() {
        $('#bookings-pane-filter-by-dates-input').daterangepicker({
          opens: 'right',
          //autoUpdateInput: false,
          locale: {
            cancelLabel: 'Clear'
          }
        }, function(start, end, label) {
      
          setTimeout(()=>{
            document.getElementById("bookings-pane-filter-by-dates-input").value = start.format('YYYY-MM-DD') +" - "+ end.format('YYYY-MM-DD');
            //document.getElementById("bookings-pane-filter-by-dates-input").value = start.toString().substring(0,11) +" - "+ end.toString().substring(0,11);
          }, 100);
      
          //fligh_search_data.departure_date = start.format('YYYY-MM-DD');
          //fligh_search_data.return_date = end.format('YYYY-MM-DD');
      
          //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
      
          //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
      });

      setTimeout(()=>{
        window.__initCreateSearchLinkDateInput(true);
      }, 200);
      
      window.changeAirportsInput = (airport, iata, icao, input_id) => {
          document.getElementById(input_id).value = airport;
          document.getElementById(input_id).iata=iata;
          //fligh_search_data.origin_iata = iata;

          if(iata === "\\N" || iata === "N"){
              //fligh_search_data.origin_iata = icao;
              document.getElementById(input_id).value = "(" + icao + ") " + airport.split(")")[1];
              document.getElementById(input_id).iata=icao;
          }

          //window.localStorage.setItem("flights_post_data", JSON.stringify(fligh_search_data));
      }
      
}