import React, {Component} from 'react';
import Calendar from 'react-calendar';

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedDate) {
    this.props.onDateChange(selectedDate);
  }

  render() {
    const selectedDate = this.props.selectedDate;
    return(<Calendar value={selectedDate} onChange={this.handleChange}/>);
  }
}

export default DateSelector;
