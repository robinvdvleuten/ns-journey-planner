import io from 'socket.io-client'
import nanoid from "nanoid"

const actions = store => ({
  connectSocket (state) {
    return { ...state, socket: io() }
  },

  sendMessage(state, body) {
    const message = { id: nanoid(), body, reply: true }
    state.socket.emit('reply', message)

    return { ...state, messages: [ ...state.messages, message ] }
  },

  receiveMessage (state, message) {
    return { ...state, messages: [ ...state.messages, message ] }
  }
})

export default actions
