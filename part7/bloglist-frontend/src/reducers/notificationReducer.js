const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'showMessage':
      return action.message
    case 'hideMessage':
      return action.message
    default:
      return state
  }
}

export const setMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'showMessage',
      message: message
    })

    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        message: null
      })
    }, 5000)
  }
}

export default notificationReducer
