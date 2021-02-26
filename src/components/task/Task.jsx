import React, { PureComponent } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './task.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate, textCutter } from '../../helpers/utils';
import { Link } from 'react-router-dom';

class Task extends PureComponent {

  hendleSelect = () => {
    const { onSelect, task } = this.props;
    onSelect(task._id);
  }

  hendleDelete = () => {
    const { onDelete, task } = this.props;
    onDelete(task._id);
  }

  hendleShowEdit = () => {
    const { onShow, onEdit, task } = this.props;
    onShow();
    onEdit(task);
  }

  render() {
    const task = this.props.task;
    const { disabled, selected } = this.props;

    return (
      <Card
        className={`mb-4 ${selected ? styles.selected : ''}`}
      >
        <Card.Body>
          <Form.Check
            type="checkbox"
            onChange={this.hendleSelect}
            checked={selected}
          />
             <Link to={`/task${task._id}`} className={styles.linkStyles}>
            <Card.Title>{textCutter(task.title, 30)}</Card.Title>
          </Link>
          <Card.Text>Description: {textCutter(task.description, 50)}</Card.Text>
          <Card.Text>
            Date: {formatDate(task.date)}
          </Card.Text>
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
  onEdit: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default Task;