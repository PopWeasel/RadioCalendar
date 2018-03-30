import React, {Component} from 'react';

class StationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.stations[0].id
    };
    //this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

/*
  handleClick(event) {
    console.log("Click" + event);
  }
*/
  handleChange(event) {
    console.log("Change" + event);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const stations = this.props.stations.map((station) => <option className="station" value={station.id} key={station.key}>{station.name}</option>);
    return (<form>
              <select className="stations" onChange={this.handleChange} value={this.state.value}>{
                stations}
              </select>
            </form>);
  }
}

export default StationList;
