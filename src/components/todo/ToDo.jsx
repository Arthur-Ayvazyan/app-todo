import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../task/Task';
import NewTask from '../new-task/NewTask';
import Confirm from '../confirm';
import ModalEdit from '../modal/ModalEdit';

export class ToDo extends PureComponent {

  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    showTaskCreator: false,
    showTaskEditor: false,
    editableTask: null,
  }

  componentDidMount() {

    fetch('http://localhost:3001/task', {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async (response) => {

        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          }
        }
        this.setState({
          tasks: res,
        });
      })

  }

  addTask = (task) => {

    fetch('http://localhost:3001/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task),
    })
      .then(async (response) => {

        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          }
        }
        this.setState({
          tasks: [...this.state.tasks, res],
          showTaskCreator: false
        });
      })
      .catch((error) => {
        console.log('error', error);
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
      return task._id;
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

    fetch(`http://localhost:3001/task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })

      .then(async (response) => {

        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          }
        }

        const { tasks } = this.state;
        const copyTasks = tasks.filter((task) => {
          return taskId !== task._id;
        });

        this.setState({
          tasks: copyTasks,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  deleteSelected = () => {

    const { tasks, selectedTasks } = this.state;
    const deletableTasks = [...selectedTasks];

    fetch(`http://localhost:3001/task`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tasks: deletableTasks })
    })
      .then(async (response) => {

        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          }
        }

        const restTasks = tasks.filter((task) => {
          return !selectedTasks.has(task._id);
        })

        this.setState({
          tasks: restTasks,
          selectedTasks: new Set(),
          showConfirm: false
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  getEditableTask = (task) => {
    this.setState({
      editableTask: task,
    })
  }

  editTask = (editedTask) => {

    fetch(`http://localhost:3001/task/${editedTask._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTask)
    })

      .then(async (response) => {

        const res = await response.json();

        if (response.status >= 400 && response.status < 600) {
          if (res.error) {
            throw res.error;
          }
        }

        const { tasks } = this.state;
        const copyTasks = [...tasks];

        const index = copyTasks.findIndex((elem) => {
          return elem._id === editedTask._id
        });
        //copyTasks.splice(index, 1, editedTask);
        copyTasks[index] = editedTask;

        this.setState({
          tasks: copyTasks,
          showTaskEditor: false,
          editableTask: null,
        });
      })
      .catch((error) => {
        console.log('error', error);
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
          id={task._id}
          key={task._id}
        >
          <Task
            task={task}
            onSelect={this.selectTask}
            selected={selectedTasks.has(task._id)}
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