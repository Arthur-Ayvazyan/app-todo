import styles from './login.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authentication } from '../../../store/actions';

const validationErrors = {
  requiredError: 'This field is required',
  emailError: 'incorrect email'
};

function Login({ authentication }) {

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
      authentication(values);
      return;
    }

    if (!valuesExist && !errorsExist) {
      setErrors({
        email: requiredError,
        password: requiredError
      })
    }
  }

   return (

      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={8} className="mt-4">
            <h1 className="heading-1 mb-3">Login</h1>
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
                      type="password"
										name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col className={styles.sendButtonWrapper}>
                  <Button className={styles.sendButton} variant="primary" onClick={handleSend}>
                    Sign in
                  </Button>
                  <Link to={`/registration`} className={styles.redirectLink}>Create an account ?</Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

  )
}


const mapDispatchToProps = {
  authentication
}

export default connect(null, mapDispatchToProps)(Login);