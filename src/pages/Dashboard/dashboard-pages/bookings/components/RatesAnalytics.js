import {
    useEffect,
    useState
} from "react";

import { 
    return_headers_as_array_from_object,
    return_values_as_array_from_obj
 } from "../../../../../helpers/helper-functions";

import {
    fetchStatsTotalsSummary
} from "../../../../../services/analyticsServices";

/*import {
    render_price_rates_chart
} from "../../../../../helpers/markup-rendering";*/

const RatesAnalytics = (props) => {
    
    useEffect(() => {
        (async()=>{
            //let totals_summery = await fetchStatsTotalsSummary();
            let totals_summery_headers = ["one-way, economy", "round-trip, economy", "one-way, business", "round-trip, business", "one-way, first class", "round-trip, first class"];//return_headers_as_array_from_object(totals_summery);
            let totals_summery_values = [
                [240, 340, 740, 1240, 640, 1140], // Duffel
                [220, 420, 810, 1320, 610, 1120], // Amadeus
                [210, 530, 830, 930, 630, 930], // Travelport
                [230, 430, 890, 1230, 630, 1130], // Saber
            ];//return_values_as_array_from_obj(totals_summery);
            render_price_rates_chart(
                totals_summery_headers, 
                totals_summery_values
            );

            let agent_stats_headers = ["Links", "Bookings", "Link Visits", "Customer Searches"];
            let agent_stats_values = [112, 45, 135, 290];
            render_agent_stats_chart(
                agent_stats_headers,
                agent_stats_values
            )
        })();
    });

    const render_price_rates_chart = (labels, values) => {
        const ctx = document.getElementById('ratesChart');
        new window.Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                {
                    label: 'Duffel',
                    data: values[0],
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                },
                {
                    label: 'Amadeus',
                    data: values[1],
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                },
                {
                    label: 'Travelport',
                    data: values[2],
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                },
                {
                    label: 'Saber',
                    data: values[3],
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                }
            ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    /*title: {
                      display: true,
                      text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
                    }*/
                  }
            }
        });
    }

    const render_agent_stats_chart = (labels, values) => {
        const ctx = document.getElementById('agentStatsChart');
        new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                {
                    label: 'Activities',
                    data: values,
                    borderWidth: 1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                },
            ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    /*title: {
                      display: true,
                      text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
                    }*/
                  }
            }
        });
    }

    return <div className="main-seaction-containers" >
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 20px)"}}>
                    <p className="tool-tip-parent" style={{marginBottom: 10, color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                        <span style={{color: "slateblue", marginRight: 5}}>
                            1h ago.</span>
                        Current Rates (USD)
                        <span style={{fontSize: 12, marginLeft: 10, color: "orange"}}>
                            <i className="fa-solid fa-location-dot" style={{marginRight: 5}}></i>
                            JFK - LHR, 
                            <i className="fa-solid fa-person" style={{marginRight: 5, marginLeft: 5}}></i>
                            1 passenger.</span>
                        <span style={{color: "black"}} className="tool-tip">
                            New prices for flights from JFK to LHR for 1 adult passenger were last recieved 1 hour ago from the data providers. Prices may have changed or are still the same. However, this graph is to help you understand prices between the different distributors. 
                        </span>
                    </p>
                    <canvas id="ratesChart"></canvas>
                </div>
                <div style={{width: "50%"}}>
                    <p style={{marginBottom: 10, color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                        Bookine Engine</p>
                    <canvas id="agentStatsChart"></canvas>
                </div>
            </div>
        </div>
    </div>
}

export default RatesAnalytics;