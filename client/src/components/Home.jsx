import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Flash from './partials/Flash'
import Spin from './partials/Spin'

import Map1 from './partials/Map1'
import Pagination from './Pagination'


const Home = () => {

    const [fulldata, setfullData] = useState([]);
    const [isspin, setspin] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = fulldata.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                    <Map1 fulldata={fulldata} />
                    {fulldata && currentPosts.map((camp) => (<div key={camp._id} className="border-bottom">
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
                                    <Link className="btn btn-primary" to={`/campground/${camp._id}`}>View {camp.title}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>))}

                </main>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={fulldata.length}
                    paginate={paginate}
                />


            </Fragment>}

        </Fragment>

    )

}

export default Home;