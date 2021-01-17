import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class ToDo extends Component {

  state = {
    taskText: '',
    taskTitle: '',
    tasks: [],
    checkedTasks: [],
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
      tasks: [...this.state.tasks, task],
      taskTitle: '',
      taskText: '',
    });

  }

  checkDone = (e, taskId) => {
    const { checkedTasks } = this.state;
    let copyCheckedTasks = [...checkedTasks];
    if (e.target.checked) {
      this.setState({
        checkedTasks: [...copyCheckedTasks, taskId],
      });
      return;
    }
    copyCheckedTasks = checkedTasks.filter((elem) => {
      return elem !== taskId;
    })
    this.setState({
      checkedTasks: copyCheckedTasks,
    });
  }

  removeCurrentTask = (taskId) => {
    const { tasks, checkedTasks } = this.state;
    const copyTasks = tasks.filter((task) => {
      return taskId !== task.id;
    });
    const copyCheckedTasks = checkedTasks.filter((task) => {
      return task !== taskId;
    });
    this.setState({
      tasks: copyTasks,
      checkedTasks: copyCheckedTasks
    });
  }

  resetAllTasks = () => {
    this.setState({
      tasks: [],
      checkedTasks: [],
      taskTitle: '',
      taskText: '',
    });
  }

  resetCheckedTasks = () => {
    const { tasks, checkedTasks } = this.state;
    if (checkedTasks.length === 0) return;
    const restTasks = tasks.filter((task) => {
      return !checkedTasks.includes(task.id);
    })
    this.setState({
      tasks: restTasks,
      checkedTasks: []
    });
  }

  render() {

    const { taskText, taskTitle, tasks } = this.state;
    const list = tasks.map((task) => {
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
      <div>
        <Container>
          <h1 className="todo__heading" > Create To - Do list, be more productive!</h1>
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
        </Container>
      </div>
    );
  }
}

export default ToDo;