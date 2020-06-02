import React from 'react';
import './Cards.css';

export const Card = (props) => {
    console.log(`${JSON.stringify(props.title)}, ${JSON.stringify(props.number)}`);
    return (
        <div className="container">
            <h3> {props.title} </h3> {props.ranking && <span className="ranking">Ranked {props.ranking}</span>}
            <br></br>
            <h2> {props.number} </h2> {props.daily && <span className="green growth"> {props.daily}</span>}
        </div>
    );
};

export default Card;