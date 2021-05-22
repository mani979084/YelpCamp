import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import axios from 'axios';
import Login from './components/forms/Login'
import Register from './components/forms/Register'
import Show from './components/show'
import Edit from './components/Edit'
import Editphoto from './components/Editphoto'
import Create from './components/Create'

import Flash from './components/partials/Flash'



function App() {

  const [locals, setlocals] = useState('');

  useEffect(() => {
    async function fetchMyApi() {

      const localres = await axios.get('/locals')
      setlocals(localres.data)

    }
    fetchMyApi()
  }, [])


  function getlocals(data) {
    setlocals(data)
  }

  console.log(locals.currentUser)

  return (
    <Router>
      <Fragment>

        <Route exact path='/campground' render={() => (<Home currentUser={locals.currentUser} getlocals={getlocals} />)} />
        <Switch>
          <Route exact path='/login' render={() => (<Login currentUser={locals.currentUser} getlocals={getlocals} />)} />
          <Route exact path='/register' render={() => (<Register currentUser={locals.currentUser} getlocals={getlocals} />)} />
          <Route exact path='/campground/new' render={() => (<Create currentUser={locals.currentUser} getlocals={getlocals} />)} />

          <Route exact path='/campground/:id' render={() => (<Show currentUser={locals.currentUser} getlocals={getlocals} />)} />
          <Route exact path='/campground/:id/edit' render={() => (<Edit currentUser={locals.currentUser} getlocals={getlocals} />)} />
          <Route exact path='/campground/:id/editphoto' render={() => (<Editphoto currentUser={locals.currentUser} getlocals={getlocals} />)} />


        </Switch>


      </Fragment>
    </Router>
  );
}

export default App;
