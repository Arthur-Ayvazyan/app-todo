import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

class Task extends Component {
  render() {
    const { id, taskTitle, taskText, selectTasks, deleteCurrentTask, disableTask } = this.props;
    return (
      <Card>
        <Card.Body>
          <Form.Check
            type="checkbox"
            id={id}
            onChange={selectTasks}
          />
          <Card.Title>{taskTitle}</Card.Title>
          <Card.Text>{taskText}</Card.Text>
          <Button
            variant="danger"
            onClick={deleteCurrentTask}
            disabled={disableTask}>
            remove
        </Button>
        </Card.Body>
      </Card>
    )
  }
}

export default Task;