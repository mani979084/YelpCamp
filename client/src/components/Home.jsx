import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import ScriptTag from 'react-script-tag'
import { Helmet } from 'react-helmet'
import Flash from './partials/Flash'
import Spin from './partials/Spin'


const Home = () => {

    const [fulldata, setfullData] = useState();
    const [isspin, setspin] = useState(true)


    useEffect(() => {
        async function fetch() {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.get('/api/campground', config)
            setfullData(res.data);
            setspin(false)


        }
        fetch();
    }, [])


    return (
        <Fragment>
            {isspin ? <Spin /> : <Fragment>

                <main className="container my-5">
                    <Flash />
                    <div id='map' className="mb-md-2 mb-3  map1"></div>

                    {fulldata && fulldata.map((camp) => (<div key={camp._id} className="border-bottom mb-3 mb-md-0">
                        <div className="row">
                            <div className="col-md-4">
                                <div className=" carousel-inner carimg">
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

                <Helmet>
                    <script src="/javascripts/cluster.js"></script>
                </Helmet>
            </Fragment>}

        </Fragment>

    )

}

export default Home;