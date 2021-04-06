import styles from './navLink.module.scss';
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions";

function NavMenu({ isAuthenticated, signOut, user }) {
  
  const [burger, switchBurger] = useState(false);

  useEffect(() => {
    
    if(burger) {
      document.body.style.overflow = "hidden";
    }
    else{
      document.body.style.overflow = "auto";
    }
    
  }, [burger]);
  
  const handleBurger = () => switchBurger(!burger);

  const logOut = (e) => {
    e.preventDefault();
    signOut();
    handleBurger();
  }

  return (
    <>
      <div className={styles.menuWrapper}>
        <div
          className={ `${styles.iconMenu} ${burger ? styles.iconMenuActive : ''}`}
          onClick={handleBurger}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Container className={`${styles.heightAuto} ${styles.menu} ${burger ? styles.menuActive : ''}` }>
        
          <Navbar className={styles.navbarContainer}>
            <Nav className={`w-100 ${styles.navbarStyles}` }>

              <div className={` ${styles.linkWrapper} ${styles.user} `}>
                <div className={styles.linkStyles} >
                    {user ? `${user.name} ${user.surname}` :  `Organize your life`}
                </div>
              </div>
              
              {
                  isAuthenticated &&
                  <div className={styles.linkWrapper}>
                      <NavLink
                        className={styles.linkStyles}
                        activeClassName={styles.active}
                        to="/"
                        exact
                        onClick={handleBurger}
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
                  onClick={handleBurger}
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
                  onClick={handleBurger}
                >
                  Contact
                </NavLink>
              </div>
              
              {
                  isAuthenticated
                    ?
                    <>
                    <div className={styles.linkWrapper}>
                        <NavLink
                          className={styles.linkStyles}
                          to="/login"
                          onClick={(e) => logOut(e)}
                        >
                          Log out
                          
                      </NavLink>
                    </div>

                    </>
                    
                    : <>
                    
                        <div className={styles.linkWrapper}>
                            <NavLink
                              className={styles.linkStyles}
                              activeClassName={styles.active}
                              to="/login"
                              exact
                              onClick={handleBurger}
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
                              onClick={handleBurger}
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
      user: state.user,
   };
}

const mapDispatchToProps = {
   signOut
 }
 
export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);