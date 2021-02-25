import React from 'react';
import { Spinner as BSpinner } from 'react-bootstrap';
import styles from "./spinner.module.scss";

<BSpinner animation="border" role="status">
   <span className="sr-only">Loading...</span>
</BSpinner>


export default function Spinner() {
   return (
      <div className={styles.spinnerWrapper}>
         <BSpinner animation="border" role="status" className={styles.customSpinner}>
            <span className="sr-only">Loading...</span>
         </BSpinner>
      </div>
   )
}