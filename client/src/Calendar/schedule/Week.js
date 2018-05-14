import React, {Component} from 'react';
import moment from 'moment';
import isEqual from 'lodash';

class Week extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB');
    const config = require('Config');

    const date = moment(this.props.selectedDate);
    const station = this.props.selectedStation;
    const selectedEvents = this.props.selectedEvents;

    this.state =  {
      config: config,
      events: [],
      days: [],
      selectedEvents: selectedEvents,
      date: date,
      station: station
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Change" + event);
    this.props.onEventsChange(event.target.value);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchData();
  }

  componentWillUnmount() {
    if (this._controller) {
      this._controller.abort();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextDate = moment(nextProps.selectedDate);
    if (!isEqual(nextDate, prevState.date)
          || nextProps.selectedStation != prevState.station) {
      return {
        date: nextDate,
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
      .then(response => response.json())
      .then(data => this.setState({events: data.events}));
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
    const date = moment(this.state.selectedDate);
    const weekOfYear = date.format("ww");
    const year = date.format("YYYY");
    const displayDate = date.format("DD/MM/YY");
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
          Events : {this.state.selectedEvents}
        </div>
        <div>
          All Events : {this.state.events}
        </div>

      </div>
    );
  }
}

export default Week;
