import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
//import styles from './newTask.module.scss';

class NewTask extends Component {
  render() {
    const data = this.props;

    return (
      <>
        <Form.Control
          type="text"
          className={"mb-2"}
          value={data.taskTitle}
          onChange={data.onChangeTitle}
          onKeyDown={data.onKeyDown}
          disabled={!!data.disabled}
          placeholder="Set task title"
        />
        <Form.Control
          as="textarea"
          rows={3}
          className={"mb-2"}
          value={data.taskText}
          onChange={data.onChangeValue}
          onKeyDown={data.onKeyDown}
          disabled={!!data.disabled}
          placeholder="Create new task..."
        />
        <Button
          className={"w-100"}
          variant={"success"}
          onClick={data.addTask}
          disabled={!!data.disabled}
        >
          Add Task
        </Button>
      </>
    )
  }
}

export default NewTask;