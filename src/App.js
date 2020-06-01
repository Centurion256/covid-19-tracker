import React from "react";
import { Body, Search, Navbar, Ranking } from "./components";
import { getEachCountryAndGlobal } from "./API/API.js";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import { createStore, combineReducers } from "redux";
import { countryReducer, inputReducer, navigationReducer } from "./reducers";
import { updateCountryData } from "./actions";

const store = createStore(
    combineReducers({
        data: countryReducer,
        input: inputReducer,
        nav: navigationReducer,
    })
);
//TODO handle history through react-redux-router, async data directly through redux.
class App extends React.Component {
    async componentDidMount() {
        let response = await getEachCountryAndGlobal(""); //fetches all countries by default
        store.dispatch(updateCountryData(response));
    }

    render() {
        //Notice the components wrapped in routes. This is one way to pass a common history to each component
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <div className="main">
                            <div className="title">
                                <h1>Covid-19 Tracker</h1>
                            </div>
                            <div className="searchbar">
                                <Route component={Search} />
                            </div>
                            <div className="pagebody">
                                <Switch>
                                    <Route
                                        path="/ranking/:country"
                                        component={Ranking}
                                    />
                                    <Route
                                        path="/ranking"
                                        component={Ranking}
                                    />
                                    <Route path="/:country" component={Body} />
                                    <Route path="/" component={Body} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
