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

window.__initCreateDealPackageGeneralInfoPackageWindowDatesInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageGeneralInfoWindowDatesInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetGeneralInfoPackageWindowDates(d_val);
        document.getElementById("createDealPackageGeneralInfoWindowDatesInput").value = d_val;
      }, 100);
    });
  });
}

window.__initCreateDealPackageCruiseInfoStartDateInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageCruiseInfoStartDateInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetCruiseStartDate(d_val);
        document.getElementById("createDealPackageCruiseInfoStartDateInput").value = d_val;
      }, 100);
    });
  });
}

window.__initCreateDealPackageBusTourInfoStartDateInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageBusTourInfoStartDateInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetBusTourStartDate(d_val);
        document.getElementById("createDealPackageBusTourInfoStartDateInput").value = d_val;
      }, 100);
    });
  });
}

window.__initCreateDealPackageEventInfoStartDateInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageEventInfoStartDateInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetEventStartDate(d_val);
        document.getElementById("createDealPackageEventInfoStartDateInput").value = d_val;
      }, 100);
    });
  });
}

window.__initCreateDealPackageFlightInfoDepartureReturnDatesInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageFlightInfoDepartureReturnDatesInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetFlightDepartureReturnDates(d_val);
        document.getElementById("createDealPackageFlightInfoDepartureReturnDatesInput").value = d_val;
      }, 100);
    });
  });
}

window.__initCreateDealPackageHotelInfoCheckinCheckoutDatesInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageHotelInfoCheckinCheckoutDatesInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetHotelCheckinCheckoutDates(d_val);
        document.getElementById("createDealPackageHotelInfoCheckinCheckoutDatesInput").value = d_val;
      }, 100);
    });
  });
}

window.__initCreateDealPackageRentalCarInfoPickupDropoffDatesInput = (isSingleDatePicker=false) => {
  $(function() {
    $('#createDealPackageRentalCarInfoPickupDropoffDatesInput').daterangepicker({
      singleDatePicker: isSingleDatePicker,
      opens: 'left',
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    }, function(start, end, label) {
      setTimeout(()=>{
        let d_val = start.format('YYYY-MM-DD') +(!isSingleDatePicker ? (" - "+ end.format('YYYY-MM-DD')) : "");
        window.__createDealPackageSetRentalCarPickupDropoffDates(d_val);
        document.getElementById("createDealPackageRentalCarInfoPickupDropoffDatesInput").value = d_val;
      }, 100);
    });
  });
}

export const dashboardInits = () => {

    setTimeout(()=>{
      window.__inits_from_endpoing_calls_file();
    }, 1000);
    
    
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