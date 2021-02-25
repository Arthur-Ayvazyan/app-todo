
const defaultState = {
   tasks: [],
   task: null,
   addTaskSuccess: false,
   deleteTasksSuccess: false,
   editTaskSuccess: false,
   editSingleTaskSuccess: false,
   showSpinner: false,
   errorTaskMessage: null,
   successTaskMessage: null,
}

const message = {
   success: {
      addedTask: 'Task added successfuly!',
      editedTask: 'Task edited succesfuly',
      deletedTask: 'Task deleted succesfuly',
      deletedTasks: 'Tasks deleted succesfuly',
   }
}

export default function reducer(state = defaultState, action) {

   switch (action.type) {


      case 'ERROR': {
         return {
            ...state,
            showSpinner: false,
            errorTaskMessage: action.error,
         }
      }
      case 'PENDING': {
         return {
            ...state,
            addTaskSuccess: false,
            deleteTasksSuccess: false,
            editTaskSuccess: false,
            editSingleTaskSuccess: false,
            showSpinner: true,
            errorTaskMessage: null,
            successTaskMessage: null,
         }
      }

      case 'GET_TASKS': {
         return {
            ...state,
            tasks: action.tasks,
            showSpinner: false,
         }
      }

      case 'GET_TASK': {
         return {
            ...state,
            task: action.task,
            showSpinner: false,
         }
      }

      case 'ADD_TASK': {
         return {
            ...state,
            tasks: [...state.tasks, action.task],
            addTaskSuccess: true,
            showSpinner: false,
            successTaskMessage: message.success.addedTask,

         }
      }

      case 'DELETE_TASK': {
         const newTasks = state.tasks.filter((task) => {
            return action.taskId !== task._id;
         });
         return {
            ...state,
            tasks: newTasks,
            showSpinner: false,
            successTaskMessage: message.success.deletedTask,
         }
      }

      case 'DELETE_TASKS': {
         const restTasks = state.tasks.filter((task) => {
            return !action.taskIds.has(task._id);
         })
         return {
            ...state,
            tasks: restTasks,
            deleteTasksSuccess: true,
            showSpinner: false,
            successTaskMessage: message.success.deletedTasks,
         }
      }

      case 'EDIT_TASK': {
         if (action.from === 'single') {
            return {
               ...state,
               task: action.editedTask,
               editSingleTaskSuccess: true,
               showSpinner: false,
               successTaskMessage: message.success.editedTask,
            }
         }

         const newTasks = [...state.tasks];
         const index = newTasks.findIndex((elem) => {
            return elem._id === action.editedTask._id
         });

         newTasks[index] = action.editedTask;
         return {
            ...state,
            tasks: newTasks,
            editTaskSuccess: true,
            showSpinner: false,
            successTaskMessage: message.success.editedTask,
         }
      }

      default:
         return state;
   }
}