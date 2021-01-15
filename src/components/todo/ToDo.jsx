import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../task/Task';
import NewTask from '../new-task/NewTask';

export class ToDo extends Component {
  state = {
    arrTasks: [],
    selectedTasks: new Set(),
  }

  addTask = (task) => {
    if (!task) return;
    this.setState({
      arrTasks: [...this.state.arrTasks, task],
    });
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
    });
  }

  deleteSelectedTasks = () => {
    const { arrTasks, selectedTasks } = this.state;
    const restArrTasks = arrTasks.filter((task) => {
      return !selectedTasks.has(task.id);
    })
    this.setState({
      arrTasks: restArrTasks,
      selectedTasks: new Set(),
    });
  }

  render() {
    const { arrTasks, selectedTasks } = this.state;
    const list = arrTasks.map((task) => {
      return (
        <Col
          xs={6}
          md={4}
          lg={4}
          xl={3}
          id={task.id}
          key={task.id}
        >
          <Task
            data={task}
            onSelect={this.selectTasks}
            disabled={!!selectedTasks.size}
            onDelete={this.deleteCurrentTask}
          />
        </Col >
      )
    });

    return (
      < Container >
        <Row className={"mt-2 mb-2"}>
          <Col>
            <h1> Create To - Do list, be more productive!</h1>
          </Col>
        </Row>
        <Row className={"mb-3"}>
          <Col>
            <NewTask
              addTask={this.addTask}
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

        </Row>
        <Row>
          {list}
        </Row>
      </  Container>
    );
  }
}