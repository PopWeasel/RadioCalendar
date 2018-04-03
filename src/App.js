import React, {Component} from "react";
import ReactDOM from "react-dom";
import Calendar from './pages/Calendar';
import ErrorBoundary from "./components/general/ErrorBoundary";

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
      <ErrorBoundary>
        <Calendar stations={this.state.config.stations} />
      </ErrorBoundary>
    );
  }
}

//export default App;
ReactDOM.render(<App />, document.getElementById('calendar'));
