import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../actions/alert'
import Flash from './partials/Flash'
import Back from './partials/Back';


const Create = ({ setAlert }) => {

    const [inputs, setinputs] = useState({
        campground: {
            title: '',
            location: '',
            price: '',
            description: ''
        },
        images: []
    });


    const [spin1, setspin1] = useState({ display: 'none' })
    const [isclicked, setclick] = useState(false);
    const [iserror, seterror] = useState(false)

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (name !== 'images') {
            setinputs({ ...inputs, campground: { ...inputs.campground, [name]: value } })
        }
        if (name === 'images') {
            setinputs({ ...inputs, [name]: files })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            return e.target.classList.add('was-validated')
        }
        setspin1({
            display: ''
        })
        async function fetchMyApi() {
            const data = new FormData();
            for (let i = 0; i < inputs.images.length; i++) {
                data.append('images', inputs.images[i]);
            }
            data.append('campground[title]', inputs.campground.title)
            data.append('campground[location]', inputs.campground.location)
            data.append('campground[price]', inputs.campground.price)
            data.append('campground[description]', inputs.campground.description)


            const res = await axios({
                method: 'post',
                url: `/api/campground`,
                data: data

            })

            setspin1({ display: 'none' })
            if (res.data.success) {
                setclick(true);
                setAlert(res.data.success, 'success')

            } else {
                setAlert(res.data.error, 'danger')
                seterror(true)
            }

        }
        fetchMyApi();
    }

    function buttonClick() {
        setclick(true)
    }
    useEffect(() => {
        async function fetch() {
            const res = await axios.get('/api/campground/new')
            if (res.data.error) {
                setAlert(res.data.error, 'danger')
                seterror(true)
            }
        }
        fetch()
    }, [setAlert])

    if (iserror) {
        return <Redirect to='/login' />
    }

    if (isclicked) {
        return <Redirect to='/campground' />
    }

    return (
        <Fragment>
            <main className="container  mt-5">

                <div className="row mb-5">
                    <div className="col-10 offset-1 col-md-6 offset-md-3">
                        {/* <%- include('../partials/flashAlert') %> */}
                        <Flash />
                        <Back buttonClick={buttonClick} />
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="text-center mb-4">Creating Campground</h1>

                                <form id='myForm' onSubmit={handleSubmit} className="needs-validation"
                                    noValidate>
                                    <div> <label className="form-label"
                                        htmlFor="title">Enter Title</label>
                                        <input onChange={handleChange} className="form-control mb-3" type="text" name="title" required id="title" />
                                        <div className="valid-feedback mb-3">
                                            Looks good!
                            </div>
                                    </div>
                                    <div> <label className="form-label" htmlFor="loc">Enter Location</label>
                                        <input onChange={handleChange} className="form-control mb-3" type="text" name="location" required id="loc" />
                                        <div className="valid-feedback mb-3">
                                            Looks good!
                            </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="price">Price</label>
                                        <div className="input-group">

                                            <span className="input-group-text" id="basic-addon1">$</span>
                                            <input onChange={handleChange} id="price" name="price" type="text" className="form-control"
                                                placeholder="0.00" aria-label="price" aria-describedby="basic-addon1" required />
                                            <div className="valid-feedback mt-3">
                                                Looks good!
                                </div>
                                        </div>
                                    </div>
                                    <label className="form-label" htmlFor="desc">Description</label>
                                    <textarea onChange={handleChange} className="form-control mb-3" type="text" name="description" id="desc"
                                        required></textarea>
                                    <div className="valid-feedback mb-3">
                                        Looks good!
                        </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFileMultiple" className="form-label">Upload Images</label>
                                        <input onChange={handleChange} className="form-control" type="file" id="formFileMultiple" name="images" multiple />
                                    </div>
                                    <div className="text-center card-body">
                                        <button className="btn btn-success w-50">Add Campgound <div style={spin1} className="spinner-border spinner-border-sm" role="status" /></button>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </Fragment>
    )
}

Create.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Create)
