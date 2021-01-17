import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

class NewTask extends Component {
  state = {
    taskText: '',
    taskTitle: '',
  }

  setValue = (e) => {
    this.setState({
      taskText: e.target.value,
    });
  }

  setTitle = (e) => {
    this.setState({
      taskTitle: e.target.value,
    });
  }

  createTask = () => {
    const taskText = this.state.taskText.trim();
    const taskTitle = this.state.taskTitle.trim();
    if (!taskText || !taskTitle) return;
    const task = {
      title: taskTitle,
      text: taskText,
      id: idGenerator(),
    };
    this.setState({
      taskText: '',
      taskTitle: ''
    });

    this.props.addTask(task)
  }

  createTaskByEnter = (e) => {
    if (e.key === "Enter") {
      this.props.addTask(this.createTask())
    }
  }

  render() {
    const { disabled } = this.props;
    const { taskText, taskTitle } = this.state;

    return (
      <>
        <Form.Control
          type="text"
          className={"mb-2"}
          value={taskTitle}
          onChange={this.setTitle}
          onKeyDown={this.createTaskByEnter}
          disabled={disabled}
          placeholder="Set task title"
        />
        <Form.Control
          as="textarea"
          rows={3}
          className={"mb-2"}
          value={taskText}
          onChange={this.setValue}
          onKeyDown={this.createTaskByEnter}
          disabled={disabled}
          placeholder="Create new task..."
        />
        <Button
          className={"w-100"}
          variant={"success"}
          onClick={this.createTask}
          disabled={disabled}
        >
          Add Task
        </Button>
      </>
    )
  }
}

NewTask.propTypes = {
  addTask: PropTypes.func,
  disabled: PropTypes.bool,
}

export default NewTask;