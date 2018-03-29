import React from "react";
import ReactDOM from "react-dom";
import Week from "./calendar/Week";
import List from "./station/List";

const App = () => {
  return (
    <div>
      <List />
      <Week />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('calendar'));
