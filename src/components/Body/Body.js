import React from "react";
import { singleCountrySelector } from "../../selectors/selectors";
import { connect } from "react-redux";
import { Card } from "../Cards/Cards.js";
import "./Body.css";

//TODO Rewrite async data handling through redux.
class Body extends React.Component {
    render() {
        let countryData;
        const isGlobal =
            !("country" in this.props.match.params) ||
            ["global", "world"].indexOf(this.props.match.params["country"]) > -1;
        
        countryData = this.props.country; //for backwards compatibility

        if (!countryData || JSON.stringify(countryData) === "{}") {
            console.log("Caught");
            return null; //Either an empty object or untruthy.
        }

        let heading;
        if (isGlobal) {
            heading = (
                <div>
                    <h2 className="country">The World</h2>
                </div>
            );
        } else {
            heading = (
                <div>
                    <h5>COUNTRY:</h5>
                    <div>
                        <img className="flag" src={countryData.countryIcon} alt="" />
                        <h2 className="country">{countryData.country}</h2>
                    </div>
                </div>
            );
        }

        return (
            <div className="page-container">
                <div className="header-container">
                    {heading}
                    <hr />
                </div>

                <div className="metric-container">
                    {Object.values(countryData.covidinfo).map((entry) => (
                        <Card
                            key={entry.title}
                            title={entry.title}
                            number={entry.number}
                            ranking={entry.ranking}
                            daily={entry.daily}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    country: singleCountrySelector(state, props) //This allows for memoization of selectors
});

export default connect(mapStateToProps)(Body);
