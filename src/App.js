import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/pages/todo/ToDo';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import { Container } from 'react-bootstrap';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {

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

      </div>
   );
}


export default App;
