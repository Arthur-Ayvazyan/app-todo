import styles from './todo.module.scss';
import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Modals/ModalDelete/ModalDelete';
import ModalEdit from '../../Modals/ModalEdit/ModalEdit';
import Serach from '../../Search/Search';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks } from '../../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class ToDo extends PureComponent {

  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    showTaskCreator: false,
    showTaskEditor: false,
    editableTask: null,
    toggleSelect: true
  }

  componentDidMount() {
    this.props.getTasks();
    window.scrollTo({
      top: 0,
    });
  }

  componentDidUpdate(prevProps) {

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

  selectAllToggle = () => {
    const { toggleSelect } = this.state;
    if (toggleSelect) {
      const taskIds = this.props.tasks.map((task) => {
        return task._id;
      })
      this.setState({
        selectedTasks: new Set(taskIds),
        toggleSelect: !toggleSelect
      });
      return;
    }
    this.setState({
      selectedTasks: new Set(),
      toggleSelect: !toggleSelect
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

  editTaskHandle = () => {
    this.setState({
      showTaskEditor: !this.state.showTaskEditor,
      editableTask: null,
    });
  }

  confirmHandle = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    })
  }

  newTaskHandle = () => {
    this.setState({
      showTaskCreator: !this.state.showTaskCreator,
    })
  }

  render() {

    const { selectedTasks, editableTask, showConfirm, showTaskCreator, showTaskEditor, toggleSelect } = this.state;
    const { tasks } = this.props;

    const list = tasks.map((task) => {
      return (
        <Col
          xs={12}
          sm={6}
          md={6}
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
            onShow={this.editTaskHandle}
            onEdit={this.getEditableTask}
          />
        </Col>
      )
    });

    return (

      <>
        <Container>
          <Row className={"mt-4 mb-2 flex-wrap"}>
            <Col size={12}>
              <h1 className="heading-3"> Create To - Do list, be more productive!</h1>
            </Col>
          </Row>
          <Row>
            <Col size={12}>
              <Serach />
            </Col>
          </Row>
          <Row className="justify-content-center mb-5">
            <Col>
              <Button
                className={"w-100"}
                variant={"danger"}
                onClick={this.confirmHandle}
                disabled={!selectedTasks.size}
              >
                Delete All
             </Button>
            </Col>
            <Col>
              <Button
                className={"w-100"}
                variant={"warning"}
                onClick={this.selectAllToggle}
              >
                {toggleSelect ? 'Select All' : 'Unselect All'}
              </Button>
            </Col>
            <Col className={styles.dnMobile}>
              <Button
                className="w-100"
                variant="primary"
                onClick={this.newTaskHandle}
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
              onClose={this.confirmHandle}
              onDeleteTasks={this.deleteSelected}
              deletableTasksSize={selectedTasks.size}
            />
          }

          {
            showTaskCreator &&
            <NewTask
              onClose={this.newTaskHandle}
            />
          }

          {
            showTaskEditor &&
            <ModalEdit
              task={editableTask}
              onClose={this.editTaskHandle}
            />
          }

        </Container >

        <Button
          className={styles.newTaskMobile}
          variant="primary"
          onClick={this.newTaskHandle}
          disabled={selectedTasks.size}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </>
    );
  }
}


const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);