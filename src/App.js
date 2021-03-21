import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import ToDo from './components/pages/todo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Registration';
import NavMenu from './components/NavMenu/NavMenu';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Spinner from './components/spinner/spinner';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { history } from './helpers/history';

const toastConfig = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function App({ showSpinner, successTaskMessage, errorTaskMessage }) {

  useEffect(() => {

    if (successTaskMessage) {
      toast.success(successTaskMessage, toastConfig);
    }

    if (errorTaskMessage) {
      toast.error(errorTaskMessage, toastConfig);
    }

  }, [successTaskMessage, errorTaskMessage]);

  return (

    <div className="App">
      <Router history={history}>
        <NavMenu />
        <Switch>

          <AuthRoute
            path='/'
            component={ToDo}
                 type='private'
                 exact
            />
          <AuthRoute
            path='/home'
            component={ToDo}
                 type='private'
                 exact
            />
          <AuthRoute
            path='/task:taskId'
            component={SingleTask}
                 type='private'
                 exact
            />
          <AuthRoute
            path='/about'
            component={About}
                 exact
            />
          <AuthRoute
            path='/contact'
            component={Contact}
                 exact
            />
          <AuthRoute
            path='/login'
            component={Login}
                 type='public'
                 exact
            />
          <AuthRoute
            path='/registration'
            component={Registration}
                 type='public'
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

const mapStateToProps = (state) => {
  return {
    showSpinner: state.showSpinner,
    successTaskMessage: state.successTaskMessage,
     errorTaskMessage: state.errorTaskMessage,
  };
}

export default connect(mapStateToProps)(App);