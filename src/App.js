import React from 'react';
import './App.css';
import { Body, Search } from './components';
import { getGlobalData } from './API/API.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }

  async componentDidMount() {

    console.log("Awaited");
    this.setState({
      data: await getGlobalData() //displays global data by default
    });
    console.log("The state has been set");
  }

  handleChangeCountry = async (info) => {

    this.setState({
      data: await info
    });
    console.log("The state has been reset");
  }

  render() {

    if (this.state.data === null) {
      return null; //Promise not yet resolved, do not render.
    }
    return (
      <div className="App">
        <div className="title">
          <h1>
            Covid-19 Tracker
          </h1>
        </div>
        <div className="searchbar">
          <Search onCountryChange={this.handleChangeCountry} />
        </div>
        <div className="pagebody">
          <Body data={this.state.data} />
        </div>
      </div>
    );
  }

};

export default App;
