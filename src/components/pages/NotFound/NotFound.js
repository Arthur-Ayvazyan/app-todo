import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

export default function NotFound() {

   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, []);

  return (
     <div className="content">
        <Container>
           <h1 className="heading-1">Not Found 404 page</h1>
        </Container>
     </div>
  )
}