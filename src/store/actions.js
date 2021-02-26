import request from '../helpers/request';
import * as actionType from './actionTypes';

export function getTasks() {
   return (dispatch) => {
      dispatch({ type: actionType.PENDING });
      request('http://localhost:3001/task')
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
      request(`http://localhost:3001/task/${taskId}`)
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
      request('http://localhost:3001/task', 'POST', newTask)
         .then((task) => {
            dispatch({ type: actionType.ADD_TASK, task });
         })
         .catch((error) => {
            dispatch({ type: actionType.ERROR, error: error.message });
         })
   }
}

export function deleteTask(taskId) {
   return (dispatch) => {
      dispatch({ type: actionType.PENDING });
      request(`http://localhost:3001/task/${taskId}`, 'DELETE')
         .then(() => {
            dispatch({
               type: actionType.DELETE_TASK, taskId
            });
         })
         .catch((error) => {
            dispatch({ type: actionType.ERROR, error: error.message });
         })
   }
}

export function deleteTasks(taskIds) {
   return (dispatch) => {
      dispatch({ type: actionType.PENDING });
      request(`http://localhost:3001/task`, 'PATCH', { tasks: [...taskIds] })
         .then(() => {
            dispatch({ type: actionType.DELETE_TASKS, taskIds });
         })
         .catch((error) => {
            dispatch({ type: actionType.ERROR, error: error.message });
         })
   }
}

export function editTask(editedTask, from) {
   return (dispatch) => {
      dispatch({ type: actionType.PENDING });
      request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
         .then(() => {
            dispatch({ type: actionType.EDIT_TASK, editedTask, from });
         })
         .catch((error) => {
            dispatch({ type: actionType.ERROR, error: error.message });
         })
   }
}


