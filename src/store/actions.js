import requestWithToken from '../helpers/request';
import { requestWithoutToken } from '../helpers/auth';
import * as actionType from './actionTypes';
import { history } from '../helpers/history';
import { saveToken, removeToken, getJWT } from '../helpers/auth';

const apiHost = process.env.REACT_APP_API_HOST;

export function sendMessage(message) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    requestWithoutToken(`${apiHost}/form`, 'POST', message)
      .then(() => {
        dispatch({ type: actionType.SEND_MESSAGE, messageSuccess: true });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function registration(user) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    requestWithoutToken(`${apiHost}/user`, 'POST', user)
      .then(() => {
        dispatch({ type: actionType.REGISTER });
        history.push('/login');
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function authentication(member) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    requestWithoutToken(`${apiHost}/user/sign-in`, 'POST', member)
      .then((jwt) => {
        saveToken(jwt);
        dispatch({ type: actionType.AUTHENTICATE });
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function getUser() {
  return (dispatch) => {
    //dispatch({ type: actionType.PENDING });
    requestWithToken(`${apiHost}/user`)
      .then((user) => {
        if (!user) return;
        dispatch({ type: actionType.GET_USER_FULLNAME, user });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function signOut() {

  const jwt = getJWT();

  return (dispatch) => {

    if (!jwt) {
      dispatch({ type: actionType.SIGN_OUT });
      removeToken('token');
      history.push('/login');
      return;
    }

    dispatch({ type: actionType.PENDING });
    requestWithoutToken(`${apiHost}/user/sign-out`, 'POST', { jwt })
      .then((res) => {
        if (!res) return;
        removeToken('token');
        dispatch({ type: actionType.SIGN_OUT, });
        history.push('/login');
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function getTasks(params = {}) {

  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    requestWithToken(`${apiHost}/task?${query}`)
      .then((tasks) => {
        if (!tasks) return;
        dispatch({ type: actionType.GET_TASKS, tasks });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}

export function getTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionType.PENDING });
    requestWithToken(`${apiHost}/task/${taskId}`)
      .then((task) => {
        if (!task) return;
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
    requestWithToken(`${apiHost}/task`, 'POST', newTask)
      .then((task) => {
        if (!task) return;
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
    requestWithToken(`${apiHost}/task/${taskId}`, 'DELETE')
      .then((res) => {
        if (!res) return;
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
    requestWithToken(`${apiHost}/task`, 'PATCH', { tasks: [...taskIds] })
      .then((res) => {
        if (!res) return;
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
    requestWithToken(`${apiHost}/task/${data._id}`, 'PUT', data)
      .then((editedTask) => {
        if (!editedTask) return;
        dispatch({ type: actionType.EDIT_TASK, editedTask, from, status: data.status });
      })
      .catch((error) => {
        dispatch({ type: actionType.ERROR, error: error.message });
      })
  }
}


