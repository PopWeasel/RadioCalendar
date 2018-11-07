import React, {Component} from "react";
import ReactDOM from "react-dom";
import Homepage from './Home/Home';
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
        //<ErrorBoundary>
          //<React.StrictMode>
            <Homepage config={this.state.config} />
          //</React.StrictMode>
       //</ErrorBoundary>
    );
  }
}

//export default App;
ReactDOM.render(<App />, document.getElementById('calendar'));
