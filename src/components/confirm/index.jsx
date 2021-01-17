import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Confirm(props) {

  return (
    <Modal
      show={true}
      onHide={props.onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you shure to delete {props.deletableTasksSize} task(s) ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onDeleteTasks}>delete</Button>
        <Button onClick={props.onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

Confirm.prototype = {
  onClose: PropTypes.func,
  onDeleteTasks: PropTypes.func,
  deletableTasksSize: PropTypes.number,
}

export default Confirm;