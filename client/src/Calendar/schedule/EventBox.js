import React, {Component} from 'react';
import Event from "./Event";

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
      if (eventData.endRow > endRow){
        endRow = eventData.endRow;
      }

      events.push(
        <Event event={eventData.event}
        onEventChange={this.props.onEventChange}
        selectedEvents={this.props.selectedEvents}/>
      );
    }

    //console.log(`${event.title} Times: ${start.format("HH:mm")} - ${end.format("HH:mm")} => ${startRow} - ${endRow}`);
    const style = {
      gridColumn: column + offset,
      gridRowStart: startRow + offset,
      gridRowEnd: endRow + 1
    };

    return(
      <div style={style}>
        {events}
      </div>
    );
  }
}

export default EventBox;
