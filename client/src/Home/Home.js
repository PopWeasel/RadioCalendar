import React, {Component} from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Calendar from "../Calendar/Calendar";
import EventList from "../SelectedEvents/EventList";

class Homepage extends Component {
constructor(props) {
  super(props);

  this.SELECTED_EVENTS = "selected";

  this.state = {
    selectedEvents: {},
    showCalendar: true
  }
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
    showCalendar: false
  });
}

onCalendarClick = (e) => {
  this.setState({
    showCalendar: true
  });
}

render() {
    let mainElement;

    if (this.state.showCalendar) {
      return <Calendar
        stations={this.props.config.stations}
        selectedEvents={this.state.selectedEvents}
        onEventChange={this.onEventChange}
        onListEventsClick={this.onListEventsClick} />
    } else {
      return <EventList
        selectedEvents={this.state.selectedEvents}
        onEventChange={this.onEventChange}
        onCalendarClick={this.onCalendarClick} />
    }
  }
}

export default Homepage;
