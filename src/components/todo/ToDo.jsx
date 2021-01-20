import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../task/Task';
import NewTask from '../new-task/NewTask';
import Confirm from '../confirm';
import ModalEdit from '../modal/ModalEdit';

export class ToDo extends Component {

  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    showTaskCreator: false,
    showTaskEditor: false,
    editableTask: null,
  }

  addTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task],
      showTaskCreator: false
    });
  }

  selectTask = (taskId) => {
    const copySelectedTasks = new Set(this.state.selectedTasks);
    copySelectedTasks.has(taskId) ? copySelectedTasks.delete(taskId) : copySelectedTasks.add(taskId);
    this.setState({
      selectedTasks: copySelectedTasks,
    });
  }

  selectAll = () => {
    const taskIds = this.state.tasks.map((task) => {
      return task.id;
    })
    this.setState({
      selectedTasks: new Set(taskIds),
    });
  }

  unselectAll = () => {
    this.setState({
      selectedTasks: new Set(),
    });
  }

  deleteTask = (taskId) => {
    const { tasks } = this.state;
    const copyTasks = tasks.filter((task) => {
      return taskId !== task.id;
    });
    this.setState({
      tasks: copyTasks,
    });
  }

  deleteSelected = () => {
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

  deleteAllTasks = () => {
    this.setState({
      tasks: [],
      selectedTasks: new Set()
    });
  }


  getEditableTask = (task) => {
    this.setState({
      editableTask: task,
    })
  }

  editTask = (editedTask) => {
    const { tasks } = this.state;
    const copyTasks = [...tasks];

    const index = copyTasks.findIndex((elem) => {
      return elem.id === editedTask.id
    });
    //copyTasks.splice(index, 1, editedTask);
    copyTasks[index] = editedTask;

    this.setState({
      tasks: copyTasks,
      showTaskEditor: false,
      editableTask: null,
    });
  }

  editTaskHendle = () => {
    this.setState({
      showTaskEditor: !this.state.showTaskEditor,
      editableTask: null,
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

    const { tasks, selectedTasks, editableTask, showConfirm, showTaskCreator, showTaskEditor } = this.state;
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
            task={task}
            onSelect={this.selectTask}
            selected={selectedTasks.has(task.id)}
            disabled={!!selectedTasks.size}
            onDelete={this.deleteTask}
            onShow={this.editTaskHendle}
            onEdit={this.getEditableTask}
          />
        </Col >
      )
    });

    return (

      <>
        <Container>
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
                onClick={this.deleteAllTasks}
                disabled={!!selectedTasks.size || !tasks.length}
              >
                Reset All Tasks
            </Button>
            </Col>
            <Col>
              <Button
                className={"w-100"}
                variant={"warning"}
                onClick={this.confirmHendle}
                disabled={!selectedTasks.size}
              >
                delete selected
            </Button>
            </Col >
            <Col>
              <Button
                className={"w-100"}
                variant={"warning"}
                onClick={this.selectAll}
                disabled={!tasks.length && !selectedTasks.size}
              //disabled={!(tasks.length > 1) && !selectedTasks.size}
              >
                Select All
            </Button>
            </Col >
            <Col>
              <Button
                className={"w-100"}
                variant={"warning"}
                onClick={this.unselectAll}
                disabled={!selectedTasks.size}
              >
                Unselect All
            </Button>
            </Col >
          </Row>

          <Row className={"justify-content-end"}>
            <Col xs="auto mb-3">
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
              onDeleteTasks={this.deleteSelected}
              deletableTasksSize={selectedTasks.size} />
          }

          {
            showTaskCreator &&
            <NewTask
              addTask={this.addTask}
              onClose={this.newTaskHendle}
            />
          }
          {
            showTaskEditor &&
            <ModalEdit
              task={editableTask}
              onEdit={this.editTask}
              onClose={this.editTaskHendle}

            />
          }

        </Container >
      </>
    );
  }
}