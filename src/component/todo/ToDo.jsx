import React, { Component } from 'react';
import Task from './Task';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class ToDo extends Component {

  state = {
    taskText: '',
    taskTitle: '',
    arrTaskas: [],

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
      arrTaskas: [...this.state.arrTaskas, task],
      taskTitle: '',
      taskText: '',
    });

  }

  resetAllTasks = () => {
    this.setState({
      arrTaskas: [],
      taskTitle: '',
      taskText: '',
    });
  }

  removeCurrentTask = (taskId) => {
    const { arrTaskas } = this.state;
    const copyArrTasks = arrTaskas.filter((task) => {
      return taskId !== task.id;
    });
    this.setState({ arrTaskas: copyArrTasks });
  }


  //checkDone = (e) => {

  //  this.setState({
  //    //isDone: !this.state.isDone,

  //  });
  //}

  render() {

    const { taskText, taskTitle, arrTaskas } = this.state;
    const list = arrTaskas.map((task, index) => {
      return (
        <Col xs={3} id={index} key={index} className="todo__list" >
          <Card>
            <Card.Body>
              <Form.Check type="checkbox" id={index} onChange={this.checkDone} />
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
        {/*<div className="todo">*/}
        < h1 className="todo__heading" > Create To - Do list, be more productive!</h1>
        <Row>
          <Col xs={7}>
            <Form.Control value={taskTitle} onChange={this.setTitle} type="text" placeholder="Set task title" />
            <Form.Control value={taskText} onChange={this.setValue} type="text" placeholder="Create new task..." />
          </Col>
          <Col xs={5}>
            <Button variant={"success"} onClick={this.addTask}>Add Task</Button>
            <Button variant={"danger"} onClick={this.resetAllTasks}>Reset All Tasks</Button>
          </Col>

        </Row>
        {/*<div className="todo__wrapper">*/}
        <Row>
          {list}

        </Row>
        {/*</div>*/}
        {/*</div >*/}
      </Container >
    );
  }
}

export default ToDo;