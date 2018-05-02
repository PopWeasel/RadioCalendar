import React, {Component} from 'react';
import moment from 'moment';

class Week extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB');
    this.state =  {
      config: require('Config'),
      events: [],
      days: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Change" + event);
    this.props.onEventsChange(event.target.value);
  }

  componentDidMount() {
    const date = moment(this.props.selectedDate);
    const weekOfYear = date.format("ww");
    const year = date.format("YYYY");
    const selectedStation = this.props.selectedStation;
    const server = this.state.config.client.proxy;
    const port = this.state.config.server.port;
    const url = `http://${server}:${port}/station/${selectedStation.key}/year/${year}/week/${weekOfYear}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({events: data.events}));
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
