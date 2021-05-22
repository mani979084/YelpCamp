import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Navbar from './partials/Navbar'


const Create = ({ getlocals, currentUser }) => {

    const [inputs, setinputs] = useState({
        campground: {
            title: '',
            location: '',
            price: '',
            description: ''
        },
        images: []
    });

    const [isclicked, setclick] = useState(false);

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
                url: `/campground`,
                data: data

            })
            console.log(res.data)
            if (res.data.success) {
                setclick(true);
            }


        }
        fetchMyApi();
    }

    if (isclicked) {
        return <Redirect to='/campground' />
    }

    return (
        <Fragment>
            <Navbar currentUser={currentUser} getlocals={getlocals} />
            <main className="container mt-5">

                <div className="row mb-5">
                    <div className="col-10 offset-1 col-md-6 offset-md-3">
                        {/* <%- include('../partials/flashAlert') %> */}

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
                                        <button className="btn btn-success w-50">Add Campgound</button>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div></main>
        </Fragment>
    )
}

export default Create
