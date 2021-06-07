import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { setAlert } from '../../actions/alert'
import { setSpinner, removeSpinner } from '../../actions/spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Flash from '../partials/Flash'
import Back from '../partials/Back';



const Login = ({ getlocals, setAlert, setSpinner, removeSpinner, spinner }) => {
    const [logdata, setlogdata] = useState({ username: '', password: '' });
    const [dataurl, seturl] = useState({ url: '/campground' });
    const [islogged, setlogged] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target
        setlogdata({ ...logdata, [name]: value })
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            return e.target.classList.add('was-validated')
        }
        setSpinner()
        async function fetchMyApi() {

            const res = await axios({
                method: 'post',
                url: '/api/login',
                data: qs.stringify(logdata),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
            getlocals()
            seturl({ ...dataurl, ...res.data })
            removeSpinner()
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
        return <Redirect to={dataurl.url} />
    }


    return (
        <Fragment>
            <main className="container  mt-5">

                <div className="row mb-5">

                    <div className="col-10 offset-1 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <Flash />
                        <Back buttonClick={buttonClick} />

                        <div className="card shadow">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                <div className="card-body pb-0 ">
                                    <h4>Login </h4>

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
                                    <button className="btn btn-success fw-bold">SignIn <div style={spinner} className="spinner-border spinner-border-sm" role="status" /></button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setSpinner: PropTypes.func.isRequired,
    removeSpinner: PropTypes.func.isRequired,
    spinner: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    spinner: state.spinner
})

export default connect(mapStateToProps, { setAlert, setSpinner, removeSpinner })(Login)

