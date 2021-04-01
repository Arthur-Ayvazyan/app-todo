import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from './navLink.module.scss';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions";

function NavMenu({ isAuthenticated, signOut }) {

   const logOut = (e) => {
      e.preventDefault();
      signOut();
   }

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
                          <div className={styles.linkWrapper}>
                             <NavLink
                                className={styles.linkStyles}
                                to="/login"
                                onClick={(e) => logOut(e)}
                             >
                                Log out
                                
                            </NavLink>
                          </div>
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

const mapDispatchToProps = {
   signOut
 }
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);