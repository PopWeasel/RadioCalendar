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
    moment.locale('en-GB');
    this.WEEK = "week";
    this.SELECTED_EVENTS = "selected";
    const lastWeekDate = moment().startOf('isoWeek').toDate();
    this.state = {
      stations: this.props.stations,
      selectedStation: this.props.stations[0],
      selectedDate: lastWeekDate,
      selectedEvents: {},
      viewData: this.WEEK
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

  onEventChange = (event) => {
    //using second form of setstate in order to access state
    this.setState((prevState, props) => {
      const selectedEvents = {...prevState.selectedEvents};
      if (event.pid in selectedEvents) {
        delete selectedEvents[event.pid];
      } else {
        selectedEvents[event.pid] = event;
      }
      return ({'selectedEvents': selectedEvents});
    });
  }

  onListEventsClick = (e) => {
    for (const pid of Object.keys(this.state.selectedEvents)) {
      console.log(pid);
    }
    this.setState({
      viewData: this.SELECTED_EVENTS
    });
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
          onEventChange={this.onEventChange} />
      </div>
    );
  }
}

export default Calendar;
