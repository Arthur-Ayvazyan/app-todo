import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers/utils';
import ModalEdit from '../../modal/ModalEdit';

export default class SingleTask extends Component {

  state = {
    task: null,
    showModal: false,
  }

  componentDidMount() {

    const taskId = this.props.match.params.taskId;

    fetch(`http://localhost:3001/task/${taskId}`, {

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
          task: res,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
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

  hendleEdit = (editedTask) => {

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
        this.setState({
          task: res,
          showModal: false,
        });

      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {

    const { task, showModal } = this.state;

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
            onEdit={this.hendleEdit}
            onClose={this.toggleModalEdit}

          />
        }
      </div>

    )
  }
}
