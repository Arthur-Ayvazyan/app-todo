import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './task.module.scss';
class Task extends Component {

  state = {
    selected: false
  }

  hendleSelect = () => {
    const { onSelect, data } = this.props;
    onSelect(data.id);
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    console.log(this.props);
    console.log(styles);
    const task = this.props.data;
    const { onSelect, disabled, onDelete } = this.props;
    const { selected } = this.state;
    //console.log(task);
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
          <Card.Text>{task.text}</Card.Text>
          <Button
            variant="danger"
            onClick={() => onDelete(task.id)}
            disabled={disabled}
          >
            Delete
        </Button>
        </Card.Body>
      </Card >
    )
  }
}

export default Task;