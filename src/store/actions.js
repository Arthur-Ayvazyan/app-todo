import request from '../helpers/request';

export function getTasks() {
   return (dispatch) => {
      dispatch({ type: 'PENDING' });
      request('http://localhost:3001/task')
         .then((tasks) => {
            dispatch({ type: 'GET_TASKS', tasks: tasks });
         })
         .catch((error) => {
            dispatch({ type: 'ERROR', error: error.message });
         })
   }
}
export function getTask(taskId) {
   return (dispatch) => {
      dispatch({ type: 'PENDING' });
      request(`http://localhost:3001/task/${taskId}`)
         .then((task) => {
            dispatch({ type: 'GET_TASK', task });
         })
         .catch((error) => {
            dispatch({ type: 'ERROR', error: error.message });
         })
   }
}

export function addTask(newTask) {
   return (dispatch) => {
      dispatch({ type: 'PENDING' });
      request('http://localhost:3001/task', 'POST', newTask)
         .then((task) => {
            dispatch({ type: 'ADD_TASK', task });
         })
         .catch((error) => {
            dispatch({ type: 'ERROR', error: error.message });
         })
   }
}

export function deleteTask(taskId) {
   return (dispatch) => {
      dispatch({ type: 'PENDING' });
      request(`http://localhost:3001/task/${taskId}`, 'DELETE')
         .then(() => {
            dispatch({ type: 'DELETE_TASK', taskId });
         })
         .catch((error) => {
            dispatch({ type: 'ERROR', error: error.message });
         })
   }
}

export function deleteTasks(taskIds) {
   return (dispatch) => {
      dispatch({ type: 'PENDING' });
      request(`http://localhost:3001/task`, 'PATCH', { tasks: [...taskIds] })
         .then(() => {
            dispatch({ type: 'DELETE_TASKS', taskIds });
         })
         .catch((error) => {
            dispatch({ type: 'ERROR', error: error.message });
         })
   }
}

export function editTask(editedTask, from) {
   return (dispatch) => {
      dispatch({ type: 'PENDING' });
      request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
         .then(() => {
            dispatch({ type: 'EDIT_TASK', editedTask, from });
         })
         .catch((error) => {
            dispatch({ type: 'ERROR', error: error.message });
         })
   }
}


