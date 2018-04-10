import React, {Component} from "react";
import ReactDOM from "react-dom";
import Week from "../components/calendar/Week";
import StationList from "../components/station/StationList";
import DateSelector from "../components/calendar/DateSelector";
import moment from "moment";

class Calendar extends Component {
  constructor(props) {
    super(props);
    moment.locale('en-GB')
    const lastWeekDate = moment(moment().subtract(7, "days")).toDate();
    this.state = {
      stations: this.props.stations,
      selectedStation: this.props.stations[0],
      selectedDate: lastWeekDate,
      selectedEvents: []
    };

    this.onStationChange = this.onStationChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onEventsChange = this.onEventsChange.bind(this);
  }

  onDateChange(selectedDate) {
    this.setState({selectedDate: selectedDate});
  }

  onStationChange(selectedStationId) {
    const stations = this.state.stations;
    const selectedStation = stations[stations.findIndex(station => station.id === selectedStationId)];
    this.setState({selectedStation: selectedStation});
  }

  onEventsChange(events) {
    this.setState({selectedEvents: events});
  }

  render() {
    return(
      <div>
        <StationList
          stations={this.state.stations}
          selectedStation={this.state.selectedStation}
          onStationChange={this.onStationChange} />
        <DateSelector
          selectedDate={this.state.selectedDate}
          onDateChange={this.onDateChange} />
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
