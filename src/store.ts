import { createStore } from "redux"
import reducer from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension"

const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools())

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(reducer)
      })
    }
  }

  return store
}

export default configureStore
