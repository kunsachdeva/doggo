
function reducer(state: Record<string, Array<string>>, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "SET_BREEDS": 
      return payload;
    default:
      return state;
  }
}

export default reducer