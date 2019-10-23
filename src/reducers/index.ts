import { combineReducers } from "redux"

import location, { locationState } from "./location.reducer"

export interface State {
  location: locationState
}

export default combineReducers<State>({
  location,
})
