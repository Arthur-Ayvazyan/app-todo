import styles from './contact.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { sendMessage } from '../../../store/actions';

const validationErrors = {
  requiredError: 'This field is required',
  emailError: 'incorrect email'
};

function Contact({ sendMessage, messageSendSuccess }) {

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
    window.scrollTo({
      top: 0,
    });
    textInput.current.focus();
  }, []);

  useEffect(() => {
     if (messageSendSuccess) {
      setValues({
         name: '',
         email: '',
         message: '',
       });
     }

  }, [messageSendSuccess]);

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
      sendMessage(values);
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
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={8} className="mt-4">
               <h1 className="heading-1 mb-3">Contact Us</h1>
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
                     <Col className={styles.sendButtonWrapper}>
                        <Button
                           className={styles.sendButton}
                           variant="primary"
                           onClick={handleSend}
                        >
                        Send
                        </Button>
                     </Col>
                  </Row>
               </Form>
            </Col>
         </Row>
      </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    messageSendSuccess: state.messageSendSuccess,
  };
}

const mapDispatchToProps = {
  sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);