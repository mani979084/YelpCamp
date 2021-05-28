import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Main = ({ currentUser, getlocals }) => {

    const [spin1, setspin1] = useState({
        display: 'none'
    })

    function handleClick() {
        setspin1({
            display: ''
        })
        async function fetch() {
            await axios.get('/api/logout')
            getlocals()
            setspin1({
                display: 'none'
            })
        }
        fetch();
    }


    return (
        <Fragment>
            <div className="d-flex body h-100 text-center text-white bg-dark">

                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

                    <header className="mb-auto">
                        <div>
                            <h3 className="float-md-start mb-0">YelpCamp</h3>
                            <nav className="nav nav-masthead justify-content-center float-md-end">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                <Link className="nav-link" to="/campground">campgrounds</Link>
                                {/* <% if(!currentUser){ %> */}
                                {!currentUser ? <Fragment>
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </Fragment> : <Link onClick={handleClick} className="nav-link" to="#!">Logout <div style={spin1} className="spinner-border spinner-border-sm text-light" role="status" /></Link>}

                                {/* <% }else{ %> */}

                                {/* <% } %> */}
                            </nav>
                        </div>
                    </header>

                    <main className="px-3">
                        <h1>YelpCamp</h1>
                        <p className="lead">Welcome to YelpCamp <br />
                            Jump right in and explore our many campgrounds. <br />
                                Feel free to share your own campgrounds and comment on others!
                        </p>

                        <p className="lead">
                            <Link to="/campground" className="btn btn-lg btn-secondary fw-bold border-white bg-white">View
                        Campgrounds</Link>
                        </p>
                    </main>

                    <footer className="mt-auto text-white-50">
                        <p>&copy; 2021</p>
                    </footer>
                </div>



            </div>

        </Fragment>
    )
}


export default Main;
