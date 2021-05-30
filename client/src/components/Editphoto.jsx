import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import Flash from './partials/Flash'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../actions/alert'
import Spin from './partials/Spin';
import { setSpinner, removeSpinner } from '../actions/spinner'
import Back from './partials/Back';



const Editphoto = ({ setAlert, setSpinner, removeSpinner, spinner }) => {

    const { id } = useParams()
    const [camp, setcamp] = useState();
    const [isinput, setinput] = useState(false);
    const [fileinputs, setfile] = useState({ images: [], deleteImages: [] });
    const [isspin, setspin] = useState(true)
    const [iserror, seterror] = useState(false)


    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/api/campground/${id}/editphoto`)
            setcamp(res.data)
            setspin(false)
            if (res.data.error) {
                seterror(true)
                setAlert(res.data.error, 'danger')
            }

        }

        fetch();
    }, [id, setAlert])


    function handleChange(e) {
        const { name, files, value, checked } = e.target;
        if (name === 'images') {
            setfile({ ...fileinputs, images: files })
        }
        if (name === 'deleteImages') {
            if (checked) {
                setfile({ ...fileinputs, deleteImages: [...fileinputs.deleteImages, value] })
            } else {
                const newfn = fileinputs.deleteImages.filter((fn) => (fn !== value));
                setfile({ ...fileinputs, deleteImages: [...newfn] })
            }
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        setSpinner()
        async function fetchMyApi() {
            const data = new FormData();
            for (let i = 0; i < fileinputs.images.length; i++) {
                data.append('images', fileinputs.images[i])
            }
            for (let i = 0; i < fileinputs.deleteImages.length; i++) {
                data.append('deleteImages', fileinputs.deleteImages[i])
            }
            const res = await axios({
                method: 'put',
                url: `/api/campground/${id}/editphoto`,
                data: data
            })
            removeSpinner()

            if (res.data.success) {
                setinput(true);
                setAlert(res.data.success, 'success')
            } else {
                setAlert(res.data.error, 'danger')
                seterror(true)

            }


        }
        fetchMyApi();

    }

    function buttonClick() {
        setinput(true)
    }



    if (iserror) {
        return <Redirect to='/login' />
    }

    if (isinput) {
        return <Redirect to={`/campground/${id}/edit`} />
    }



    return (

        <Fragment>
            {isspin ? <Spin /> : <main className="container  mt-5">

                {camp && <div className="row mb-5">
                    <div className="col-md-6 offset-md-3">
                        {/* <%- include('../partials/flashAlert') %> */}
                        <Flash />
                        <Back buttonClick={buttonClick} />
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="text-center mb-4">Edit Photos</h1>
                                <form onSubmit={handleSubmit} className="needs-validation"
                                    noValidate>
                                    <div className="mb-4">
                                        <label htmlFor="formFileMultiple" className="form-label">Add more images</label>
                                        <input onChange={handleChange} className="form-control" type="file" id="formFileMultiple" name="images" multiple />
                                    </div>
                                    <div className="row">
                                        {/* <% camp.images.forEach((img,i)=>{ %> */}
                                        {camp.images && camp.images.map((img, i) => (<Fragment key={img._id}>
                                            <div className="col-4 col-xl-3 mb-3 ">
                                                <div className={img.filename === 'default' ? 'd-none' : ''}>
                                                    <div className="carousel-inner thumb">

                                                        <img className="card-img-top" src={img.thumbnail} alt="" />


                                                    </div>

                                                    <div className="card-body border-bottom">
                                                        <input onChange={handleChange} className="form-check-input" name="deleteImages" type="checkbox"
                                                            value={img.filename} id={`image-${i}`} />
                                                        <label className="form-check-label" htmlFor={`image-${i}`}>
                                                            Delete?
                                </label>

                                                    </div>
                                                </div>



                                            </div>
                                        </Fragment>))}

                                        {/* <% }) %> */}
                                    </div>

                                    <div className="text-center card-body">
                                        <button className="btn btn-primary w-md-50">Update Photos <div style={spinner} className="spinner-border spinner-border-sm" role="status" /></button>
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

Editphoto.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setSpinner: PropTypes.func.isRequired,
    removeSpinner: PropTypes.func.isRequired,
    spinner: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    spinner: state.spinner
})

export default connect(mapStateToProps, { setAlert, setSpinner, removeSpinner })(Editphoto);
