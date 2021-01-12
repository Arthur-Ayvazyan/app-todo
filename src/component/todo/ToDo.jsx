import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

class ToDo extends Component {
  state = {
    taskText: '',
    taskTitle: '',
    arrTasks: [],
    selectedTasks: new Set(),
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

  addTaskByEnter = (e) => {
    (e.key === "Enter") && this.addTask();
  }

  selectTasks = (taskId) => {
    const copySelectedTasks = new Set(this.state.selectedTasks);
    copySelectedTasks.has(taskId) ? copySelectedTasks.delete(taskId) : copySelectedTasks.add(taskId);
    this.setState({
      selectedTasks: copySelectedTasks,
    });
  }

  deleteCurrentTask = (taskId) => {
    const { arrTasks } = this.state;
    const copyArrTasks = arrTasks.filter((task) => {
      return taskId !== task.id;
    });
    this.setState({
      arrTasks: copyArrTasks,
    });
  }

  resetAllTasks = () => {
    this.setState({
      arrTasks: [],
      selectedTasks: new Set(),
      taskTitle: '',
      taskText: '',
    });
  }

  deleteSelectedTasks = () => {
    const { arrTasks, selectedTasks } = this.state;
    const restArrTasks = arrTasks.filter((task) => {
      return !selectedTasks.has(task.id);
    })
    this.setState({
      arrTasks: [...restArrTasks],
      selectedTasks: new Set(),
    });
  }

  render() {
    const { taskText, taskTitle, arrTasks, selectedTasks } = this.state;
    const list = arrTasks.map((task, index) => {
      return (
        <Col
          xs={6}
          md={4}
          lg={4}
          xl={3}
          id={task.id}
          key={task.id}
          className={"mb-4"}>
          <Card>
            <Card.Body>
              <Form.Check
                type="checkbox"
                id={index}
                onChange={() => this.selectTasks(task.id)}
              />
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.text}</Card.Text>
              <Button
                variant="danger"
                onClick={() => this.deleteCurrentTask(task.id)}
                disabled={!!selectedTasks.size}>
                remove
              </Button>
            </Card.Body>
          </Card>
        </Col >
      )
    });

    return (
      <Container>
        <Row className={"mt-2 mb-2"}>
          <Col>
            <h1> Create To - Do list, be more productive!</h1>
          </Col>
        </Row>
        <Row className={"mb-3"}>
          <Col>
            <Form.Control
              type="text"
              className={"mb-2"}
              value={taskTitle}
              placeholder="Set task title"
              disabled={!!selectedTasks.size}
              onChange={this.setTitle}
              onKeyDown={this.addTaskByEnter}
            />
            <Form.Control
              type="text"
              className={"mb-2"}
              value={taskText}
              placeholder="Create new task..."
              onChange={this.setValue}
              onKeyDown={this.addTaskByEnter}
              disabled={!!selectedTasks.size}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col>
            <Button
              className={"w-100"}
              variant={"danger"}
              onClick={this.resetAllTasks}
              disabled={!!selectedTasks.size || !arrTasks.length}>
              Reset All Tasks
            </Button>
          </Col>
          <Col>
            <Button
              className={"w-100"}
              variant={"warning"}
              onClick={this.deleteSelectedTasks}
              disabled={!selectedTasks.size}>
              delete selected
            </Button>
          </Col >
          <Col>
            <Button
              className={"w-100"}
              variant={"success"}
              onClick={this.addTask}
              disabled={!!selectedTasks.size}
            >
              Add Task
            </Button>
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