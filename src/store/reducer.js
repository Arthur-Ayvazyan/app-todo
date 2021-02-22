
const defaultState = {
   tasks: [],
   addTaskSuccess: false,
   deleteTasksSuccess: false,
   editTaskSuccess: false,
   showSpinner: false,
}

export default function reducer(state = defaultState, action) {

   switch (action.type) {


      case 'PENDING': {
         return {
            ...state,
            addTaskSuccess: false,
            deleteTasksSuccess: false,
            editTaskSuccess: false,
            showSpinner: true
         }
      }
      case 'GET_TASKS': {
         return {
            ...state,
            tasks: action.tasks,
            showSpinner: false,
         }
      }

      case 'ADD_TASK': {
         return {
            ...state,
            tasks: [...state.tasks, action.task],
            addTaskSuccess: true,
            showSpinner: false,
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
         }
      }

      case 'EDIT_TASK': {
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
         }
      }

      default:
         return state;
   }
}