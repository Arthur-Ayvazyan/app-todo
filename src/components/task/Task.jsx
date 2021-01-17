import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './task.module.scss';
import PropTypes from 'prop-types';

class Task extends Component {

  state = {
    selected: false
  }

  hendleSelect = () => {
    const { onSelect, data } = this.props;
    onSelect(data.id);

    this.setState({
      selected: !this.state.selected
    })
  }

  hendleDelete = () => {
    const { onDelete, data } = this.props;
    onDelete(data.id);
  }

  render() {
    const task = this.props.data;
    const { disabled } = this.props;
    const { selected } = this.state;

    return (
      <Card
        className={`mb-4 ${selected ? styles.selected : ''}`}
      >
        <Card.Body>
          <Form.Check
            type="checkbox"
            onChange={this.hendleSelect}
          />
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button
            variant="danger"
            onClick={this.hendleDelete}
            disabled={disabled}
          >
            Delete
        </Button>
        </Card.Body>
      </Card >
    )
  }
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Task;