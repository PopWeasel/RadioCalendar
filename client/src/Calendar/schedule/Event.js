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

    return(
      <li>
        <Typography>{event.title}</Typography>
        <Typography>{event.pid}</Typography>
      </li>
    );
  }
}

export default Event;
