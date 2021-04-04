import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers/utils';
import ModalEdit from '../../Modals/ModalEdit/ModalEdit';
import { connect } from 'react-redux';
import { getTask, deleteTask, editTask } from '../../../store/actions';

class SingleTask extends Component {

  state = {
    showModal: false,
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
    });
    const taskId = this.props.match.params.taskId;
    this.props.getTask(taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editSingleTaskSuccess && this.props.editSingleTaskSuccess) {
      this.toggleModalEdit();
      return;
    }
  }

  handleDelete = () => {
    const taskId = this.props.task._id;
    this.props.deleteTask(taskId, 'single')
  }

  toggleModalEdit = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const { showModal } = this.state;
    const { task, editTask } = this.props;

    return (

      <>
        <Container>
          {
            task ?
              <>
                <Card className="mt-5 text-center">
                  <Card.Body>
                    <Card.Text>Titile: {task.title}</Card.Text>
                    <Card.Text>Description: {task.description}</Card.Text>
                    <Card.Text>Created at: {formatDate(task.created_at)}</Card.Text>
                    <Card.Text>Date: {formatDate(task.date)}</Card.Text>
                    <Card.Text>Status: {task.status}</Card.Text>
                    {
                      task.status === 'active' ?
                        <Button
                          className="m-1"
                          variant="success"
                          onClick={() => editTask(
                            {
                              status: 'done',
                              _id: task._id,
                            },
                            'single'
                          )}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        :
                        <Button
                          className="m-1"
                          variant="secondary"
                          onClick={() => editTask(
                            {
                              status: 'active',
                              _id: task._id,
                            },
                            'single'
                          )}
                        >
                          <FontAwesomeIcon icon={faRedo} />
                        </Button>
                    }
                    <Button
                      className="m-1"
                      variant="danger"
                      onClick={this.handleDelete}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                      className="m-1"
                      variant="warning"
                      onClick={this.toggleModalEdit}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Card.Body>
                </Card >

              </>
              :
              <p>loading... </p>

          }
        </Container>
        {
          showModal &&
          <ModalEdit
            task={task}
            onClose={this.toggleModalEdit}
            from='single'

          />
        }
      </>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    editSingleTaskSuccess: state.editSingleTaskSuccess,
  };
}

const mapDispatchToProps = {
  getTask,
  deleteTask,
  editTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)