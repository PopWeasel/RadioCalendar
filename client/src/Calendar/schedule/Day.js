import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

import Event from "./Event";

class Day extends Component {
  render() {
    const date = moment(this.props.day);
    const displayDate = date.format("ddd DD/MM/YYYY");
    const events = []
    for (let e of this.props.events) {
      events.push(<Event event={e}></Event>);
    }
    return(
      <li>
        <Typography>{displayDate}</Typography>
        <ul>
          {events}
        </ul>
      </li>
    );
  }
}

export default Day;
