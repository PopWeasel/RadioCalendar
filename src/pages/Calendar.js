import React, {Component} from "react";
import ReactDOM from "react-dom";
import Week from "../components/calendar/Week";
import StationList from "../components/station/StationList";
import DateSelector from "../components/calendar/DateSelector";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: this.props.stations,
      selectedStation: this.props.stations[0]
    };
  }
  render() {
    return(
      <div>
        <StationList stations={this.state.stations} />
        <DateSelector />
        <Week selectedStation={this.state.selectedStation} />
      </div>
    );
  }
}

export default Calendar;
