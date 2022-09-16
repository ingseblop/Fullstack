const initialState = {
    message: '',
    timeoutId: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SHOW_NOTIFICATION":
        return {
          message: action.message,
          tid: action.tid
        }
      case "CLEAR_NOTIFICATION":
        return {
          message: '',
          tid: null
        }
      case "HIDE_NOTIFICATION":
        clearTimeout(state.tid)
        return {
          message: action.message,
          tid: action.tid
        }
      default:
        break;
    }
    return state
  }
  
  export const showNotification = (message, duration) => async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      })
    }, duration * 1000);
    dispatch({
      type: "HIDE_NOTIFICATION"
    })
  
    dispatch({
      type: "SHOW_NOTIFICATION",
      message,
      tid: timeoutId
    })
  }
  
  export default notificationReducer