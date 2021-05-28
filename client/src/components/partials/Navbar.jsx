import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Navbar = ({ currentUser, getlocals, setAlert }) => {
    const [isstyles, setstyle] = useState({
        display: 'none'
    })

    function handleClick() {
        setstyle({
            display: ''
        })
        async function fetch() {
            const res = await axios.get('/api/logout')
            getlocals()
            setAlert(res.data.success, 'success')
            setstyle({
                display: 'none'
            })
        }
        fetch();
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">YelpCamp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/campground">Campgrounds</Link>
                        <Link className="nav-link" to="/campground/new">New Campgrounds</Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        {!currentUser ? <div className='d-md-flex'> <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Register</Link></div> : <Link to='#!' onClick={handleClick} className="nav-link">Logout <div style={isstyles} className="spinner-border spinner-border-sm" role="status" /></Link>} </div>


                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Navbar)
