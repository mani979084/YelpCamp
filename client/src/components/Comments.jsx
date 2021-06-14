import React, { Fragment, useState } from 'react'
import axios from 'axios';
import qs from 'qs'
import Deletespin from './partials/Deletespin';
import Map2 from './partials/Map2';
import Rating from '@material-ui/lab/Rating';



const Comments = ({ currentUser, camp, id, getcamp }) => {

    const [formin, setformin] = useState({ review: { rating: 1, comment: '' } });

    const [spin2, setspin2] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target;
        setformin({ review: { ...formin.review, [name]: value } });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            return e.target.classList.add('was-validated')
        }
        setspin2(true)
        async function fetchMyApi() {

            await axios({
                method: 'post',
                url: `/api/campground/${id}/review`,
                data: qs.stringify(formin),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
            })
            e.target.classList.remove('was-validated')
            getcamp()
            setTimeout(() => {
                setspin2(false)
            }, 1500);
            setformin({ review: { rating: 1, comment: '' } })
        }
        fetchMyApi();

    }

    function handleClick(e) {
        const { name } = e.target
        setspin2(true)
        async function fetchMyApi() {

            await axios({
                method: 'delete',
                url: `/api/campground/${id}/review/${name}`
            })
            getcamp()
            setTimeout(() => {
                setspin2(false)
            }, 1500);

        }
        fetchMyApi();
    }

    return (
        <Fragment>
            <Map2 camp={camp} />
            {currentUser && <div id='review' className="card">
                <h5 className="card-header">Leave a Comment!  </h5>
                <div className="card-body pt-0">
                    <form onSubmit={handleSubmit} className="needs-validation"
                        noValidate>
                        <div className="d-flex align-items-center">
                            <h5 className="fs-4 me-2 my-2">Star Rating</h5>

                            <Rating
                                name="rating"
                                value={formin.review.rating}
                                onChange={handleChange}
                            />

                        </div>


                        <div>
                            <textarea onChange={handleChange} className="form-control" name="comment" cols="30" rows="3" value={formin.review.comment}
                                required></textarea>

                            <div className="invalid-feedback">
                                Please enter your comments.
                            </div>
                        </div>
                        <div className='d-flex'>
                            <button className="btn btn-success mt-3">Leave comment</button>

                            <button type="button" className="btn com-bn btn-primary mt-3 ms-auto">
                                comments <span className="badge bg-light text-dark">{camp.reviews.length}</span>
                            </button>

                        </div>
                    </form>
                </div>
            </div>}


            {spin2 ? <Deletespin /> : <Fragment>
                {camp.reviews.map((review) => (
                    <div key={review._id} className="border-bottom">
                        <div className="card-body">

                            <h5 className="card-title">
                                <small className="text-muted">
                                    / {review.author.username}
                                </small>
                            </h5>

                            <Rating name="read-only" value={review.rating} readOnly />
                            <p className="card-text">

                                {review.comment}
                            </p>

                            {currentUser && review.author._id === currentUser._id &&
                                <button onClick={handleClick} name={review._id} className="btn btn-sm btn-warning">Delete </button>

                            }

                        </div>
                    </div>
                ))}

            </Fragment>}



        </Fragment>
    )
}




export default Comments
