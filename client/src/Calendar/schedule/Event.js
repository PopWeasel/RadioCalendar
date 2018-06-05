import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

class Event extends Component {
  render() {
    let column;
    let startRow;
    let endRow = 0;
    const events = [];
    const offset = this.props.offset;
    for (const eventData of this.props.events) {
      column = eventData.col;
      startRow = eventData.startRow;
      if (eventData.endRow > endRow){
        endRow = eventData.endRow;
      }

      const event = eventData.event;
      const start = moment(event.start);
      const end = moment(event.end);

      events.push(
        <div>
          <Typography>{event.title}</Typography>
          <Typography>{event.subTitle}</Typography>
          <Typography>{event.synopsis}</Typography>
          <Typography>{start.format("HH:mm")}</Typography>
          <Typography>{end.format("HH:mm")}</Typography>
          <Typography>{event.pid}</Typography>
        </div>
      );


    }

    //console.log(`${event.title} Times: ${start.format("HH:mm")} - ${end.format("HH:mm")} => ${startRow} - ${endRow}`);
    const style = {
      gridColumn: column + offset,
      gridRowStart: startRow + offset,
      gridRowEnd: endRow + 1
    };

    return(
      <div style={style}>
        {events}
      </div>
    );
  }
}

export default Event;
