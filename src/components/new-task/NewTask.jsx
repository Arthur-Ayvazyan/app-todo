import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

class NewTask extends Component {

  state = {
    title: '',
    discription: '',
  }

  setValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  createTask = () => {
    const title = this.state.title.trim();
    const discription = this.state.discription.trim();
    if (!title || !discription) return;

    const task = {
      title,
      discription,
      id: idGenerator(),
    };
    this.props.addTask(task);

  }

  createTaskByEnter = (e) => {
    if (e.key === "Enter") {
      this.createTask();
    }
  }

  render() {

    const { onClose } = this.props;
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
              onChange={this.setValue}
              onKeyPress={this.createTaskByEnter}
              placeholder="Set task title"
              name="title"
            />
            <Form.Control
              as="textarea"
              rows={3}
              className={"mb-2"}
              onChange={this.setValue}
              onKeyPress={this.createTaskByEnter}
              placeholder="Create new task..."
              name="discription"
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
            >
              Cancel
            </Button>
          </Modal.Footer>

        </Modal>
      </>
    )

  }
}

NewTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

}

export default NewTask;