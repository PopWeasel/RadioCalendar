import React, {Component} from "react";
import ReactDOM from "react-dom";
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';
import Button from '@material-ui/core/Button';

import Event from "../Calendar/schedule/Event";

class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div>
        <Event
        event={this.props.event}
        onEventChange={this.props.onEventChange}
        selectedEvents={this.props.selectedEvents}/>
      </div>
    );
  }
}

export default EventCard;
