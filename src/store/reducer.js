import * as actionType from './actionTypes';
import { checkLoginStatus } from '../helpers/auth';

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
  messageSendSuccess: false,
  isAuthenticated: checkLoginStatus(),
}

const message = {
  success: {
    addedTask: 'Task added successfuly!',
    editedTask: 'Task edited succesfuly',
    deletedTask: 'Task deleted succesfuly',
    deletedTasks: 'Tasks deleted succesfuly',
    done: 'Congrats, the task has complated',
    active: 'The task is active',
    sentMessage: 'Your message was sent succesfuly',
    registration: 'Congrats, you are a member',
    authentication: 'Hello, have a nice day )',
  }
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {

    case actionType.ERROR: {
      return {
        ...state,
        showSpinner: false,
        errorTaskMessage: action.error,
      }
    }


    case actionType.PENDING: {
      return {
        ...state,
        addTaskSuccess: false,
        deleteTasksSuccess: false,
        editTaskSuccess: false,
        editSingleTaskSuccess: false,
        showSpinner: true,
        errorTaskMessage: null,
        successTaskMessage: null,
        messageSendSuccess: false,
      }
    }

    case actionType.SEND_MESSAGE: {
      if (action.messageSuccess) {
        return {
          ...state,
          showSpinner: false,
          messageSendSuccess: true,
          successTaskMessage: message.success.sentMessage,
        }
      }
      break;
    }

    case actionType.REGISTER: {
      return {
        ...state,
        showSpinner: false,
        successTaskMessage: message.success.registration,
      }
    }

    case actionType.AUTHENTICATE: {
      return {
        ...state,
        showSpinner: false,
        //  successTaskMessage: message.success.authentication,
        isAuthenticated: true,
      }
    }

     case actionType.SIGN_OUT: {
        return {
           ...state,
           showSpinner: false,
           isAuthenticated: false,
        }
     }

    case actionType.GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
        showSpinner: false,
      }
    }

    case actionType.GET_TASK: {
      return {
        ...state,
        task: action.task,
        showSpinner: false,
      }
    }

    case actionType.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
        showSpinner: false,
        successTaskMessage: message.success.addedTask,
      }
    }



    case actionType.DELETE_TASK: {
      if (action.from === 'single') {
        return {
          ...state,
          task: null,
          showSpinner: false,
          successTaskMessage: message.success.deletedTask,
        }
      }

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

    case actionType.DELETE_TASKS: {
      const restTasks = state.tasks.filter((task) => {
        return !action.taskIds.has(task._id);
      });
      return {
        ...state,
        tasks: restTasks,
        deleteTasksSuccess: true,
        showSpinner: false,
        successTaskMessage: message.success.deletedTasks,
      }
    }

    case actionType.EDIT_TASK: {

      let successTaskMessage = message.success.editedTask;

      if (action.status) {

        action.status === 'done'
          ? successTaskMessage = message.success.done
          : successTaskMessage = message.success.active;
      }

      if (action.from === 'single' && !action.status) {
        return {
          ...state,
          task: action.editedTask,
          editSingleTaskSuccess: true,
          showSpinner: false,
          successTaskMessage: successTaskMessage,
        }
      }

      if (action.from === 'single' && action.status) {
        return {
          ...state,
          task: action.editedTask,
          editSingleTaskSuccess: false,
          showSpinner: false,
          successTaskMessage: successTaskMessage,
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
        successTaskMessage: successTaskMessage,
      }
    }

    default:
      return state;
  }
}