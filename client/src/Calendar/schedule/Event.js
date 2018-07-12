import React, {Component} from 'react';

import moment from "moment";
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Event.css';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  toggleEventActive = (e, event) => {
    this.props.onEventChange(event);
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
    //const divStyle = this.state.active ? styles.selected : null;

    let active = false;
    if (this.props.event.id in this.props.selectedEvents) {
      active = true;
    }
    if (active) {
      console.log(`Rendering ${event.title}:${event.pid} = ${active}`);
    }

    return(
      <div>
        {title}
        {subtitle}
        {episode}
        {synopsis}
        {time}
        {pid}
        <Checkbox
          checked={active}
          onChange={e => this.toggleEventActive(e, event)}
          color="primary"
        />
      </div>
    );
  }
}

export default Event;
