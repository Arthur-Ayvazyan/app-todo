import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './task.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

class Task extends Component {

  state = {
    selected: false
  }

  hendleSelect = () => {
    const { onSelect, task } = this.props;
    onSelect(task.id);

    this.setState({
      selected: !this.state.selected
    })
  }

  hendleDelete = () => {
    const { onDelete, task } = this.props;
    onDelete(task.id);
  }

  hendleShowEdit = () => {
    const { onShow, onEdit, task } = this.props;
    onShow();
    onEdit(task);
  }

  render() {
    const task = this.props.task;
    const { disabled } = this.props;
    const { selected } = this.state;

    return (
      <Card
        className={`mb-4 ${selected ? styles.selected : ''}`}
      >
        <Card.Body>
          <Form.Check
            type="checkbox"
            onChange={this.hendleSelect}
          />
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.discription}</Card.Text>
          <Button
            className="m-1"
            variant="danger"
            onClick={this.hendleDelete}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            className="m-1"
            variant="warning"
            onClick={this.hendleShowEdit}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Card.Body>
      </Card >
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Task;