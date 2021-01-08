import React, { Component } from 'react';
import Task from './Task';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

class ToDo extends Component {
  state = {
    taskText: '',
    taskTitle: '',
    arrTaskas: [],
    taskId: 0,
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
    const taskId = this.state.taskId;
    if (!taskText || !taskTitle) return;
    const task = {
      title: taskText,
      text: taskTitle,
      id: taskId
    };
    this.setState({
      taskId: this.state.taskId + 1,
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
      taskId: 0
    });
  }

  removeCurrentTask = (e) => {
    const { arrTaskas } = this.state;
    const taskIndex = e.target.value;
    const copyArrTasks = [...arrTaskas];
    copyArrTasks.splice(taskIndex, 1);
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
      return <Col xs={12} id={index} key={index} className="todo__list" >
        <Row >
          <Col xs={8}>
            <Task id={task.id} number={index + 1} title={task.title} text={task.text} />
          </Col>
          <Col xs={4}>
            <Form.Group>
              <Row>
                <Form.Check type="checkbox" id={index} onChange={this.checkDone} />
                <Button variant={"danger"} value={index} onClick={this.removeCurrentTask}>remove</Button>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Col >
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