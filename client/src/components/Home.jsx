import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './partials/Navbar'



const Home = ({ currentUser, getlocals }) => {

    const [fulldata, setfullData] = useState();

    useEffect(() => {
        async function fetch() {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.get('/campground', config)
            setfullData(res.data);


        }
        fetch();
    }, [])

    const styles = {
        width: 'auto',
        height: '300px',
        maxHeight: '300px',
        display: 'flex',
        alignItems: 'center'
    }

    return <Fragment>
        <Navbar currentUser={currentUser} getlocals={getlocals} />
        <main className="container mt-5">

            {fulldata && fulldata.map((camp) => (<div key={camp._id} className="border-bottom">
                <div className="row">
                    <div className="col-md-4">
                        <div className=" carousel-inner" style={styles}>
                            <img className="img-fluid" src={camp.images[0].url} alt="" />

                        </div>
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                        <div className="card-body">
                            <h5 className="card-title">
                                {camp.title}
                            </h5>
                            <p className="card-text">
                                {camp.description}
                            </p>

                            <p className="card-text"><small className="text-muted">
                                {camp.location}
                            </small></p>
                            <Link className="btn btn-primary w-50" to={`/campground/${camp._id}`}>View {camp.title}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>))}



        </main>
    </Fragment>
}

export default Home;