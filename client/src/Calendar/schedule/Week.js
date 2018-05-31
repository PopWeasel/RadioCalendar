import React, {Component} from 'react';
import moment from 'moment';
import isEqual from 'lodash';

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

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
    const displayDate = date.format("DD/MM/YYYY");

    const days = [];
    for(let i=0; i < this.state.days.length; i++) {
      const day = this.state.days[i];
      const events = this.state.events[i];
      days.push(<Day day={day} events={events} column={i}></Day>);
    }

    return (
      <div>
        <Typography>Selected: {this.props.selectedStation.name} {displayDate} Week: {weekOfYear}</Typography>
        <ol style={
            display: grid,

          }>
          {days}
        </ol>
      </div>
    );
  }
}

export default Week;
