const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_TEXT":
      return action.data
    default:
      break;
  }
  return state
}

export const filterAnecdote = (filteredText) => {
  return {
    type: "FILTER_TEXT",
    data: filteredText
  }
}

export default filterReducer