import React, {Component} from 'react';
import ScheduleEvent from "./ScheduleEvent";

class EventBox extends Component {

  render() {
    let column;
    let startRow;
    let endRow = 0;
    const events = [];
    const offset = this.props.offset;
    for (const eventData of this.props.events) {
      column = eventData.col;
      startRow = eventData.startRow;

      events.push(
        <ScheduleEvent event={eventData.event}
        onEventChange={this.props.onEventChange}
        selectedEvents={this.props.selectedEvents}/>
      );
    }

    const style = {
      gridColumn: column + offset,
      gridRow: startRow + offset,
    };

    return(
      <div style={style}>
        {events}
      </div>
    );
  }
}

export default EventBox;
