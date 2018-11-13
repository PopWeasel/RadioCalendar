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

  removeEventCard = (e, event) => {
    this.props.onEventChange(event);
  };

  render() {
    const cardsStyle = {
      'display': 'flex',
      'justifyContent': 'space-between',
      'flexWrap': 'wrap'
    }
    const event = this.props.event;
    return (
      <div style={cardsStyle} onClick={e => this.removeEventCard(e, this.props.event)}>
        <Event event={this.props.event} selectedEvents={this.props.selectedEvents}/>
      </div>
    );
  }
}

export default EventCard;
