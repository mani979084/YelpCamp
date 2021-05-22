import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Navbar from '../partials/Navbar'

const Register = ({ currentUser, getlocals }) => {

    const [inputs, setinputs] = useState({ email: '', username: '', password: '' });
    const [islogged, setlogged] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setinputs({ ...inputs, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        async function fetchMyApi() {

            const res = await axios({
                method: 'post',
                url: '/register',
                data: qs.stringify(inputs),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
            const localres = await axios.get('/locals')
            getlocals(localres.data)
            console.log(res.data)
            if (res.data.success) {
                setlogged(true)
            }

        }
        fetchMyApi();
    }

    useEffect(() => {
        async function fetchMyApi() {
            const localres = await axios.get('/locals')
            if (localres.data.currentUser) {
                setlogged(true)
            }

        }
        fetchMyApi();

    }, [])

    if (islogged) {
        return <Redirect to='/campground' />
    }

    return (<Fragment>
        <Navbar currentUser={currentUser} getlocals={getlocals} />
        <main className="container mt-5">

            <div className="row">
                <div className="col-10 offset-1 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    {/* <%- include('../partials/flashAlert') %> */}


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
                                <button className="btn btn-success">SignUp</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div></main>
    </Fragment>
    )
}

export default Register;
