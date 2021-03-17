import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from './navLink.module.scss';
import { connect } from 'react-redux';

function NavMenu({ isAuthenticated }) {
  return (
    <>
      <div className={styles.menuWrapper}>
        <Container className={styles.heightAuto}>
          <Navbar className={styles.navbarStyles}>
            <Nav className="w-100 justify-content-between">
                    {
                       isAuthenticated &&
                  <div className={styles.linkWrapper}>
                  <NavLink
                    className={styles.linkStyles}
                    activeClassName={styles.active}
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </div>
                    }

              <div className={styles.linkWrapper}>
                <NavLink
                  className={styles.linkStyles}
                  activeClassName={styles.active}
                  to="/about"
                  exact
                >
                  About
               </NavLink>
              </div>
              <div className={styles.linkWrapper}>
                <NavLink
                  className={styles.linkStyles}
                  activeClassName={styles.active}
                  to="/contact"
                  exact
                >
                  Contact
                </NavLink>
              </div>
                    {
                       isAuthenticated
                          ?
                          <Button >Log out</Button>
                          //  <div className={styles.linkWrapper}>
                          //     <NavLink
                          //        className={styles.linkStyles}
                          //        activeClassName={styles.active}
                          //        to="/login"
                          //        exact
                          //     >
                          //        Log out
                          //      </NavLink>
                          //  </div>
                          : <>
                              <div className={styles.linkWrapper}>
                                 <NavLink
                                    className={styles.linkStyles}
                                    activeClassName={styles.active}
                                    to="/login"
                                    exact
                                 >
                                 login
                                 </NavLink>
                              </div>
                              <div className={styles.linkWrapper}>
                                 <NavLink
                                    className={styles.linkStyles}
                                    activeClassName={styles.active}
                                    to="/registration"
                                    exact
                                 >
                                    registration
                              </NavLink>
                              </div>
                          </>
                    }


            </Nav>
          </Navbar>
        </Container>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.isAuthenticated,
   };
}

export default connect(mapStateToProps)(NavMenu);