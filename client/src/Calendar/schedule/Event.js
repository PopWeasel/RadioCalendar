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
    const offset = 2;
    let startRow = Math.ceil(((start.hour() * 60) + start.minute()) / 5);
    let endRow = Math.floor(((end.hour() * 60) + end.minute()) / 5);
    if (endRow === 0) {
      endRow = 288;
    }

    console.log(`${event.title} Times: ${start.format("HH:mm")} - ${end.format("HH:mm")} => ${startRow} - ${endRow}`);

    const style = {
      gridColumn: this.props.column,
      gridRowStart: startRow + offset,
      gridRowEnd: endRow + 1
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
