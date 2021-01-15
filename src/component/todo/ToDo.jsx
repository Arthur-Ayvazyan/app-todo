import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class ToDo extends Component {

  state = {
    taskText: '',
    taskTitle: '',
    arrTasks: [],
    arrChecked: [],
    taskIds: []

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

  addTask = () => {
    const taskText = this.state.taskText.trim();
    const taskTitle = this.state.taskTitle.trim();
    if (!taskText || !taskTitle) return;
    const task = {
      title: taskText,
      text: taskTitle,
      id: idGenerator(),
    };
    this.setState({
      arrTasks: [...this.state.arrTasks, task],
      taskTitle: '',
      taskText: '',
    });

  }

  checkDone = (e, taskId) => {
    const { arrChecked } = this.state;
    let copyChecked = [...arrChecked];
    if (e.target.checked) {
      this.setState({
        arrChecked: [...copyChecked, taskId],
      });
      return;
    }
    copyChecked = arrChecked.filter((elem) => {
      return elem !== taskId;
    })
    this.setState({
      arrChecked: copyChecked,
    });
  }

  removeCurrentTask = (taskId) => {
    const { arrTasks, arrChecked } = this.state;
    const copyArrTasks = arrTasks.filter((task) => {
      return taskId !== task.id;
    });
    const copyArrChecked = arrChecked.filter((task) => {
      return task !== taskId;
    });
    this.setState({
      arrTasks: copyArrTasks,
      arrChecked: copyArrChecked
    });
  }

  resetAllTasks = () => {
    this.setState({
      arrTasks: [],
      arrChecked: [],
      taskTitle: '',
      taskText: '',
    });
  }

  resetCheckedTasks = () => {
    const { arrTasks, arrChecked } = this.state;
    if (arrChecked.length === 0) return;
    const restArrTasks = arrTasks.filter((task) => {
      return !arrChecked.includes(task.id);
    })
    this.setState({
      arrTasks: [...restArrTasks],
      arrChecked: []
    });
  }

  render() {

    const { taskText, taskTitle, arrTasks } = this.state;
    const list = arrTasks.map((task, index) => {
      return (
        <Col xs={3} id={task.id} key={task.id} className="todo__list" >
          <Card>
            <Card.Body>
              <Form.Check type="checkbox" id={task.id} onChange={(e) => this.checkDone(e, task.id)} />
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.text}</Card.Text>
              <Button variant="danger" onClick={(e) => this.removeCurrentTask(task.id)}>remove</Button>
            </Card.Body>
          </Card>
        </Col >
      )
    });

    return (

      <Container>
        < h1 className="todo__heading" > Create To - Do list, be more productive!</h1>
        <Row>
          <Col xs={7}>
            <Form.Control value={taskTitle} onChange={this.setTitle} type="text" placeholder="Set task title" />
            <Form.Control value={taskText} onChange={this.setValue} type="text" placeholder="Create new task..." />
          </Col>
          <Col xs={5}>
            <Button variant={"success"} onClick={this.addTask}>Add Task</Button>
            <Button className="todo__reset-checked" onClick={this.resetCheckedTasks} > Reset Checked Tasks</Button>
            <Button variant={"danger"} onClick={this.resetAllTasks}>Reset All Tasks</Button>
          </Col>

        </Row>
        <Row>
          {list}
        </Row>
      </Container >
    );
  }
}

export default ToDo;