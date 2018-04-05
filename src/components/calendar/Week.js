import React, {Component} from 'react';
import moment from 'moment';

class Week extends Component {
  render() {
    const date = moment(this.props.selectedDate);
    const weekOfYear = date.format("ww");
    const year = date.format("YYYY");
    const displayDate = date.format("DD/MM/YY");
    return (
      <div>
        <div>
          Station : {this.props.selectedStation.name}
        </div>
        <div>
          Date : {displayDate}
        </div>
        <div>
          Year : {year}
        </div><div>
          Week of year : {weekOfYear}
        </div>


      </div>
    );
  }
}

export default Week;
