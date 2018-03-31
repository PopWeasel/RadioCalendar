import React, {Component} from 'react';

class StationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.stations[0].id
    };
    this.handleChange = this.handleChange.bind(this);

  }


  handleChange(event) {
    console.log("Change" + event);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const stations = this.props.stations.map((station) => <option className="station" value={station.id} key={station.key} >{station.name}</option>);
    return (
          <select className="stations" onChange={this.handleChange} value={this.state.value}>
            {stations}
          </select>
    );
  }
}

export default StationList;
