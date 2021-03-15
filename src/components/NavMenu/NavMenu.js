
import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from './navLink.module.scss';

export default function NavMenu() {
  return (
    <>
      <div className={styles.menuWrapper}>
        <Container className={styles.heightAuto}>
          <Navbar className={styles.navbarStyles}>
            <Nav className="w-100 justify-content-between">
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

            </Nav>
          </Navbar>
        </Container>
      </div>
    </>
  )
}