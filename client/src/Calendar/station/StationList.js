import React, {Component} from 'react';

class StationList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onStationChange(event.target.value);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const value = this.props.selectedStation.id;
    const stations = this.props.stations.map((station) =>
    <option className="station" value={station.id} key={station.key} >
      {station.name}
    </option>);
    return (
      <label>
        Select a station&nbsp;
        <select className="stations" onChange={this.handleChange} value={value}>
          {stations}
        </select>
      </label>
    );
  }
}

export default StationList;
