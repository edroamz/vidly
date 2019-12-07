import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/navBar';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <main className='main'>
        <div className='row mt-5'>
          <Switch>
            <Route path='/register' component={RegisterForm}></Route>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/movies/:id' component={MovieForm}></Route>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={NotFound}></Route>
            <Redirect from='/' exact to='/movies'></Redirect>
            <Redirect to='/not-found'></Redirect>
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
