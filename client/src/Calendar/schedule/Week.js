import React, {Component} from 'react';
import moment from 'moment';
import isEqual from 'lodash';

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

import Day from './Day';
import EventBox from "./EventBox";

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

  formatTimeline() {
    const timeline = [];
    for (let i=0; i < 24; i++) {
      const hour = moment().hour(i).minute(0).format("HH:mm");
      const startRow = i * (60/5) + 1;
      const endRow = startRow + (60/5);
      const style = {
        gridColumn: 1,
        gridRowStart: startRow,
        gridRowEnd: endRow
      };
      timeline.push(<div style={style}>{hour}</div>)
    }
    return timeline;
  }

  formatData(days, events) {
    const offset = 2;
    const eventLists = [];
    const data = {
      days: [],
      events: []
    };
    for(let i=0; i < this.state.days.length; i++) {
      const day = this.state.days[i];
      const dayEvents = this.state.events[i];

      for(let j=0; j < dayEvents.length; j++) {
        const event = dayEvents[j];
        const start = moment(event.start);
        const end = moment(event.end);

        let startRow = Math.ceil(((start.hour() * 60) + start.minute()) / 5);
        let endRow = Math.floor(((end.hour() * 60) + end.minute()) / 5);
        if (endRow === 0) {
          endRow = 288;
        }
        const eventIndex = i + (startRow * this.state.days.length);
        if (eventLists[eventIndex] == null) {
          eventLists[eventIndex] = [];
        }
        eventLists[eventIndex].push({
          event: event,
          col: i,
          startRow: startRow,
          endRow: endRow
        });
      }
      data.days.push(<Day day={day} column={i} offset={offset} row={1}></Day>);
    }

    for (let eventList of eventLists) {
      if (eventList) {
        //eventList.sort((a, b) => {return a.start.isBefore(b.start)});
        data.events.push(<EventBox events={eventList} offset={offset} selectedEvents={this.props.selectedEvents} onEventsChange={this.props.onEventsChange}></EventBox>);
      }

    }
    return data;
  }

  render() {
    const date = moment(this.state.date);
    const weekOfYear = date.format("ww");
    const displayDate = date.format("DD/MM/YYYY");

    const timeline = this.formatTimeline();

    const formattedData = this.formatData(this.state.days, this.state.events);
    const timetableStyle = {
      display: 'inline-grid',
      gridTemplateColumns: '0.3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      justifyContent: 'space-evenly',
      gridGap: '10px',
      //backgroundColor: '#2196F3',
      padding: '10px',
    };
    return (
      <div >
        <Typography>Selected: {this.props.selectedStation.name} Week: {weekOfYear}</Typography>
        <div className="timetable" style={timetableStyle}>
          {timeline}
          {formattedData.days}
          {formattedData.events}
        </div>
      </div>
    );
  }
}

export default Week;
