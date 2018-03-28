import React from "react";
import ReactDOM from "react-dom";
import Week from "./calendar/Week";

const App = () => {
  return (
    <div>
      <Week />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('calendar'));
