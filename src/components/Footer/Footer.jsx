import styles from './footer.module.scss';
import React from 'react';
import { Container } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub, faGooglePlus } from '@fortawesome/free-brands-svg-icons';

library.add(faLinkedinIn, faGithub, faGooglePlus);

export default function Footer() {

   return (
      <div className={styles.footer}>
         <Container>

            <a href="https://www.linkedin.com/in/arthur-ayvazyan/" target="_blank" rel="noreferrer" className={styles.socialIcon}>
               <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://github.com/Arthur-Ayvazyan" target="_blank" rel="noreferrer" className={styles.socialIcon}>
               <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="mailto:arthur.ayvaz@gmail.com" rel="noreferrer" className={styles.socialIcon}>
               <FontAwesomeIcon icon={faGooglePlus} />
            </a>
         </Container>
      </div>

   )
}