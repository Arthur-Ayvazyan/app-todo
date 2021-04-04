import React, { useState, useEffect } from 'react';
import styles from './navLink.module.scss';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions";

function NavMenu({ isAuthenticated, signOut }) {

  const [burger, switchBurger] = useState(false);

  
  useEffect(() => {
    
    if(burger) {
      document.body.style.overflow = "hidden";
    }
    else{
      document.body.style.overflow = "auto";
    }
    
  }, [burger]);
  
  const handleBuger = () => switchBurger(!burger);

  const logOut = (e) => {
    e.preventDefault();
    signOut();
    handleBuger();
  }

  return (
    <>
      <div className={styles.menuWrapper}>
        <div
          className={ `${styles.iconMenu} ${burger ? styles.iconMenuActive : ''}`}
          onClick={handleBuger}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Container className={`${styles.heightAuto} ${styles.menu} ${burger ? styles.menuActive : ''}` }>
        
          <Navbar className={styles.navbarContainer}>
            <Nav className={`w-100 justify-content-between ${styles.navbarStyles}` }>

                    {
                       isAuthenticated &&
                        <div className={styles.linkWrapper}>
                           <NavLink
                              className={styles.linkStyles}
                              activeClassName={styles.active}
                              to="/"
                              exact
                              onClick={handleBuger}
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
                  onClick={handleBuger}
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
                  onClick={handleBuger}
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
                                    onClick={handleBuger}
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
                                    onClick={handleBuger}
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