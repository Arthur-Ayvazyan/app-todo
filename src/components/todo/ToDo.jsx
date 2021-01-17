import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../task/Task';
import NewTask from '../new-task/NewTask';
import Confirm from '../confirm';

export class ToDo extends Component {
  state = {
    arrTasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    showTaskCreator: false,
  }

  addTask = (task) => {
    this.setState({
      arrTasks: [...this.state.arrTasks, task],
      showTaskCreator: false
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
      showConfirm: false
    });
  }

  confirmHendle = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    })
  }
  newTaskHendle = () => {
    this.setState({
      showTaskCreator: !this.state.showTaskCreator,
    })
  }

  render() {

    const { arrTasks, selectedTasks, showConfirm, showTaskCreator } = this.state;
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

      <>
        <Container Container >
          <Row className={"mt-2 mb-2"}>
            <Col>
              <h1> Create To - Do list, be more productive!</h1>
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
                onClick={this.confirmHendle}
                disabled={!selectedTasks.size}>
                delete selected
            </Button>
            </Col >
          </Row>
          <Row className={"justify-content-end"}>
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={this.newTaskHendle}
                disabled={selectedTasks.size}
              >
                Create Task
              </Button>
            </Col>
          </Row>
          <Row>
            {list}
          </Row>

          {
            showConfirm && <Confirm
              onClose={this.confirmHendle}
              onDeleteTasks={this.deleteSelectedTasks}
              deletableTasksSize={selectedTasks.size} />
          }

          {
            showTaskCreator &&
            <NewTask
              addTask={this.addTask}
              onClose={this.newTaskHendle}
            />
          }

        </Container>
      </>
    );
  }
}