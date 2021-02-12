import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Contact() {

   const [formValues, setFormValues] = useState({
      name: '',
      email: '',
      message: ''
   });

   const textInput = useRef();

   useEffect(() => {
      textInput.current.focus();
   }, []);

   const handleChange = (event) => {
      setFormValues({
         ...formValues,
         [event.target.name]: event.target.value

      })
   };

   const handleSend = () => {

      const { name, email, message } = formValues;

      if (!(name && email && message)) {
         alert('empty field(s)');
         return;
      }

      fetch('http://localhost:3001/form', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formValues),
      })
         .then(async (response) => {

            const res = await response.json();

            if (response.status >= 400 && response.status < 600) {
               if (res.error) {
                  throw res.error;
               }
            }
            setFormValues({
               name: '',
               email: '',
               message: '',
            });
            alert('sent succesfully');
         })
         .catch((error) => {
            alert('email error');
            console.log('error', error);
         });
   };

   return (
      <div>
         <h1>Contact Us Page</h1>
         <Row className="justify-content-center">
            <Col xs={10}>
               <Form>
                  <Row className="flex-column justify-content-end">
                     <Col>
                        <Form.Group>
                           <Form.Label>Name</Form.Label>
                           <Form.Control
                              ref={textInput}
                              type="text"
                              placeholder="Enter name"
                              value={formValues.name}
                              onChange={handleChange} name="name"
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group>
                           <Form.Label>Email address</Form.Label>
                           <Form.Control
                              type="email"
                              name="email"
                              placeholder="Enter email"
                              value={formValues.email}
                              onChange={handleChange}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group>
                           <Form.Label>Message</Form.Label>
                           <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter message"
                              value={formValues.message}
                              name="message"
                              onChange={handleChange}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Button className="w-20" size="lg" variant="primary" onClick={handleSend}>
                           Send
                        </Button>
                     </Col>
                  </Row>



               </Form>
            </Col>
         </Row>
      </div >

   )
}