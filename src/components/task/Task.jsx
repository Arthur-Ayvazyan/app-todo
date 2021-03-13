import styles from './task.module.scss';
import React, { PureComponent } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate, textCutter } from '../../helpers/utils';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { editTask } from '../../store/actions';

class Task extends PureComponent {

  handleSelect = () => {
    const { onSelect, task } = this.props;
    onSelect(task._id);
  }

  handleDelete = () => {
    const { onDelete, task } = this.props;
    onDelete(task._id);
  }

  handleShowEdit = () => {
    const { onShow, onEdit, task } = this.props;
    onShow();
    onEdit(task);
  }

  render() {
    const task = this.props.task;
    const { disabled, selected, editTask } = this.props;

    return (
      <Card
        className={`mb-4 ${selected ? styles.selected : ''}`}
      >
        <Card.Body>
          <Form.Check
            type="checkbox"
            onChange={this.handleSelect}
            checked={selected}
          />
          <Link to={`/task${task._id}`} className={styles.linkStyles}>
            <Card.Title>{textCutter(task.title, 30)}</Card.Title>
          </Link>
          <Card.Text>Description: {textCutter(task.description, 50)}</Card.Text>
          <Card.Text>Created at: {formatDate(task.created_at)}</Card.Text>
          <Card.Text>Date: {formatDate(task.date)}</Card.Text>
          <Card.Text>Status: {task.status}</Card.Text>
          {
            task.status === 'active' ?
              <Button
                className="m-1"
                variant="success"
                onClick={() => editTask({
                  status: 'done',
                  _id: task._id,
                })}
                disabled={disabled}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
              :
              <Button
                className="m-1"
                variant="secondary"
                onClick={() => editTask({
                  status: 'active',
                  _id: task._id,
                })}
                disabled={disabled}
              >
                <FontAwesomeIcon icon={faRedo} />
              </Button>
          }


          <Button
            className="m-1"
            variant="danger"
            onClick={this.handleDelete}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            className="m-1"
            variant="warning"
            onClick={this.handleShowEdit}
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
  onEdit: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}


const mapDispatchToProps = {
  editTask,
};

export default connect(null, mapDispatchToProps)(Task);