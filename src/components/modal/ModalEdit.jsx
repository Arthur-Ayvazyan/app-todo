import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ModalEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props.task,
    }
  }

  setValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  editTask = () => {
    const title = this.state.title.trim();
    const discription = this.state.discription.trim();
    const id = this.state.id;
    const { onEdit } = this.props;

    if (!title) return;

    const editedTask = {
      title,
      discription,
      id,
    };
    onEdit(editedTask);
  }

  editTaskByEnter = (e) => {
    if (e.key === "Enter") {
      this.editTask();
    }
  }

  render() {
    const { onClose } = this.props;
    const { title, discription } = this.state;

    return (
      <Modal
        show={true}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Task editor
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            value={title}
            type="text"
            className={"mb-2"}
            onChange={this.setValue}
            onKeyPress={this.editTaskByEnter}
            name="title"
          />
          <Form.Control
            value={discription}
            as="textarea"
            rows={3}
            className={"mb-2"}
            onChange={this.setValue}
            onKeyPress={this.editTaskByEnter}
            name="discription"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant={"success"}
            onClick={this.editTask}
          >
            Edit
           </Button>
          <Button
            variant="warning"
            onClick={onClose}
          >Cancel</Button>
        </Modal.Footer>
      </Modal>
    )

  }
}

ModalEdit.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalEdit;