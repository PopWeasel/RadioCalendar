import React, {Component} from 'react';

class Week extends Component {
  render() {
    return (
      <div>Week Component : {this.props.selectedStation.name}</div>
    );
  }
}

export default Week;
