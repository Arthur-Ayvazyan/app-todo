import './about.scss';
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


export default function About() {

   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, [])

   return (

      <Container>
         <Row className="justify-content-center">
            <Col sm={12} md={8} className="mt-4">
               <h1 className="heading-1">About</h1>
               <div className="about-block fuctionality">
                  <h4 className="about-block__heading">Fuctionality</h4>
                  <p className="about-block__text">
                     A simple, but usable tool for keeping your to-do lists and tasks tidy and organized. You can create, delete, edit your tasks, marks as done, for more advanced users we have a filter option which can help find the needed task.
               </p>
               </div>
               <div className="about-block technologies">
                  <h4 className="about-block__heading">Technologies</h4>
                  <p className="about-block__text">
                     This SPA was build by modern technologies such as <a href="https://sass-lang.com/" target="_blank" rel="noreferrer" className="technology technology--sass">Sass</a>, <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer" className="technology technology--bootstrap">bootstrap</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer" className="technology technology--javascript">JavaScript</a>, <a href="https://reactjs.org/" target="_blank" rel="noreferrer" className="technology technology--react">React.js</a>, <a href="https://redux.js.org/" target="_blank" rel="noreferrer" className="technology technology--redux">Redux</a>, <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer" className="technology technology--node">Node.js</a>, <a href="http://expressjs.com/" target="_blank" rel="noreferrer" className="technology technology--express">Express.js</a>.
                  </p>
               </div>

            </Col>
         </Row>
      </Container>

   )
}