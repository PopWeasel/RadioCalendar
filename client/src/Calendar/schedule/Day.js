import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

class Day extends Component {
  render() {
    const date = moment(this.props.day);
    const displayDate = date.format("ddd DD/MM/YYYY");
    const style = {
      gridColumn: this.props.column + this.props.offset,
      gridRow: this.props.row
    };
    return(
      <div style={style}>
        <Typography>{displayDate}</Typography>
      </div>
    );
  }
}

export default Day;
