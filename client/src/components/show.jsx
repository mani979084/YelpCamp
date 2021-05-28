import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Flash from './partials/Flash'
import Spin from './partials/Spin'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../actions/alert'
import { setSpinner, removeSpinner } from '../actions/spinner'

import Comments from './Comments'
import Back from './partials/Back'
import { Helmet } from 'react-helmet'

const Show = ({ currentUser, setAlert, spinner, setSpinner, removeSpinner }) => {

    const { id } = useParams();
    const [camp, setcamp] = useState();
    const [isdelete, setdelete] = useState(false)
    const [isspin, setspin] = useState(true)
    const [iserror, seterror] = useState(false)
    const [isvalue, setvalue] = useState(false)

    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/api/campground/${id}`)
            setcamp(res.data)
            setspin(false)
            if (res.data.error) {
                setAlert(res.data.error, 'danger')
                seterror(true)
            }

        }
        fetch();
    }, [isvalue, id, setAlert])

    function handleSubmit(e) {
        e.preventDefault();
        setSpinner()
        async function fetch() {
            const res = await axios({
                method: 'delete',
                url: `/api/campground/${id}`
            })
            setdelete(true)
            removeSpinner()
            if (res.data.success) {
                setAlert(res.data.success, 'success')
            } else {
                setAlert(res.data.error, 'danger')

            }

        }
        fetch();
    }

    function getcamp() {
        setvalue(!isvalue)
    }

    function buttonClick() {
        setdelete(true)
    }

    if (iserror) {
        return <Redirect to='/campground' />
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
            {isspin ? <Spin /> : <Fragment>
                <main className="container  mt-5">

                    {
                        camp.images && <Fragment> <div className="container mb-5">
                            <div className="row">
                                <Flash />
                                <Back buttonClick={buttonClick} />

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
                                                    <Link to={`/campground/${camp._id}/edit`} className="card-link btn btn-info">Edit
            Campground</Link>
                                                </div>
                                                <div className="col-md-6">
                                                    <form onSubmit={handleSubmit} className="d-grid">
                                                        <button className="btn  btn-danger">Delete Campground <div style={spinner} className="spinner-border spinner-border-sm" role="status" /></button>
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

                        </Fragment>
                    }
                </main>
                <Helmet>
                    <script src="/javascripts/showPageMap.js"></script>
                </Helmet>
            </Fragment>
            }

        </Fragment>)

}

Show.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setSpinner: PropTypes.func.isRequired,
    spinner: PropTypes.object.isRequired,
    removeSpinner: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    spinner: state.spinner
})

export default connect(mapStateToProps, { setAlert, setSpinner, removeSpinner })(Show);
