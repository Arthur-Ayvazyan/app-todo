import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import ToDo from './components/pages/todo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NavMenu from './components/NavMenu/NavMenu';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './components/spinner/spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { history } from './helpers/history';

function App({ showSpinner, successTaskMessage, errorTaskMessage }) {

  useEffect(() => {
    if (successTaskMessage) {
      toast.success(successTaskMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (errorTaskMessage) {
      toast.error(errorTaskMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }, [successTaskMessage, errorTaskMessage]);

  return (

    <div className="App">
      <Router history={history}>
        <NavMenu />
        <Switch>
          <Route
            path='/'
            component={ToDo}
            exact
          />
          <Route
            path='/home'
            component={ToDo}
            exact
          />
          <Route
            path='/task:taskId'
            component={SingleTask}
            exact
          />
          <Route
            path='/about'
            component={About}
            exact
          />
          <Route
            path='/contact'
            component={Contact}
            exact
          />
          <Route
            path='/not-found'
            component={NotFound}
            exact
          />
          <Redirect to='/not-found' />

        </Switch>

      </Router>
      {
        showSpinner && <Spinner />

      }
      <ToastContainer />
    </div >
  );
}

const mapSateToProps = (state) => {
  return {
    showSpinner: state.showSpinner,
    successTaskMessage: state.successTaskMessage,
    errorTaskMessage: state.errorTaskMessage,

  };
}

export default connect(mapSateToProps)(App);