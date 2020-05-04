import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Body, Search} from './components';
import {getGlobalData} from './API/API.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null //displays global data by default
    }
    // console.log(`In the constructor, ${this.state.data}, and ${this.state.data.cases}`);
  }
  
  async componentDidMount() {

    console.log("Awaited");
    this.setState({
      data: await getGlobalData()
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

    if (this.state.data === null)
    {
      return null; //Promise not yet resolved, do not render.
    }
    return (
      <div className="App">
        <div style={{gridArea: 't'}}>
          <h1>
            Covid-19 Tracker
          </h1>
        </div>
        <div style={{gridArea: 'a'}}>
          <Search onCountryChange={this.handleChangeCountry}/>
        </div>
        <div style={{gridArea: 'c'}}>
          <Body data={this.state.data}/>
        </div>
      </div>
    );
  }
  // async componentDidMount() {

  //   const data = await getCountryData('ukraine');
  //   console.log(data);
  // }
};

export default App;
