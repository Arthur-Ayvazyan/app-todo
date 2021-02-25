
const defaultState = {
  tasks: [],
  addTaskSuccess: false,
  deleteTasksSuccess: false,
  editTaskSuccess: false,
}

export default function reducer(state = defaultState, action) {

  switch (action.type) {
    case 'INCREMENT_COUNT': {
      return {
        ...state,
        count: state.count + 1,
      }
    }

    case 'DECREMENT_COUNT': {
      return {
        ...state,
        count: state.count - 1,
      }
    }

    case 'GET_TASKS': {
      return {
        ...state,
        tasks: action.tasks,
      }
    }

    case 'ADD_TASK': {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true
      }
    }

    case 'ADDING_TASK': {
      return {
        ...state,
        addTaskSuccess: false
      }
    }

    case 'DELETE_TASK': {
      const newTasks = state.tasks.filter((task) => {
        return action.taskId !== task._id;
      });
      return {
        ...state,
        tasks: newTasks,
      }
    }

    case 'DELETE_TASKS': {
      const restTasks = state.tasks.filter((task) => {
        return !action.taskIds.has(task._id);
      })
      return {
        ...state,
        tasks: restTasks,
        deleteTasksSuccess: true
      }
    }

    case 'DELETEING_TASKS': {
      return {
        ...state,
        deleteTasksSuccess: false
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
        editTaskSuccess: true
      }
    }

    case 'EDITING_TASK': {
      return {
        ...state,
        editTaskSuccess: false
      }
    }

    default:
      return state;
  }
}