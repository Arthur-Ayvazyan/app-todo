const defaultState = {
   tasks: [],
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

      default:
         return state;
   }
}