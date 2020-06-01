import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { connect } from 'react-redux';
import { updateLocation } from '../../actions/';

//TODO use react-redux-router extension to syncronize history through redux state.
function Navbar(props) { 
    return (
        <nav>
            <div className="nav-container">
                <h1>Covid-19 Tracker</h1>
                <Link to="/" onClick={() => {props.setLocation("/")}}> Infopage </Link> 
                <Link to="/ranking" onClick={() => {props.setLocation("/ranking/")}}> Rankings</Link>
            </div>
        </nav>
    );  
}

const mapStateToProps = (state) => ({
    location: state.nav.location
})

const mapDispatchToProps = (dispatch) => ({
    setLocation: (location) => dispatch(updateLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);