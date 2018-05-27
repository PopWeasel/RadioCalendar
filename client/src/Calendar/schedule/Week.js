import React, {Component} from 'react';
import moment from 'moment';
import isEqual from 'lodash';

class Week extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB');
    const config = require('Config');

    const date = this.props.selectedDate;
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
    const currentDate = moment(this.state.date);
    const prevDate = moment(prevState.date);
    console.log(`componentDidUpdate ${prevDate} == ${currentDate} => ${currentDate.isSame(prevDate)}`);
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
    const prevDate = moment(prevState.date);
    console.log(`getDerivedStateFromProps ${nextDate} == ${prevDate} => ${nextDate.isSame(prevDate)}`);
    if (!nextDate.isSame(prevDate)
          || nextProps.selectedStation.key != prevState.station.key) {
      return {
        date: nextProps.selectedDate,
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
        this.setState({events: data});
      });
  }

  generateURL() {
    const date = moment(this.state.date);
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
    const  events = this.state.events;
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
        <div>
          Event: {events.days}
        </div>

      </div>
    );
  }
}

export default Week;
