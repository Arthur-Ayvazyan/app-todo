import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
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
    this.props.addTask(task)
  }

  createTaskByEnter = (e) => {
    if (e.key === "Enter") {
      this.props.addTask(this.createTask())
    }
  }

  render() {
    const { onClose } = this.props;
    const { taskText, taskTitle } = this.state;

    return (

      <>
        <Modal
          show={true}
          onHide={onClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Task creator
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Control
              type="text"
              className={"mb-2"}
              value={taskTitle}
              onChange={this.setTitle}
              onKeyDown={this.createTaskByEnter}
              placeholder="Set task title"
            />
            <Form.Control
              as="textarea"
              rows={3}
              className={"mb-2"}
              value={taskText}
              onChange={this.setValue}
              onKeyDown={this.createTaskByEnter}
              placeholder="Create new task..."
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant={"success"}
              onClick={this.createTask}
            >
              Add Task
           </Button>
            <Button
              variant="warning"
              onClick={onClose}
            >Cencel</Button>
          </Modal.Footer>

        </Modal>
      </>

    )
  }
}

NewTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default NewTask;