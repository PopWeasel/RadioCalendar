import React, {Component} from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';
import Button from '@material-ui/core/Button';

import Week from "./schedule/Week";
import StationList from "./station/StationList";
import DateSelector from "./date/DateSelector";

class Calendar extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB')
    const lastWeekDate = moment().startOf('isoWeek').toDate();
    this.state = {
      stations: this.props.stations,
      selectedStation: this.props.stations[0],
      selectedDate: lastWeekDate,
      selectedEvents: {}
    };
  }

  onDateChange = (selectedDate) => {
    this.setState({selectedDate: selectedDate});
  }

  onStationChange = (selectedStationId) => {
    const stations = this.state.stations;
    const selectedStation = stations[stations.findIndex(station => station.id === selectedStationId)];
    this.setState({selectedStation: selectedStation});
  }

  onEventsChange = (events) => {
    this.setState({selectedEvents: events});
  }

  onListEventsClick = (e) => {
    for (const event of Object.keys(this.state.selectedEvents)) {
      console.log(event);
    }
  }

  render() {
    return(
      <div>
        <Typography variant="title">
          Schedule
        </Typography>
        <StationList
          stations={this.state.stations}
          selectedStation={this.state.selectedStation}
          onStationChange={this.onStationChange} />
        <DateSelector
          selectedDate={this.state.selectedDate}
          onDateChange={this.onDateChange} />
        <Button variant="raised" color="primary" onClick={this.onListEventsClick}>
          Save selection
        </Button>
        <Week
          selectedStation={this.state.selectedStation}
          selectedDate={this.state.selectedDate}
          selectedEvents={this.state.selectedEvents}
          onEventsChange={this.onEventsChange} />
      </div>
    );
  }
}

export default Calendar;
