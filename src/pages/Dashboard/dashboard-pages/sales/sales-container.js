import { useEffect } from 'react';
import PageRestricted from '../../../../components/page-restricted';
import CONSTANTS from '../../../../constants/Constants';
import { toggle_show_main_sections } from '../../../../helpers/helper-functions';

let SalesContainer = (props) => {
            
    const {
        userDetails,
    } = props;

    useEffect(()=>{
        let sales_chart_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let sales_chart_values = [2233, 2241, 543, 1564, 2300, 0, 0, 0, 0, 0, 0, 0];
        render_agent_sales_stats_chart(sales_chart_labels, sales_chart_values);
    });

    const render_agent_sales_stats_chart = (labels, values) => {
        const ctx = document.getElementById('salesStatsChart');
        new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                {
                    label: 'Sales ($)',
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
    
    const _pageConstant=CONSTANTS.app_page_constants.sales;
    const has_access_this_page=(userDetails?.pages_can_access_constants?.includes(_pageConstant));

    return(
         <section id="sales-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <div>
                    <div style={{padding: 10}}>
                        <div>
                            <p style={{fontSize: 13, marginBottom: 10, color: "orange"}}>
                                Current Total Sales:</p>
                            <h1 style={{color: "skyblue"}}>
                                $3,000.23
                                <span style={{fontWeight: "initial", color: "lightgreen", fontSize: 13, marginLeft: 25, textDecoration: "underline", cursor: "pointer"}}>
                                    <i style={{marginRight: 10, color: "rgba(255, 255, 255, 0.5)"}}
                                        className="fa-solid fa-money-check-dollar"></i>
                                    Business Bank Settings
                                </span>
                            </h1>
                        </div>
                        <div style={{padding: 10, marginTop: 20, display: "flex"}}>
                            <div style={{marginRight: 10}}>
                                <p className="regular-font-color-dark-bg" 
                                    style={{fontSize: 13, marginBottom: 5}}>
                                        Product Type</p>
                                <select style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                                    <option style={{color: "black"}}>
                                        All
                                    </option>
                                    <option style={{color: "black"}}>
                                        Flights
                                    </option>
                                </select>
                            </div>
                            <div style={{marginRight: 10}}>
                                <p className="regular-font-color-dark-bg" 
                                    style={{fontSize: 13, marginBottom: 5}}>
                                        Sale Type</p>
                                <select style={{padding: "10px 20px", borderRadius:  50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}>
                                    <option style={{color: "black"}}>
                                        Booking Links
                                    </option>
                                    <option style={{color: "black"}}>
                                        Customer Own Search
                                    </option>
                                </select>
                            </div>
                            <div style={{marginRight: 10}}>
                                <div style={{display: "flex"}}>
                                    <p className="regular-font-color-dark-bg" 
                                        style={{fontSize: 13, marginBottom: 5}}>
                                        Interval</p>
                                </div>
                                <input id="booking-attempts-pane-filter-by-dates-input" readOnly="true" 
                                    placeholder="select dates here..."
                                    style={{padding: "10px 20px", borderRadius: 50, color: "white", border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(255,255,255,0.1)"}}/>
                            </div>
                        </div>
                        <div style={{background: "white", minHeight: 300, padding: 10, display: "flex", justifyContent: "space-between"}}>
                            <div style={{width: "calc(40% - 4px)"}}>
                                <canvas id="salesStatsChart" ></canvas>
                                <div style={{marginTop: 10, padding: 10, backgroundColor: "rgb(0, 37, 63)", borderTop: "1px solid rgba(0,0,0,0.1)"}}>
                                    <div>
                                        <p style={{color: "orange", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "lightgreen"}}
                                                className='fa-solid fa-info-circle'></i>
                                            Total for March 23, 2024 - March 24, 2025
                                        </p>
                                        <h3 style={{color: "skyblue", margin: 10}}>
                                            $6,000.00 
                                        </h3>
                                    </div>
                                    <div style={{marginTop: 20}}>
                                        <p style={{cursor: "pointer", textDecoration: "underline", color: "lightgreen", fontSize: 13}}>
                                        <i className="fa-solid fa-tools" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>     
                                            Configure Payout Settings</p>
                                        <div style={{marginTop: 10}}>
                                            <div style={{marginBottom: 5, borderTop: "1px solid rgba(255,255,255,0.1)", padding: 10}}>
                                                <p className="subtitle-font-color-default" style={{fontSize: 13}}>
                                                    <i className="fa-solid fa-calendar-days" style={{marginRight: 10, color: "rgba(255,255,255,0.8)"}}></i>
                                                    Payout Frequency</p>
                                                <div>
                                                    <select
                                                        style={{fontSize: 14, color: "white", width: "calc(100% - 20px)", padding: 10, background: "none", border: "none"}}>
                                                            <option style={{color: "black"}} value="">Weekly</option>
                                                            <option style={{color: "black"}} value="male">Bi-Weekly</option>
                                                            <option style={{color: "black"}} value="female">Monthly</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "60%"}}>
                                <table className='app-standard-table white-bg'>
                                    <tr>
                                        <td>Type</td>
                                        <td style={{backgroundColor: "rgb(0, 46, 106)"}}>Timestamp</td>
                                        <td>Data Provider</td>
                                        <td>Total</td>
                                        <td>Profit</td>
                                        <td>Email</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flight
                                        </td>
                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                            2025-05-02T02:43:12.636Z
                                        </td>
                                        <td>
                                            Duffel
                                        </td>
                                        <td>
                                            $341.22
                                        </td>
                                        <td>
                                            $43.23
                                        </td>
                                        <td>
                                            m.adinan@yahoo.com
                                        </td>
                                    </tr>
                                </table>
                                <div className='app-standard-paginator theme-blend-bg-dark' style={{marginTop: 5}}>
                                    <div className='prev-next-btn'>
                                        <i className='fa-solid fa-angle-left'></i></div>
                                    <div>1</div>
                                    <div className='prev-next-btn'>
                                        <i className='fa-solid fa-angle-right'></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default SalesContainer;