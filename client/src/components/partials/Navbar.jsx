import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ currentUser, getlocals }) => {

    const [islogout, setlogout] = useState(false);

    function handleClick() {
        async function fetch() {
            const res = await axios.get('/logout')
            console.log(res.data);
            setlogout(true);
            const localres = await axios.get('/locals')
            getlocals(localres.data)
        }
        fetch();
    }

    // if (islogout) {
    //     return <Redirect to={'/campground'} />
    // }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">YelpCamp</a>
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
                        {!currentUser ? <div className='d-md-flex'> <a className="nav-link" href="/login">Login</a>
                            <a className="nav-link" href="/register">Register</a></div> : <Link to='#!' onClick={handleClick} className="nav-link">Logout</Link>} </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
