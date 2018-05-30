import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment from "moment";

class Day extends Component {
  render() {
    console.log(this.props.day);
    const date = moment(this.props.day);
    const displayDate = date.format("ddd DD/MM/YYYY");

    return(<li>{displayDate}</li>);
  }
}

export default Day;
