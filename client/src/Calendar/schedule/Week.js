import React, {Component} from 'react';
import moment from 'moment';

class Week extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB');
    const config = require('Config');

    const date = moment(this.props.selectedDate);
    const year = date.format("YYYY");
    const weekOfYear = date.format("ww");
    const displayDate = date.format("DD/MM/YY");
    const selectedStation = this.props.selectedStation;

    //const server = this.state.config.client.proxy;
    //const port = this.state.config.server.port;
    const server = config.client.proxy;
    const port = config.server.port;
    const url = `http://${server}:${port}/station/${selectedStation.key}/year/${year}/week/${weekOfYear}`;

    this.state =  {
      config: config,
      events: [],
      days: [],
      date: date,
      year: year,
      weekOfYear: weekOfYear,
      displayDate: displayDate,
      selectedStation: selectedStation,
      url: url
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Change" + event);
    this.props.onEventsChange(event.target.value);
  }

  componentDidMount() {
    fetch(this.state.url)
      .then(response => response.json())
      .then(data => this.setState({events: data.events}));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    console.log(prevState);
  }
  render() {
    const date = moment(this.props.selectedDate);
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
          Events : {this.props.selectedEvents}
        </div>
        <div>
          All Events : {this.state.events}
        </div>

      </div>
    );
  }
}

export default Week;
