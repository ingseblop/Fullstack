import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'InitAllUsers':
      return action.data
    default:
      return state
  }
}

export const initAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'InitAllUsers',
      data: users
    })
  }
}

export default userReducer
