import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

class Task extends Component {
  render() {
    const task = this.props.data;
    const { onSelect, disabled, onDelete } = this.props
    console.log(task);
    return (
      <Card id={task.id}>
        <Card.Body>
          <Form.Check
            type="checkbox"
            onChange={() => onSelect(task.id)}
          />
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button
            variant="danger"
            onClick={() => onDelete(task.id)}
            disabled={disabled}
          >
            Delete
        </Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Task;