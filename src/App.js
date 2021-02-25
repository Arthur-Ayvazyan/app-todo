import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pages/todo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import NavMenu from './components/NavMenu/NavMenu';
import { Container } from 'react-bootstrap';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Spinner from './components/spinner/spinner';
import { connect } from 'react-redux';

function App({ showSpinner }) {

   return (

      <div className="App">
         <Container>
            <BrowserRouter>
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

            </BrowserRouter>
         </Container>
         {
            showSpinner && <Spinner />

         }
      </div >
   );
}

const mapSateToProps = (state) => {
   return {
      showSpinner: state.showSpinner
   };
}

export default connect(mapSateToProps, null)(App);