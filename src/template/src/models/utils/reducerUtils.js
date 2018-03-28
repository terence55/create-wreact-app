export function createSimpleReducers(actionType, key, value) {
  return {
    [actionType]: (state, action) => state.merge({
      [key]: value !== undefined ? value : action.payload
    })
  };
}

export function createStateSwitchReducers(positiveActionType, negativeActionType, key) {
  return {
    [positiveActionType]: state => state.merge({
      [key]: true
    }),
    [negativeActionType]: state => state.merge({
      [key]: false
    })
  };
}
