import createStore from 'unistore'
import devtools from 'unistore/devtools'
import nanoid from "nanoid"

const { NODE_ENV } = process.env

const store = createStore({
  messages: [{
    id: nanoid(),
    body: "Hey!"
  }, {
    id: nanoid(),
    body: "Can I have a banana?"
  }, {
    id: nanoid(),
    body: "🍌",
    reply: true
  }]
})

export default typeof window === 'undefined' || NODE_ENV === 'production' ? store : devtools(store)
