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

import {
    render_stats_totals_summery_values
} from "../../../../../helpers/markup-rendering";

const HpAnalytics = (props) => {
    
    useEffect(() => {
        (async()=>{
            let totals_summery = await fetchStatsTotalsSummary();
            let totals_summery_headers = return_headers_as_array_from_object(totals_summery);
            let totals_summery_values = return_values_as_array_from_obj(totals_summery);
            render_total_summaries_chart(
                totals_summery_headers, 
                totals_summery_values
            );
            document.getElementById("hp_stats_totals_summary_values_table").innerHTML = render_stats_totals_summery_values(
                totals_summery_headers, totals_summery_values
            );
        })();
    });

    const render_total_summaries_chart = (labels, values) => {
        const ctx = document.getElementById('totalsChart');
        new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Summaries',
                    data: values,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return <div className="main-seaction-containers" >
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "calc(50% - 20px)"}}>
                    <canvas id="totalsChart"></canvas>
                </div>
                <div style={{width: "50%"}}>
                    <p style={{marginBottom: 10, color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center"}}>
                        Total Summaries</p>
                    <table id="hp_stats_totals_summary_values_table" className="hp_default_analytics_value_table">
                        {/**Data values here */}
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default HpAnalytics;