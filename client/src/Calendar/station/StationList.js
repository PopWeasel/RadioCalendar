import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    <MenuItem className="station" value={station.id} key={station.key} >
      {station.name}
    </MenuItem>);
    return (
      <span>
        <InputLabel>
          Select a station&nbsp;
        </InputLabel>
        <Select className="stations" onChange={this.handleChange} value={value}>
            {stations}
        </Select>
      </span>
    );
  }
}

export default StationList;
