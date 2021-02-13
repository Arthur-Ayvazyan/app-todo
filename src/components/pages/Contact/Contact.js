import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from './contact.module.scss';

const validationErrors = {
  requiredError: 'This field is required',
  emailError: 'incorrect email'
};

export default function Contact() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null
  });

  const textInput = useRef();

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleChange = ({ target: { name, value } }) => {

    const { requiredError, emailError } = validationErrors;

    if (!value) {
      setErrors({
        ...errors,
        [name]: requiredError
      })
    }
    else {
      setErrors({
        ...errors,
        [name]: null
      })
    }

    if (name === "email" && value) {

      const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailPattern.test(value)) {
        setErrors({
          ...errors,
          email: emailError
        })
      }
    }

    setValues({
      ...values,
      [name]: value
    })

  };

  const handleSend = () => {

    const { requiredError } = validationErrors;
    const errorArr = Object.values(errors);
    const valuesArr = Object.values(values);
    const trimedValues = valuesArr.map(value => value.trim());
    const errorsExist = errorArr.some(error => error !== null);
    const valuesExist = trimedValues.every(value => value !== '');
    if (valuesExist && !errorsExist) {
      fetch('http://localhost:3001/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          const res = await response.json();
          if (response.status >= 400 && response.status < 600) {
            if (res.error) {
              throw res.error;
            }
          }
          setValues({
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
      return;
    }

    if (!valuesExist && !errorsExist) {
      if (!values.email) {
        setErrors({
          name: requiredError,
          email: requiredError,
          message: requiredError
        })
      }
    }
  }

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
                    className={errors.name ? styles.invalidInput : ''}
                    ref={textInput}
                    type="text"
                    placeholder="Enter name"
                    value={values.name}
                    onChange={handleChange} name="name"
                  />
                  <Form.Text className="text-danger">
                    {errors.name}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className={errors.email ? styles.invalidInput : ''}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    {errors.email}
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    className={errors.message ? styles.invalidInput : ''}
                    as="textarea"
                    rows={3}
                    placeholder="Enter message"
                    value={values.message}
                    name="message"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-danger">
                    {errors.message}
                  </Form.Text>
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