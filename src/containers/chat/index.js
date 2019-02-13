import React from 'react'
import { connect } from 'unistore/react'
import Bubble from "../../components/bubble"
import Chat from '../../components/chat'
import actions from '../../actions'

const ChatContainer = ({ messages, ...props }) => (
  <Chat {...props}>
    {messages.map(message => (
      <Bubble key={message.id} reply={message.reply}>
        {message.body}
      </Bubble>
    ))}
  </Chat>
)

export default connect('messages', actions)(ChatContainer)
