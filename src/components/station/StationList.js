import React, {Component} from 'react';

class StationList extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const stations = this.props.stations.map((station) => <li className="station" key={station.key}>{station.name}</li>);
    return <ul className="stations">{stations}</ul>;
  }
}

export default StationList;
