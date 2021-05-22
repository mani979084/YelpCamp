import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './partials/Navbar'


const Editphoto = ({ getlocals, currentUser }) => {

    const { id } = useParams()
    const [camp, setcamp] = useState();
    const [isinput, setinput] = useState(false);
    const [fileinputs, setfile] = useState({ images: [], deleteImages: [] });


    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/campground/${id}/edit`)
            setcamp(res.data)
        }

        fetch();
    }, [])



    if (camp && camp.error) {
        console.log(camp.error)
        return <Redirect to={'/campground'} />
    }


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
        async function fetchMyApi() {
            const data = new FormData();
            for (var i = 0; i < fileinputs.images.length; i++) {
                data.append('images', fileinputs.images[i])
            }
            for (var i = 0; i < fileinputs.deleteImages.length; i++) {
                data.append('deleteImages', fileinputs.deleteImages[i])
            }
            const res = await axios({
                method: 'put',
                url: `/campground/${id}/editphoto`,
                data: data
            })
            console.log(res.data)
            setinput(true);


        }
        fetchMyApi();

    }

    if (isinput) {
        return <Redirect to={`/campground/${id}`} />
    }

    const styles = {

        width: 'auto',
        height: '100px',
        maxHeight: '100px',
        display: 'flex',
        alignItems: 'center'

    }

    return (

        <Fragment>
            <Navbar currentUser={currentUser} getlocals={getlocals} />
            <main className="container mt-5">

                {camp && <div className="row mb-5">
                    <div className="col-md-6 offset-md-3">
                        {/* <%- include('../partials/flashAlert') %> */}

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
                                        {camp.images.map((img, i) => (<Fragment key={img._id}>
                                            <div className="col-4 col-xl-3 mb-3 ">
                                                <div className={img.filename === 'default' ? 'd-none' : ''}>
                                                    <div className="carousel-inner" style={styles}>

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
                                        <button className="btn btn-primary w-50">Update Photos</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
            </main>
        </Fragment>
    )
}

export default Editphoto;
