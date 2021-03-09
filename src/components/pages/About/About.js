import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';


export default function About() {

   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, [])

   return (
      <div className="content">
         <Container>
            <h1 className="heading-1">About Us</h1>
         </Container>
      </div>
   )
}