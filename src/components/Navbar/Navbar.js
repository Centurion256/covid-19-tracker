import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export function Navbar() {
    return (
        <nav>
            <div className="nav-container">

                <h1>Covid-19 Tracker</h1>
                <Link to="/"> Infopage </Link> 
                <Link to="/ranking"> Rankings</Link>

            </div>
        </nav>
    );  
}