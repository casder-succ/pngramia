import React from 'react';
import './currently.css'
import * as Api from 'typescript-fetch-api'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';


const api = new Api.DefaultApi()

class WeeklyScheduler extends React.Component {

    constructor(props) {
        super(props);
        const dateParam =  this.props.match?.params.id || moment().format('YYYY-MM-DD');
        const parsedDate = moment(dateParam, "YYYY-MM-DD")

        const nearestWeekend = parsedDate.startOf('week').isoWeekday(0);
        const endDate = moment(nearestWeekend).add(6, 'day');
        
        console.log("Enddate", nearestWeekend.toString(),  endDate.toString())

        const startWeek = nearestWeekend.format("YYYY-MM-DD")
        const endWeek = endDate.format("YYYY-MM-DD")
        
 

        // TODO reuse data to service from https://citydog.by/post/play-musykanty/
        this.state = { 
            events: [
                {id:'xyz1', date: "2021-04-21", band: "balala", time: "19:00", place:"IndPub"},
                {id:'xyz2', date: "2021-04-29", band: "libni", time: "19:00", place:"Pinta"}
            ],
            start: startWeek,
            end:  endWeek

        };

        console.log(this.state.start, this.state.end)
        this.handleReload = this.handleReload.bind(this);
        this.handleReload();
    }


    async handleReload(event) {
        //const response = await api.events({ date: '2021-03-25'/*this.state.targetDate*/ });
        //this.setState({ start: "2021-04-01" });
    }


    render() {
        return <div>
            {/*<button onClick={this.handleReload}>Reload</button>*/}
            <section>
            <h2>Weekly highlights</h2>
            <h3>Upcoming events from  <Moment format="YYYY/MM/DD">{this.state.start}</Moment> to <Moment format="YYYY/MM/DD">{this.state.end}</Moment> </h3>
            <ul>
               {this.state.events.map(
                   (event) => 
                        <li key={event.id}><Link to ={`/timetable/${event.date}`}>{event.date}</Link>: Band "{event.band}" gives concert today {event.time} at {event.place}.</li>)}
            </ul>
            </section>
        </div>
    }
}

export default withRouter(WeeklyScheduler);