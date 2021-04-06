import React, { useEffect } from 'react';
import { Spinner as BSpinner } from 'react-bootstrap';
import styles from "./spinner.module.scss";

export default function Spinner() {

   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "auto";
      }
   })

   return (
      <div className={styles.spinnerWrapper}>
         <BSpinner animation="border" role="status" className={styles.customSpinner}>
            <span className="sr-only">Loading...</span>
         </BSpinner>
      </div>
   )
}