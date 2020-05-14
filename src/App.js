import React from 'react';
import { Body, Search, Navbar, Ranking } from './components';
import { getGlobalData } from './API/API.js';
import { Switch, Route } from 'react-router-dom';
import './App.css';

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
        <Navbar/>
        <div className="main">        
          <div className="title">
            <h1>
              Covid-19 Tracker
            </h1>
          </div>
          <div className="searchbar">
            <Search onCountryChange={this.handleChangeCountry} />
          </div>
          <div className="pagebody">
            <Switch>
              <Route path="/ranking">
                <Ranking />
              </Route>
              <Route path="/">
                <Body data={this.state.data} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }

};

export default App;
