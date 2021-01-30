import React, { PureComponent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ModalEdit extends PureComponent {

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
    const description = this.state.description.trim();
    const { _id } = this.state;
    const { onEdit } = this.props;

    if (!title) return;

    const editedTask = {
      title,
      description,
      _id
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
    const { title, description } = this.state;

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
            value={description}
            as="textarea"
            rows={3}
            className={"mb-2"}
            onChange={this.setValue}
            onKeyPress={this.editTaskByEnter}
            name="description"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant={"success"}
            onClick={this.editTask}
          >
            Save
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