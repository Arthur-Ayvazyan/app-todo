import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../../task/Task';
import NewTask from '../../new-task/NewTask';
import Confirm from '../../confirm';
import ModalEdit from '../../modal/ModalEdit';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks } from '../../../store/actions';


class ToDo extends PureComponent {

  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    showTaskCreator: false,
    showTaskEditor: false,
    editableTask: null,
  }

  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)

    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.setState({
        showTaskCreator: false
      });
      return;
    }

    if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
      this.setState({
        selectedTasks: new Set(),
        showConfirm: false
      });
      return;
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({
        showTaskEditor: false,
        editableTask: null,
      });
      return;
    }
  }

  selectTask = (taskId) => {
    const copySelectedTasks = new Set(this.state.selectedTasks);
    copySelectedTasks.has(taskId) ? copySelectedTasks.delete(taskId) : copySelectedTasks.add(taskId);
    this.setState({
      selectedTasks: copySelectedTasks,
    });
  }

  selectAll = () => {
    const taskIds = this.props.tasks.map((task) => {
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

  deleteSelected = () => {
    const { selectedTasks } = this.state;
    this.props.deleteTasks(selectedTasks)
  }

  getEditableTask = (task) => {
    this.setState({
      editableTask: task,
    })
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

    const { selectedTasks, editableTask, showConfirm, showTaskCreator, showTaskEditor } = this.state;
    const { tasks } = this.props;

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
            onDelete={this.props.deleteTask}
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
              deletableTasksSize={selectedTasks.size}
            />
          }

          {
            showTaskCreator &&
            <NewTask
              onClose={this.newTaskHendle}
            />
          }
          {
            showTaskEditor &&
            <ModalEdit
              task={editableTask}
              //onEdit={this.editTask}
              onClose={this.editTaskHendle}
            />
          }

        </Container >
      </>
    );
  }
}


const mapSateToProps = (state) => {
  return {
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
    deleteTasksSuccess: state.deleteTasksSuccess,
    editTaskSuccess: state.editTaskSuccess,

  };
}

const mapDispatchToProps = {
  getTasks,
  deleteTask,
  deleteTasks,
}

export default connect(mapSateToProps, mapDispatchToProps)(ToDo);