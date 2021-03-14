import styles from './login.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const validationErrors = {
  requiredError: 'This field is required',
  emailError: 'incorrect email'
};

export default function Login() {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null
  });

  const textInput = useRef();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
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
      fetch('http://localhost:3001/sign-in', {
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
            email: '',
            password: '',
          });
          alert('sent succesfully');
        })
        .catch((error) => {
          alert('incorrect email or password');
          console.log('error', error);
        });
      return;
    }

    if (!valuesExist && !errorsExist) {
      if (!values.email) {
        setErrors({
          email: requiredError,
          password: requiredError
        })
      }
    }
  }

  return (
    <div className="content">
      <Container>
        <h1 className="heading-1">Login</h1>
        <Row className="justify-content-center">
          <Col xs={10}>
            <Form>
              <Row className="flex-column justify-content-end">
                <Col>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      className={errors.email ? styles.invalidInput : ''}
                      ref={textInput}
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
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      className={errors.password ? styles.invalidInput : ''}
                      ref={textInput}
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Button className="w-20" size="lg" variant="primary" onClick={handleSend}>
                    Send
                  </Button>
                </Col>
                <Link to={`/registration`} className="text-right">Go to registration page</Link>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div >

  )
}