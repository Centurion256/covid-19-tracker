import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export function Navbar(props) {
    return (
        <nav>
            <div className="nav-container">

                <h1>Covid-19 Tracker</h1>
                <Link to="/" onClick={() => {props.flushPage("/")}}> Infopage </Link> 
                <Link to="/ranking" onClick={() => {props.flushPage("/ranking")}}> Rankings</Link>

            </div>
        </nav>
    );  
}