import createStore from 'unistore'
import devtools from 'unistore/devtools'

const { NODE_ENV } = process.env

const store = createStore({
  messages: [],
  socket: null
})

export default typeof window === 'undefined' || NODE_ENV === 'production' ? store : devtools(store)
