import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

class Event extends Component {
  render() {
    const event = this.props.event;
    const start = moment(event.start);
    const end = moment(event.end);
    const startMinute = (start.hour() * 60) + start.minute() + 2;
    let endMinute = (end.hour() * 60) + end.minute() + 2;
    if (endMinute === 2) {
      endMinute = 1440;
    }
    console.log(`Start ${event.title} ${this.props.column} ${startMinute} - ${endMinute}`);

    const style = {
      gridColumn: this.props.column,
      gridRowStart: startMinute,
      gridRowEnd: endMinute
    };

    return(
      <div style={style}>
        <Typography>{event.title}</Typography>
        <Typography>{event.subTitle}</Typography>
        <Typography>{event.synopsis}</Typography>
        <Typography>{start.format("HH:mm")}</Typography>
        <Typography>{end.format("HH:mm")}</Typography>
        <Typography>{event.pid}</Typography>
      </div>
    );
  }
}

export default Event;
