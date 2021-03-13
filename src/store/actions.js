import request from '../helpers/request';
import * as actionType from './actionTypes';
import { history } from '../helpers/history';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {

  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    request(`${apiHost}/task?${query}`)
      .then((tasks) => {
        dispatch({ type: actionType.GET_TASKS, tasks: tasks });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}
export function getTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    request(`${apiHost}/task/${taskId}`)
      .then((task) => {
        dispatch({ type: actionType.GET_TASK, task });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function addTask(newTask) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    request(`${apiHost}/task`, 'POST', newTask)
      .then((task) => {
        dispatch({ type: actionType.ADD_TASK, task });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function deleteTask(taskId, from) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    request(`${apiHost}/task/${taskId}`, 'DELETE')
      .then(() => {
        dispatch({
          type: actionType.DELETE_TASK, taskId, from
        });
        if (from === 'single') {
          history.push('/');
        }
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function deleteTasks(taskIds) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    request(`${apiHost}/task`, 'PATCH', { tasks: [...taskIds] })
      .then(() => {
        dispatch({ type: actionType.DELETE_TASKS, taskIds });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function editTask(data, from) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    request(`${apiHost}/task/${data._id}`, 'PUT', data)
      .then((editedTask) => {
        dispatch({ type: actionType.EDIT_TASK, editedTask, from, status: data.status });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}


