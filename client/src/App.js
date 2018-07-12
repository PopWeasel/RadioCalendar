import React, {Component} from "react";
import ReactDOM from "react-dom";
import Calendar from './Calendar/Calendar';
import ErrorBoundary from "./components/ErrorBoundary";

import 'typeface-roboto'

class App extends Component {
  constructor(props) {
    super(props);
    const config = require('Config');
    this.state = {
      'config': config
    };
  }

  render() {
    return (
      //<React.StrictMode>
        <ErrorBoundary>
          <Calendar stations={this.state.config.stations} />
        </ErrorBoundary>
      //</React.StrictMode>
    );
  }
}

//export default App;
ReactDOM.render(<App />, document.getElementById('calendar'));
