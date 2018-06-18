import React, {Component} from 'react';
import moment from "moment";

//import Calendar from 'react-calendar';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class DateSelector extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    const value = event.target.value;

    if (value) {
      const date = moment(value);
      const now = moment();
      if (date < now && date > now.subtract(10, "y")) {
          this.props.onDateChange(value);
      } else {
        console.log(`Invalid date ${value} resetting to this week`);
        this.props.onDateChange(now.startOf('isoWeek').format("YYYY-MM-DD"));
      }
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
