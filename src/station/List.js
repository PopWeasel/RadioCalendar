import React, {Component} from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    const config = require('Config');
    //TODO add some error handling here
    this.state = {
      stations: config.stations
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const stations = this.state.stations.map((station) => <li className="station" key={station.key}>{station.name}</li>);
    return <ul className="stations">{stations}</ul>;
  }
}

export default List;
