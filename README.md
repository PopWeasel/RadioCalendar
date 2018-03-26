# RadioCalendar
Calendar viewer

## Dev notes

1. npm init -y
1. npm i webpack --save-dev
1. npm i webpack-cli --save-dev
1. mkdir src
1. add following to package.json
```
"scripts": {
  "dev": "webpack --mode development
  "build": "webpack --mode production"
}
```
1. npm i babel-core babel-loader babel-preset-env --save-dev

1. create .babelrc
```
{
    "presets": [
        "env",
        "react"
    ]
}
```

1. create webpack.config.js
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```
1. npm i react react-dom babel-preset-react --save-dev
1. npm i html-webpack-plugin html-loader --save-dev

1. edit webpack config
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

1. create react App.js
```
import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));
```
1. add following to ser/index.js
import App from "./App";

1. create src/index.HtmlWebPackPlugin<!DOCTYPE html>
```
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>webpack 4 quickstart</title>
</head>
<body>
    <div id="app">
    </div>
</body>
</html>

npm run build

npm i mini-css-extract-plugin css-loader --save-dev

create src/main.css
body {
    line-height: 2;
}
```

1. npm i webpack-dev-server --save-dev

1. add following 'scripts' section in package.json
"start": "webpack-dev-server --mode development --open"

1. npm run start
