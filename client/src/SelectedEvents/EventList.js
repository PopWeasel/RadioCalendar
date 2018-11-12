import React, {Component} from "react";
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';
import Button from '@material-ui/core/Button';

import EventCard from "./EventCard";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.pids = [];
  }

  onDownloadClick = (e) => {
    console.log('onDownloadClick');
  }

  onPidClick = (e) => {
    console.log('onPidClick');
    let output = "";
    for (const index in this.pids) {
      output += `${this.pids[index]}\n`;
    }
    const file = new Blob([output], {type: 'text/plain'});
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "pids.txt";
    element.click();
  }

  render() {
    const events = [];
    this.pids = [];
    for (const pid in this.props.selectedEvents) {
      this.pids.push(pid);
      events.push(
        <EventCard
          event={this.props.selectedEvents[pid]}
          onEventChange={this.props.onEventChange}
          selectedEvents={this.props.selectedEvents}/>
      );
    }

    const headingStyle = {
      'marginRight': '20px'
    };

    return (
      <div>
        <Typography variant="title" style={headingStyle}>Selected Events</Typography>
        <Button
          variant="raised"
          color="primary"
          onClick={this.props.onCalendarClick}
          style={headingStyle} >
          To Calendar
        </Button>
        <Button
          variant="raised"
          color="primary"
          onClick={this.onPidClick}
          style={headingStyle} >
          Download pids
        </Button>
        <Button
          variant="raised"
          color="primary"
          onClick={this.onDownloadClick}
          style={headingStyle} >
          Download
        </Button>
        {events}
      </div>
    );
  }
}

export default EventList;
