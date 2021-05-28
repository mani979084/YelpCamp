import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Redirect, useParams } from 'react-router-dom';
import qs from 'qs'
import Flash from './partials/Flash'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../actions/alert'
import Spin from './partials/Spin';
import Back from './partials/Back';

const Edit = ({ setAlert }) => {

    const { id } = useParams();
    const [camp, setcamp] = useState();
    const [isinput, setinput] = useState(false);
    const [isedit, setedit] = useState(false)
    const [inputs, setinputs] = useState({
        campground: {
            title: '', location: '', price: '', description: ''

        }
    });
    const [spin1, setspin1] = useState({ display: 'none' })

    const [isspin, setspin] = useState(true)
    const [iserror, seterror] = useState(false)

    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/api/campground/${id}/edit`)
            setcamp(res.data)
            setinput(true);
            setspin(false)
            if (res.data.error) {
                setAlert(res.data.error, 'danger')
                seterror(true)
            }

        }

        fetch();
    }, [id, setAlert])


    if (isinput) {

        setinputs({ campground: { title: camp.title, location: camp.location, price: camp.price, description: camp.description } })
        setinput(false);
    }


    function handleChange(e) {
        const { name, value } = e.target;

        setinputs({ campground: { ...inputs.campground, [name]: value } })
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            return e.target.classList.add('was-validated')
        }
        setspin1({ display: '' })
        async function fetchMyApi() {

            const res = await axios({
                method: 'put',
                url: `/api/campground/${id}`,
                data: qs.stringify(inputs),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
            setspin1({ display: 'none' })

            if (res.data.success) {
                setAlert(res.data.success, 'success')
                setedit(true)
            } else {
                setAlert(res.data.error, 'danger')
                seterror(true)

            }


        }
        fetchMyApi();
    }

    function buttonClick() {
        setedit(true)
    }


    if (iserror) {
        return <Redirect to='/login' />
    }

    if (isedit) {
        return <Redirect to={`/campground/${id}`} />
    }



    return (<Fragment>
        {isspin ? <Spin /> : <main className="container  mt-5">

            {camp && <div className="row mb-5">
                <div className="col-10 offset-1 col-md-6 offset-md-3">
                    {/* <%- include('../partials/flashAlert') %> */}
                    <Flash />
                    <Back buttonClick={buttonClick} />

                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Editing Campground</h1>
                            {/* action="/campground/<%=camp._id %>?_method=PUT" */}
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                <div> <label className="form-label" htmlFor="title">Enter Title</label>
                                    <input onChange={handleChange} className="form-control mb-3" type="text" name="title" id="title"
                                        value={inputs.campground.title} required />
                                    <div className="valid-feedback mb-3">
                                        Looks good!
                </div>
                                </div>
                                <div><label className="form-label" htmlFor="loc">Enter Location</label>
                                    <input onChange={handleChange} className="form-control mb-3" type="text" name="location" id="loc"
                                        value={inputs.campground.location} required />
                                    <div className="valid-feedback mb-3">
                                        Looks good!
                </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="price">Price</label>
                                    <div className="input-group">

                                        <span className="input-group-text" id="basic-addon1">$</span>
                                        <input onChange={handleChange} id="price" name="price" type="text" className="form-control"
                                            placeholder="0.00" aria-label="price" aria-describedby="basic-addon1"
                                            value={inputs.campground.price} required />
                                        <div className="valid-feedback mt-3">
                                            Looks good!
                    </div>
                                    </div>
                                </div>
                                <label className="form-label" htmlFor="desc">Description</label>
                                <textarea onChange={handleChange} className="form-control mb-3" type="text" name="description" id="desc"
                                    required value={inputs.campground.description} />
                                <div className="valid-feedback mb-3">
                                    Looks good!
            </div>


                                <div className="row card-body px-0">
                                    <div className="col-md-6 d-grid mb-3 mb-md-0">
                                        <Link to={`/campground/${camp._id}/editphoto`} className="card-link btn btn-info">Edit
                        Photos</Link>
                                    </div>
                                    <div className="col-md-6 d-grid">
                                        <button className="btn btn-success ">Update Campgound <div style={spin1} className="spinner-border spinner-border-sm" role="status" /></button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>}
        </main>}

    </Fragment>

    )
}

Edit.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Edit)
