import React, { Component, createRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../../helpers/utils';
import { connect } from 'react-redux';
import { editTask } from '../../store/actions';


class ModalEdit extends Component {

  constructor(props) {
    super(props);
    const { date } = props.task;

    this.textInput = createRef();

    this.state = {
      ...props.task,
      date: date ? new Date(date) : new Date()
    }
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  setValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  setDateValue = (value) => {
    this.setState({
      date: value || new Date()
    })
  }

  editTask = () => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    const { _id, date } = this.state;

    if (!title) return;

    const editedTask = {
      title,
      description,
      _id,
      date: formatDate(date.toISOString())
    };
    this.props.editTask(editedTask);
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
            ref={this.textInput}
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
          <DatePicker
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.setDateValue}
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
  onClose: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  editTask,
}

export default connect(null, mapDispatchToProps)(ModalEdit);