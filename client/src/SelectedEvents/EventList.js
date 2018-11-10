import React, {Component} from "react";
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';
import Button from '@material-ui/core/Button';

import EventCard from "./EventCard";

class EventList extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const events = [];
    for (const pid in this.props.selectedEvents) {
      events.push(
        <EventCard
          event={this.props.selectedEvents[pid]}
          onEventChange={this.props.onEventChange}
          selectedEvents={this.props.selectedEvents}/>
      );
    }

    return (
      <div>
        <Typography variant="title">Selected Events</Typography>
        <Button variant="raised" color="primary" onClick={this.props.onCalendarClick}>
          To Calendar
        </Button>
        <Button variant="raised" color="primary" onClick={this.onDownloadClick}>
          Download
        </Button>
        {events}
      </div>
    );
  }
}

export default EventList;
