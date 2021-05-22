import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './partials/Navbar'

import Comments from './Comments'

const Show = ({ getlocals, currentUser }) => {

    const { id } = useParams();
    const [camp, setcamp] = useState();
    const [isdelete, setdelete] = useState(false)
    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/campground/${id}`)
            setcamp(res.data)

        }
        fetch();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        async function fetch() {
            const res = await axios({
                method: 'delete',
                url: `/campground/${id}`
            })
            console.log(res.data)
            setdelete(true)
        }
        fetch();
    }

    function getcamp(data) {
        setcamp(data)
    }

    if (isdelete) {
        return <Redirect to='/campground' />
    }

    const styles = {

        width: 'auto',
        height: '400px',
        maxHeight: '400px',
        display: 'flex',
        alignItems: 'center'

    }


    return (
        <Fragment>
            <Navbar currentUser={currentUser} getlocals={getlocals} />
            <main className="container mt-5">

                {
                    camp && <div className="container mb-5">
                        <div className="row">

                            <div className="col-md-6">
                                {/* <%- include('../partials/flashAlert') %> */}

                                <div className="card">
                                    <div className="card-body">
                                        <div id="carouselExampleControls" className="carousel mb-3 slide" data-bs-ride="carousel">
                                            <div className="carousel-inner" style={styles}>
                                                {/* <% camp.images.forEach((img,i)=>{ %> */}
                                                {camp.images.map((img, i) => (
                                                    <div key={img._id} className={`carousel-item ${(i === 0) ? 'active' : ''}`}>
                                                        <img src={img.url} className="d-block w-100" alt="..." />
                                                    </div>
                                                ))}

                                                {/* <% }) %> */}
                                            </div>
                                            {/* <% if(camp.images.length> 1){ %> */}
                                            {camp.images.length > 1 && <Fragment><button className="carousel-control-prev" type="button"
                                                data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                                <button className="carousel-control-next" type="button"
                                                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button></Fragment>}

                                            {/* <% } %> */}
                                        </div>
                                        <h5 className="card-title">
                                            {camp.title}
                                        </h5>
                                        <p className="card-text">
                                            {camp.description}
                                        </p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-muted">
                                            {camp.location}
                                        </li>
                                        <li className="list-group-item text-muted">
                                            by <b>
                                                {camp.author.username}
                                            </b>

                                        </li>
                                        <li className="list-group-item">${camp.price}/night</li>
                                    </ul>
                                    {/* <%if(currentUser && camp.author.equals(currentUser._id)){%> */}
                                    {currentUser && camp.author._id === currentUser._id && <Fragment>
                                        <div className="row card-body">
                                            <div className="col-md-6 mb-3 mb-md-0 d-grid">
                                                <Link to={`/campground/${camp._id}/edit`} className="card-link btn btn-warning">Edit
                            Campground</Link>
                                            </div>
                                            <div className="col-md-6">
                                                <form onSubmit={handleSubmit} className="d-grid">
                                                    <button className="btn btn-danger">Delete Campground</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Fragment>}


                                    {/* <% } %> */}
                                    <footer className="card-footer text-muted">
                                        2 days ago
                    </footer>
                                </div>
                            </div>
                            <div className="col-md-6 mt-3 mt-md-0">
                                <Comments currentUser={currentUser} getcamp={getcamp} camp={camp} id={id} />
                            </div>
                        </div>
                    </div>
                }
            </main>
        </Fragment>)

}

export default Show;
