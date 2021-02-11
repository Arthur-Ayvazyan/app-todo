
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import styles from './navLink.module.scss';

export default function NavMenu() {
   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
               <NavLink
                  activeClassName={styles.active}
                  to="/"
                  exact
               >
                  Home
               </NavLink>
               <NavLink
                  activeClassName={styles.active}
                  to="/about"
                  exact
               >
                  About
               </NavLink>
               <NavLink
                  activeClassName={styles.active}
                  to="/contact"
                  exact
               >
                  Contact
               </NavLink>
            </Nav>
         </Navbar>
      </>
   )
}