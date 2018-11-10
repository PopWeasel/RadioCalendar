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

    let active = false;
    if (this.props.event.pid in this.props.selectedEvents) {
      active = true;
    }
    let selectedClasses = `${styles.event} ` + ((active) ? `${styles.active}` : '');
    //if being rendered in event card, apply different css classes
    if (this.props.cardStyle) {

    }

    return(
      <div className={selectedClasses} onClick={e => this.toggleEventActive(e, event)}>
        {title}
        {subtitle}
        {time}
        {episode}
        {synopsis}
        <Checkbox
          checked={active}
          color="primary"
        />
      </div>
    );
  }
}

export default Event;
