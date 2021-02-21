import request from '../helpers/request';

export function getTasks() {
  return (dispatch) => {
    request('http://localhost:3001/task')
      .then((tasks) => {
        dispatch({ type: 'GET_TASKS', tasks: tasks });
      })
  }
}

export function addTask(newTask) {
  return (dispatch) => {
    dispatch({ type: 'ADDING_TASK' });
    request('http://localhost:3001/task', 'POST', newTask)
      .then((task) => {
        dispatch({ type: 'ADD_TASK', task });
      })
  }
}

export function deleteTask(taskId) {
  return (dispatch) => {
    request(`http://localhost:3001/task/${taskId}`, 'DELETE')
      .then(() => {
        dispatch({ type: 'DELETE_TASK', taskId });
      })
  }
}

export function deleteTasks(taskIds) {
  return (dispatch) => {
    dispatch({ type: 'DELETEING_TASKS' });
    request(`http://localhost:3001/task`, 'PATCH', { tasks: [...taskIds] })
      .then(() => {
        dispatch({ type: 'DELETE_TASKS', taskIds });
      })
  }
}

export function editTask(editedTask) {
  return (dispatch) => {
    dispatch({ type: 'EDITING_TASK' });
    request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
      .then(() => {
        dispatch({ type: 'EDIT_TASK', editedTask });
      })
  }
}


