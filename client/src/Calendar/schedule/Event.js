import React, {Component} from 'react';

import moment from "moment";
import Typography from '@material-ui/core/Typography';
import withTheme from '@material-ui/core/styles/withTheme';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {}
    }
  }

  toggleEventActive = (e, event) => {
    console.log(`State {this.state.active}`);
    const active = this.state.active ? false : true;
    this.setState({
      active: {}
    });
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
    //const className = this.state.active ? 'selected' : 'unselected';
    return(
      <div onClick={e => this.toggleEventActive(e, event)}>
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
