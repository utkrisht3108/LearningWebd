import React, { useState } from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  callAPI() {
    fetch('http://localhost:8000/testAPI')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <div>
        <h1>HIIII</h1>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
