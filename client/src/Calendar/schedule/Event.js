import React, {Component} from 'react';

import moment from "moment";
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';
import styles from './Event.css';

class Event extends Component {
  constructor(props) {
    super(props);
    let active = false;
    if (this.props.event.id in this.props.selectedEvents) {
      active = true;
    }
    this.state = {
      active: active
    }
  }

  toggleEventActive = (e, event) => {
    const active = this.state.active ? false : true;
    console.log(`State ${this.state.active}`);
    this.setState({
      active: active
    });
    const selectedEvents = this.props.selectedEvents;
    if (active) {
      selectedEvents[event.pid] = event;
    } else {
      if (event.pid in selectedEvents) {
        delete selectedEvents[event.pid];
      }
    }
    console.log(selectedEvents);
    this.props.onEventsChange(selectedEvents);
  };

  render() {
    const event = this.props.event;
    const start = moment(event.start);
    const end = moment(event.end);

    const title = <Typography variant="title">{event.title}</Typography>;
    const subtitle = <Typography variant="subheading">{event.subTitle}</Typography>;
    const synopsis = <Typography variant="body1">{event.synopsis}</Typography>;
    const time = <Typography variant="body1">{start.format("HH:mm")} - {end.format("HH:mm")}</Typography>;
    let episode = "";
    if ('total' in event && 'episode' in event) {
      episode = <Typography variant="body2">{event.episode}/{event.total}</Typography>
    }
    const pid = <Typography variant="body1">{event.pid}</Typography>;
    const divStyle = this.state.active ? styles.selected : null;
    console.log(`Style ${this.state.active} => ${divStyle}`);
    return(
      <div onClick={e => this.toggleEventActive(e, event)} className={divStyle}>
        {title}
        {subtitle}
        {episode}
        {synopsis}
        {time}
        {pid}
      </div>
    );
  }
}

export default Event;
