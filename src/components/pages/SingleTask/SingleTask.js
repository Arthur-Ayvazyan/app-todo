import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers/utils';
import ModalEdit from '../../modal/ModalEdit';
import { connect } from 'react-redux';
import { getTask } from '../../../store/actions';
 
class SingleTask extends Component {

   state = {
      showModal: false,
   }

   componentDidMount() {
      const taskId = this.props.match.params.taskId;
      this.props.getTask(taskId);
   }

   componentDidUpdate(prevProps) {

      if (!prevProps.editSingleTaskSuccess && this.props.editSingleTaskSuccess) {
         this.toggleModalEdit();
         return;
      }

   }

  hendleDelete = () => {
    const taskId = this.state.task._id;
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
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  toggleModalEdit = () => {
    this.setState({
      showModal: !this.state.showModal,
    })

  }


  render() {
     const { showModal } = this.state;
     const { task } = this.props;
     console.log(this.props);

    return (
      <div>
        {
          task ?
            <>
              <Card className="mt-5 text-center">
                <Card.Body>
                  <Card.Text>Titile: {task.title}</Card.Text>
                  <Card.Text>Description: {task.description}</Card.Text>
                  <Card.Text>
                    Date: {formatDate(task.date)}
                  </Card.Text>
                  <Button
                    className="m-1"
                    variant="danger"
                    onClick={this.hendleDelete}
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
        {
          showModal &&
            <ModalEdit
                task={task}
            onClose={this.toggleModalEdit}
                from='single'

          />
        }
      </div>

    )
  }
}

const mapSateToProps = (state) => {
   return {
      task: state.task,
      editSingleTaskSuccess: state.editSingleTaskSuccess,
   };
}

const mapDispatchToProps = {
   getTask,
}

export default connect(mapSateToProps, mapDispatchToProps)(SingleTask)