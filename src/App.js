import React from 'react';
import { Body, Search, Navbar, Ranking } from './components';
import { getGlobalData, getEachCountryData } from './API/API.js';
import { Switch, Route } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      rating_data: null,
      path_changed: false
    }
  }

  async componentDidMount() {

    console.log("Awaited");
    this.setState({
          rating_data: await getEachCountryData(""), //displays all countries by default
          data: await getGlobalData() //displays global data by default
        });
  }

  handleChangeCountry = async (info) => {

    if (window.location.pathname === "/") {
      this.setState({
        data: await info
      });
    } else {
      this.setState({
        rating_data: await info
      })
    }
    console.log("The state has been reset");
  }

  handleStateFlush = async (addr) => {
    
    if (addr === "/") {
      this.setState({
        data: await getGlobalData()
      });
    } else {
      this.setState({
        rating_data: await getEachCountryData("")
      });
    }
  
  }
  
  render() {

    if (this.state.data === null || this.state.rating_data === null) {
      return null;
    }


    return (

      <div className="App">
        <Navbar flushPage={this.handleStateFlush}/>
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
                <Ranking data={this.state.rating_data} />
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
