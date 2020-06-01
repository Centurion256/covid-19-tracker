import React from "react";
import { Card } from "../Cards/Cards.js";
import "./Ranking.css";
import { selectCountriesLike } from "../../selectors/selectors.js";
import { connect } from "react-redux";
import { updateError } from "../../actions/";

class Ranking extends React.Component {
    render() {
        let selectedCountry;
        if ("country" in this.props.match.params && ["global", "world"].indexOf(this.props.match.params.country) <= -1) {
            selectedCountry = this.props.getCountries(
                this.props.match.params.country
            );
        } else {
            selectedCountry = this.props.getCountries("global");
        }
        if (!selectedCountry || JSON.stringify(selectedCountry) === "{}") { 
            console.log("Caught");
            return null; //Either an empty object or untruthy.
        }

        return (
            <div className="page-container">
                {selectedCountry.map((entry) => (
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

const mapStateToProps = (state) => ({
    getCountries: (country) => selectCountriesLike(country, state.data),
});

const mapDispatchToProps = (dispatch) => ({
    setError: (value) => dispatch(updateError(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
