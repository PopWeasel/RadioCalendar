# RadioCalendar
Calendar viewer

Dev notes

npm init -y

npm i webpack --save-dev

npm i webpack-cli --save-dev

mkdir src
add following to package.json
"scripts": {
  "dev": "webpack --mode development
  "build": "webpack --mode production"
}

npm i babel-core babel-loader babel-preset-env --save-dev

create .babelrc
{
    "presets": [
        "env",
        "react"
    ]
}

create webpack.config.js
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

npm i react react-dom --save-dev
