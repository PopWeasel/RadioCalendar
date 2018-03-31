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

    this.onStationChange = this.onStationChange.bind(this);
  }

  onStationChange(selectedStationId) {
    const stations = this.state.stations;
    const selectedStation = stations[stations.findIndex(station => station.id === selectedStationId)];
    this.setState(
      {
        selectedStation: selectedStation
      }
    );
  }

  render() {
    return(
      <div>
        <StationList
          stations={this.state.stations}
          selectedStation={this.state.selectedStation}
          onStationChange={this.onStationChange}/>
        <DateSelector />
        <Week selectedStation={this.state.selectedStation} />
      </div>
    );
  }
}

export default Calendar;
