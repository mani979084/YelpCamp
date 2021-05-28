import React, { Fragment, useState } from 'react'
import axios from 'axios';
import qs from 'qs'
import Deletespin from './partials/Deletespin';



const Comments = ({ currentUser, camp, id, getcamp }) => {

    const [formin, setformin] = useState({ review: { rating: 5, comment: '' } });
    const [spin1, setspin1] = useState({
        display: 'none'
    })
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
        setspin1({ display: '' })
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
            setTimeout(() => {
                setspin1({ display: 'none' })
            }, 1000);
            getcamp()
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
            }, 1000);

        }
        fetchMyApi();
    }
    // /campground/<%=camp._id %>/review/<%=review._id

    return (
        <Fragment>
            <div id='map1' className="mb-3 map2"></div>

            {currentUser && <div id='review' className="card">
                <h5 className="card-header">Leave a Comment!  </h5>
                <div className="card-body pt-0">
                    <form onSubmit={handleSubmit} className="needs-validation"
                        noValidate>
                        <div className="d-flex d-inline">
                            <div className="d-flex align-items-center">
                                <h5 className="fs-4 me-2 mb-0">Star Rating</h5>

                            </div>
                            <fieldset className="starability-basic">

                                <input onChange={handleChange} type="radio" id="first-rate1" name="rating" value="1" />
                                <label htmlFor="first-rate1" title="Terrible">1 star</label>
                                <input onChange={handleChange} type="radio" id="first-rate2" name="rating" value="2" />
                                <label htmlFor="first-rate2" title="Not good">2 stars</label>
                                <input onChange={handleChange} type="radio" id="first-rate3" name="rating" value="3" />
                                <label htmlFor="first-rate3" title="Average">3 stars</label>
                                <input onChange={handleChange} type="radio" id="first-rate4" name="rating" value="4" />
                                <label htmlFor="first-rate4" title="Very good">4 stars</label>
                                <input onChange={handleChange} type="radio" id="first-rate5" name="rating" value="5" />
                                <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                            </fieldset>
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
                            <button className='mt-3 trans'><div style={spin1} className="spinner-border spinner-border-sm text-success" role="status" /></button>

                            <button type="button" className="btn com-bn btn-primary mt-3 ms-auto">
                                comments <span className="badge bg-light text-dark">{camp.reviews.length}</span>
                            </button>

                        </div>
                    </form>
                </div>
            </div>}

            {/* <% } %> */}
            {/* <%for(let review of camp.reviews){%> */}

            {spin2 ? <Deletespin /> : <Fragment>
                {camp.reviews.map((review) => (
                    <div key={review._id} className="border-bottom">
                        <div className="card-body">

                            <h5 className="card-title">
                                <small className="text-muted">
                                    / {review.author.username}
                                </small>
                            </h5>

                            <p className="starability-result" data-rating={review.rating}>
                                Rated: {review.rating}stars
                        </p>
                            <p className="card-text">

                                {review.comment}
                            </p>
                            {/* <% if(currentUser && review.author.equals(currentUser._id)){ %> */}
                            {currentUser && review.author._id === currentUser._id &&
                                <button onClick={handleClick} name={review._id} className="btn btn-sm btn-warning">Delete </button>

                            }

                            {/* <% } %> */}
                        </div>
                    </div>
                ))}
            </Fragment>}


        </Fragment>
    )
}




export default Comments
