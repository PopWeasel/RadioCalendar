import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

class Day extends Component {
  render() {
    const date = moment(this.props.day);
    const displayDate = date.format("DD/MM/YY");

    return(<li>{displayDate}</li>);
  }
}

export default Day;
