import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../task/Task';
import NewTask from '../new-task/NewTask';
import Confirm from '../confirm';

export class ToDo extends Component {
  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
  }

  addTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task],
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
    const { tasks } = this.state;
    const copyTasks = tasks.filter((task) => {
      return taskId !== task.id;
    });
    this.setState({
      tasks: copyTasks,
    });
  }

  resetAllTasks = () => {
    this.setState({
      tasks: [],
      selectedTasks: new Set(),
    });
  }

  deleteSelectedTasks = () => {
    const { tasks, selectedTasks } = this.state;
    const restTasks = tasks.filter((task) => {
      return !selectedTasks.has(task.id);
    })

    this.setState({
      tasks: restTasks,
      selectedTasks: new Set(),
      showConfirm: false
    });
  }

  confirmHendle = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    })
  }

  render() {

    const { tasks, selectedTasks, showConfirm } = this.state;
    const list = tasks.map((task) => {
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

      <div>
        <Container Container >
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
                disabled={!!selectedTasks.size || !tasks.length}>
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
          <Row>
            {list}
          </Row>

          {
            showConfirm && <Confirm
              onClose={this.confirmHendle}
              onDeleteTasks={this.deleteSelectedTasks}
              deletableTasksSize={selectedTasks.size} />
          }

        </Container>
      </div>
    );
  }
}