import React from 'react';
import './Body.css'
import { Card } from '../Cards/Cards.js';

export class Body extends React.Component {
    
    // fetchCountryData = () => {
        
    //     this.setState({
    //         data: getCountryData()
    //     });
    // }
    render() {

        console.log("Im here");
        const isGlobal = this.props.data["country"] === undefined;
        let heading;
        if (isGlobal) {
            heading = 
            <div>
                <h2 className="country">The World</h2> 
            </div>;
        }
        else {
            heading = 
            <div>
                <h5>COUNTRY:</h5>
                <div>
                    <img className="flag" src={this.props.data.countryIcon} loading="lazy"/>
                    <h2 className="country">{this.props.data["country"]}</h2>   
                </div>
            </div>;
        }
        // console.log(`Before returning, this.props.data == ${this.props.data}, this.props.data.country == ${this.props.data["country"]}, this.props.data.cases == ${this.props.data.cases} `)
        return (
          <div className="page-container">
              <div style={{justifySelf: "stretch"}}>
                {heading}
                <hr/>
              </div>
              
              <div className="metric-container">
                  {console.log(`Trying to get covidinfo, ${JSON.stringify(this.props.data)}; ${JSON.stringify(this.props.data.covidinfo)}`)}
                  {Object.values(this.props.data.covidinfo).map((entry) => 
                      <Card key={entry.title} title={entry.title} number={entry.number} ranking={entry.ranking} daily={entry.daily} />
                  )}
              </div>
          </div>  
        );
    };
};