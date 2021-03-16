import styles from './registration.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registration } from '../../../store/actions';

const validationErrors = {
  requiredError: 'This field is required',
  emailError: 'Incorrect email',
  passwordError: 'Your password must be at least 8 characters',
  confirmPasswordError: 'Your password and confirmation password do not match',
};

function Registration({ registration }) {

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const textInput = useRef();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    textInput.current.focus();
  }, []);

  const handleChange = ({ target: { name, value } }) => {

    const { requiredError, emailError, passwordError, confirmPasswordError } = validationErrors;

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

    if (name === "password" && value) {
      const confirmPassword = values.confirmPassword;
      if (confirmPassword && confirmPasswordError) {
        if (value === confirmPassword) {
          setErrors({
            ...errors,
            confirmPassword: null
          })
        }

        else {
          setErrors({
            ...errors,
            confirmPassword: confirmPasswordError
          })
        }
      }

      if (value.length < 8) {
        setErrors({
          ...errors,
          password: passwordError
        })

      }
    }

    if (name === "confirmPassword" && value) {
      const password = values.password;
      if (value !== password) {
        setErrors({
          ...errors,
          confirmPassword: confirmPasswordError
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
      registration(values)
      return;
    }

    if (!valuesExist && !errorsExist) {
      if (!values.email) {
        setErrors({
          name: requiredError,
          surname: requiredError,
          email: requiredError,
          password: requiredError,
          confirmPassword: requiredError,
        })
      }
    }
  }

  return (
    <div className="content">
      <Container>
        <h1 className="heading-1">Registration</h1>
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
                      onChange={handleChange}
                      name="name"
                    />
                    <Form.Text className="text-danger">
                      {errors.name}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      className={errors.surname ? styles.invalidInput : ''}
                      type="text"
                      placeholder="Enter surname"
                      value={values.surname}
                      onChange={handleChange}
                      name="surname"
                    />
                    <Form.Text className="text-danger">
                      {errors.surname}
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className={errors.password ? styles.invalidInput : ''}
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
                  <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      className={errors.confirmPassword ? styles.invalidInput : ''}
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-danger">
                      {errors.confirmPassword}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Button className="w-20" size="lg" variant="primary" onClick={handleSend}>
                    Send
                  </Button>
                </Col>
                <Link to={`/login`} className="text-right">Go to log in page</Link>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div >

  )
}

const mapDispatchToProps = {
  registration
}

export default connect(null, mapDispatchToProps)(Registration);