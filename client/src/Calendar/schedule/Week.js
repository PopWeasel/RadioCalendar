import React, {Component} from 'react';
import moment from 'moment';
import isEqual from 'lodash';

import Day from './Day';

class Week extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB');
    const config = require('Config');

    const date = moment(this.props.selectedDate).startOf('isoWeek');
    const station = this.props.selectedStation;

    this.state =  {
      config: config,
      events: [],
      days: [],
      date: date,
      station: station
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentDate = this.state.date;
    const prevDate = prevState.date;
    if (!prevDate.isSame(currentDate)
        || this.state.station.key != prevState.station.key) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    if (this._controller) {
      this._controller.abort();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextDate = moment(nextProps.selectedDate);
    const prevDate = prevState.date;
    if (!nextDate.isSame(prevDate)
          || nextProps.selectedStation.key != prevState.station.key) {
      return {
        date: nextDate.startOf('isoWeek'),
        station: nextProps.selectedStation
      }
    }
    return null;
  }

  fetchData() {
    this._controller = new AbortController()
    const signal = this._controller.signal
    const url = this.generateURL();
    fetch(url, {method: 'get', signal})
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          days: data.days,
          events: data.events
        });
      });
  }

  generateURL() {
    const date = this.state.date;
    const station = this.state.station;

    const year = date.format("YYYY");
    const weekOfYear = date.format("ww");
    const server = this.state.config.client.proxy;
    const port = this.state.config.server.port;
    //const url = `http://${server}:${port}/station/${station.key}/year/${year}/week/${weekOfYear}`;
    const url = `http://${server}:${port}/station/${station.key}/year/${year}/week/${weekOfYear}`;
    return url;
  }

  render() {
    const date = moment(this.state.date);
    const weekOfYear = date.format("ww");
    const year = date.format("YYYY");
    const displayDate = date.format("DD/MM/YY");

    const days = [];
    for(let i=0; i < this.state.days.length; i++) {
      const day = this.state.days[i];
      const events = this.state.events[i];
      days.push(<Day day={day} events={events}></Day>);
    }
    return (
      <div>
        <div>
          Station : {this.props.selectedStation.name}
        </div>
        <div>
          Date : {displayDate}
        </div>
        <div>
          Year : {year}
        </div>
        <div>
          Week of year : {weekOfYear}
        </div>
        <ol>
          {days}
        </ol>

      </div>
    );
  }
}

export default Week;
