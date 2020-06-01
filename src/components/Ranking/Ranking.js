import React from "react";
import { Card } from "../Cards/Cards.js";
import "./Ranking.css";
import { similarCountriesSelector } from "../../selectors/selectors.js";
import { connect } from "react-redux";
import { updateError } from "../../actions/";

class Ranking extends React.Component {
    render() {
        
        if (!this.props.countries || JSON.stringify(this.props.countries) === "{}") { 
            console.log("Caught");
            return null; //Either an empty object or untruthy.
        }

        return (
            <div className="page-container">
                {this.props.countries.map((entry) => (
                    <div key={entry.country} className="countrylist-item">
                        <div className="title-container">
                            <img
                                className="flag"
                                src={entry.countryIcon}
                                alt=""
                            />
                            <h5 className="country">{entry.country}</h5>
                        </div>
                        <div className="data-container">
                            {Object.values(entry.covidinfo)
                                .filter(
                                    (elem) =>
                                        [
                                            "Total Cases",
                                            "Recovered",
                                            "Died",
                                            "Tests",
                                        ].indexOf(elem.title) > -1
                                )
                                .map((dataEntry) => (
                                    <Card
                                        key={dataEntry.title}
                                        title={dataEntry.title}
                                        number={dataEntry.number}
                                        ranking={dataEntry.ranking}
                                        daily={dataEntry.daily}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    countries: similarCountriesSelector(state, props)
});

const mapDispatchToProps = (dispatch) => ({
    setError: (value) => dispatch(updateError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
