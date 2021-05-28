import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import Flash from '../partials/Flash'
import Back from '../partials/Back';



const Register = ({ getlocals, setAlert }) => {

    const [inputs, setinputs] = useState({ email: '', username: '', password: '' });
    const [islogged, setlogged] = useState(false);
    const [isstyles, setstyle] = useState({
        display: 'none'
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setinputs({ ...inputs, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            return e.target.classList.add('was-validated')
        }
        setstyle({
            display: ''
        })
        async function fetchMyApi() {

            const res = await axios({
                method: 'post',
                url: '/api/register',
                data: qs.stringify(inputs),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
            getlocals()
            setstyle({
                display: 'none'
            })
            if (res.data.success) {
                setlogged(true)
                setAlert(res.data.success, 'success')
            } else {
                setAlert(res.data.error, 'danger')

            }

        }
        fetchMyApi();
    }

    useEffect(() => {
        async function fetchMyApi() {
            const localres = await axios.get('/api/locals')
            if (localres.data.currentUser) {
                setlogged(true)
            }

        }
        fetchMyApi();

    }, [])

    function buttonClick() {
        setlogged(true)
    }

    if (islogged) {
        return <Redirect to='/campground' />
    }

    return (
        <main className="container  mt-5">

            <div className="row mb-5">
                <div className="col-10 offset-1 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    {/* <%- include('../partials/flashAlert') %> */}
                    <Flash />
                    <Back buttonClick={buttonClick} />

                    <div className="card shadow">
                        <div className="card-body pb-0">
                            <h4>Register</h4>
                        </div>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="card-body">
                                <label className="form-label" htmlFor="email">Enter Email</label>
                                <input onChange={handleChange} className="form-control" type="email" name="email" id="email" required value={inputs.email} />
                                <div className="valid-feedback">
                                    Looks good!
                        </div>
                            </div>
                            <div className="card-body">
                                <label className="form-label" htmlFor="username">Enter Username</label>
                                <input onChange={handleChange} className="form-control" type="text" name="username" id="username" required value={inputs.username} />
                                <div className="valid-feedback">
                                    Looks good!
                        </div>
                            </div>
                            <div className="card-body">
                                <label className="form-label" htmlFor="password">Enter Password</label>
                                <input onChange={handleChange} className="form-control" type="password" name="password" id="password" required value={inputs.password} />
                                <div className="valid-feedback">
                                    Looks good!
                        </div>
                            </div>

                            <div className="card-body d-grid">
                                <button className="btn btn-success fw-bold">SignUp <div style={isstyles} className="spinner-border spinner-border-sm" role="status" /></button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);
