import { useEffect, useState } from 'react';
import PageRestricted from '../../../../components/page-restricted';
import CONSTANTS from '../../../../constants/Constants';
import { 
    toggle_show_main_sections,
    add_commas_to_number,
    get_three_letter_month_from_num
} from '../../../../helpers/helper-functions';
import { 
    fetchAllSales,
    fetchGroupedSalesByMonth 
} from '../../../../services/salesServices';

let SalesContainer = (props) => {
            
    const {
        userDetails,
    } = props;

    const PAGI_LIMIT = 10;

    const [ isLoading, setIsLoading ] = useState(false);
    const [ selectedSale, setSelectedSale ] = useState({});
    const [ overrallTotalSale, setOverrallTotalSale ] = useState(0);
    const [ salesIntervalMonths, setSalesIntervalMonths ] = useState(["", ""]); // have atleast two items
    const [ salesList, setsalesList ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [ pagiCurrentPage, setpagiCurrentPage ] = useState(1);
    const [ filters, setFilters ] = useState({
        interval: "",
        sale_type: "",
        product_type: "",
    });
    const [salesChartLabels, setSalesChartLabels] = useState([]);
    const [ salesChartValues, setSalesChartValues ] = useState([]);

    useEffect(()=>{
        if(totalItems){
            const _list_only=true;
            loadPageData(_list_only);
        }
    }, [pagiCurrentPage]);

    useEffect(()=>{
        if(totalItems){
            loadPageData();
        }
    }, [filters]);

    const loadPageData = async (isListOnly=false) => {
        setIsLoading(true);
        let __all_sales= await fetchAllSales(userDetails?._id, filters, setTotalItems, pagiCurrentPage, PAGI_LIMIT);
        console.log(__all_sales);
        setsalesList(__all_sales);
        if(!isListOnly){
            let __res = await fetchGroupedSalesByMonth(userDetails?._id, filters);
            let sales_chart_labels = __res.map(each=>{
                let _dp = (each?._id?.split("-"));
                return `${get_three_letter_month_from_num((parseInt(_dp[1])-1))}, ${_dp[0]}`;
            });
            setSalesChartLabels(sales_chart_labels);
            let sales_chart_values = __res.map(each=>{
                let total = 0;
                for (let bb of each?.documents){
                    total += (bb?.payment_intent.amount/100);
                }
                return total;
            });
            setSalesChartValues(sales_chart_values);
            const salesSum = sales_chart_values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            setOverrallTotalSale(salesSum);
            setSalesIntervalMonths(sales_chart_labels);
            setTimeout(()=>{
                // First Time Rendering
                render_agent_sales_stats_chart(sales_chart_labels, sales_chart_values);
            }, 200);
        }else{
            setTimeout(()=>{
                // Render Using State Data
                render_agent_sales_stats_chart(salesChartLabels, salesChartValues);
            }, 200);
        }
        setIsLoading(false);
        
        
    }
    window.__loadSalesPageData = loadPageData;

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

    const all_pages = [];
    let i=1;
    while(true){
        all_pages.push(i);
        if(i>=totalItems){
            break
        }
        i+=PAGI_LIMIT;
    }

    return(
         <section id="sales-container" style={{display: "none"}}>
            {
                !has_access_this_page ?
                <PageRestricted /> :
                <div>
                    <div style={{padding: 10}}>
                        <div>
                            <p style={{fontSize: 13, marginBottom: 10, color: "rgba(255,255,255,0.7)"}}>
                                Total sales from <span style={{color: "orange"}}>
                                    {salesIntervalMonths[(salesIntervalMonths.length-1)]} </span>
                                    to <span style={{color: "orange"}}>
                                        {salesIntervalMonths[0]}</span>
                                </p>
                            <h1 style={{color: "skyblue"}}>
                                ${add_commas_to_number(overrallTotalSale.toFixed(2))}
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
                                {
                                    isLoading ? <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                                        fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                                        <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                                        Loading.. Please Wait
                                    </div> :
                                    <canvas id="salesStatsChart" ></canvas>
                                }
                                <div style={{marginTop: 10, padding: 10, backgroundColor: "rgb(0, 37, 63)", borderTop: "1px solid rgba(0,0,0,0.1)"}}>
                                    <div>
                                        <p style={{color: "orange", fontSize: 13}}>
                                            <i style={{marginRight: 10, color: "lightgreen"}}
                                                className='fa-solid fa-info-circle'></i>
                                            {salesIntervalMonths[(salesIntervalMonths.length-1)]} - {salesIntervalMonths[0]}
                                        </p>
                                        <h3 style={{color: "skyblue", margin: 10}}>
                                            ${add_commas_to_number(overrallTotalSale.toFixed(2))}
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
                                {
                                    selectedSale?._id ?
                                    <div>
                                        <p>Selected Sale</p>
                                        <div>
                                            <div onClick={()=>setSelectedSale({})}
                                                style={{padding: 20, color: "green", textDecoration: "underline", cursor: "pointer", fontSize: 13}} >
                                                <i style={{color: "red", marginRight: 10}} className="fa fa-angle-left"></i>
                                                Sales List
                                            </div>
                                        </div>
                                        <div>
                                            <pre>{
                                                JSON.stringify(selectedSale, null, 2)
                                            }</pre>
                                        </div>
                                    </div> :
                                    isLoading ? 
                                    <div style={{backgroundColor: "green", padding: 20, textAlign: "center",
                                        fontSize: 12, color: "lightgreen", margin: 10, marginBottom: 20, cursor: "pointer"}}>
                                        <i style={{marginRight: 10, color: "yellow"}} className="fa fa-spinner"></i>
                                        Loading.. Please Wait
                                    </div> :
                                    <>
                                        <table className='app-standard-table white-bg' style={{borderSpacing: 0}}>
                                            <tr>
                                                <td style={{backgroundColor: "rgb(0, 44, 69)"}}>
                                                    Type</td>
                                                <td style={{backgroundColor: "rgb(0, 46, 106)"}}>
                                                    Timestamp</td>
                                                <td style={{backgroundColor: "rgb(0, 46, 106)"}}>
                                                    Email</td>
                                                <td>Price</td>
                                                <td>Paid</td>
                                                <td>Profit</td>
                                            </tr>
                                            {
                                                (salesList?.length > 0) ?
                                                salesList?.map(each=>{
                                                    let total_paid = (each?.payment_intent.amount/100);
                                                    let price = parseFloat(each?.booking_order.data.payments[0].amount);
                                                    let profit = (total_paid - price);
                                                    let email = each?.booking_order.data.passengers[0].email;
                                                    let is_flight = (each?.booking_order?.data?.passengers ? true : false);
                                                    let utc = new Date(each?.createdAt);
                                                    let offset = utc.getTimezoneOffset();
                                                    let local = new Date(utc.getTime() + offset * 60000);
                                                    return <tr onClick={()=>setSelectedSale(each)} style={{cursor: "pointer"}}>
                                                        <td className="tool-tip-parent" style={{color: "white", border: "none", textAlign: "center"}}>
                                                            {
                                                                is_flight && 
                                                                <i style={{fontSize: 12, color: "rgb(158, 158, 158)"}} 
                                                                    className="fa-solid fa-plane-departure"></i>
                                                            }
                                                            <span style={{top: "calc(100% - 5px)", color: "black", fontSize: 12}} className='tool-tip'>
                                                                {is_flight && "Flight Booking"}
                                                            </span>
                                                        </td>
                                                        <td className="tool-tip-parent"
                                                            style={{backgroundColor: "rgba(0, 0, 0, 0.09)", fontSize: 12}}>
                                                            {local.toString().substring(0, 25)}
                                                            <span style={{top: "calc(100% - 5px)"}} className='tool-tip'>
                                                                {local.toString()}
                                                            </span>
                                                        </td>
                                                        <td style={{backgroundColor: "rgba(0, 0, 0, 0.09)"}}>
                                                            {email}
                                                        </td>
                                                        <td>
                                                            ${add_commas_to_number(price.toFixed(2))}
                                                        </td>
                                                        <td>
                                                            ${add_commas_to_number(total_paid.toFixed(2))}
                                                        </td>
                                                        <td>
                                                            ${add_commas_to_number(profit.toFixed(2))}
                                                        </td>
                                                    </tr>
                                                }) : <></>
                                            }
                                        </table>
                                        {
                                            totalItems > PAGI_LIMIT &&
                                            <>
                                                <select onInput={e=>setpagiCurrentPage(e.target.value)}
                                                    value={pagiCurrentPage}
                                                    className="select-input-paginator"
                                                    style={{backgroundColor: "rgb(0, 69, 109)"}}
                                                >
                                                    {
                                                        all_pages?.map((each, i)=>{
                                                            return <option style={{color: "black"}}
                                                                value={each}
                                                            >{each} - {(each+PAGI_LIMIT-1)}</option>
                                                                
                                                        })  
                                                    }
                                                </select>
                                                <span style={{color: "rgb(82, 82, 82)", marginLeft: 10, fontSize: 12}}>
                                                    <span style={{margin: 10, color: "rgb(179, 178, 178)", fontSize: 15}}>-</span>
                                                    Total: 
                                                    <span style={{color: "rgb(0, 109, 182)", margin: 5, fontWeight: "bolder"}}>
                                                        {totalItems}</span> 
                                                    item(s)
                                                    <span style={{margin: 10, color: "rgb(179, 178, 178)", fontSize: 15}}>-</span>
                                                </span>
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default SalesContainer;