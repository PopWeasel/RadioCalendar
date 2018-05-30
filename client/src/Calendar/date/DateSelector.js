import React, {Component} from 'react';
import moment from "moment";

//import Calendar from 'react-calendar';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    if (value) {
      this.props.onDateChange(value);
    }
  }

  render() {
    const selectedDate = moment(this.props.selectedDate).format('YYYY-MM-DD');
    console.log(`Selected date: ${selectedDate}`);
    return(
      <TextField
        label="Select Week"
        id="date"
        type="date"
        defaultValue={selectedDate}
        InputLabelProps={{
         shrink: true,
        }}
        onChange={this.handleChange}
       />
    );
  }
}

export default DateSelector;
