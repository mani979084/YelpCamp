import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Navbar from '../partials/Navbar'


const Login = ({ getlocals, currentUser }) => {
    const [logdata, setlogdata] = useState({ username: '', password: '' });
    const [dataurl, seturl] = useState({ url: '/campground' });
    const [islogged, setlogged] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target
        setlogdata({ ...logdata, [name]: value })
    }
    function handleSubmit(e) {
        e.preventDefault();
        async function fetchMyApi() {

            const res = await axios({
                method: 'post',
                url: '/login',
                data: qs.stringify(logdata),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
            const localres = await axios.get('/locals')
            getlocals(localres.data)
            console.log(res.data)
            seturl({ ...dataurl, ...res.data })
            if (res.data.url) {
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
        return <Redirect to={dataurl.url} />
    }


    return (
        <Fragment>
            <Navbar currentUser={currentUser} getlocals={getlocals} />
            <main className="container mt-5">

                <div className="row">

                    <div className="col-10 offset-1 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        {/* <%- include('../partials/flashAlert') %> */}

                        <div className="card shadow">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                <div className="card-body pb-0">
                                    <h4>Login</h4>
                                </div>
                                <div className="card-body">
                                    <label className="form-label" htmlFor="username">Enter Username</label>
                                    <input onChange={handleChange} className="form-control" type="text" name="username" value={logdata.username} id="username" required />

                                    <div className="valid-feedback">
                                        Looks good!
                                </div>
                                </div>
                                <div className="card-body">
                                    <label className="form-label" htmlFor="password">Enter Password</label>
                                    <input onChange={handleChange} className="form-control" type="password" name="password" value={logdata.password} id="password" required />

                                    <div className="valid-feedback">
                                        Looks good!
                                </div>
                                </div>
                                <div className="card-body d-grid">
                                    <button className="btn btn-success">SignIn</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div></main>
        </Fragment>
    )
}

export default Login

