import React from 'react';
import { Card } from '../Cards/Cards.js';
import './Ranking.css'

export class Ranking extends React.Component {
    render() {
        return (
            <div className="page-container">
                {this.props.data.map((entry) =>
                    <div key={entry.country} className="countrylist-item">
                        <div className="title-container">
                            <img className="flag" src={entry.countryIcon} alt="" />
                            <h5 className="country">{entry.country}</h5>
                        </div>
                        <div className="data-container">
                            {Object.values(entry.covidinfo).map((data_entry) =>
                                <Card key={data_entry.title} title={data_entry.title} number={data_entry.number} ranking={data_entry.ranking} daily={data_entry.daily} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        ); //Placeholder, to be implemented.
    }
};

export default Ranking;