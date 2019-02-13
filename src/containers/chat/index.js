import React, { useEffect } from 'react'
import { connect } from 'unistore/react'
import Bubble from "../../components/bubble"
import Chat from '../../components/chat'
import JourneyBubble from '../../components/journey-bubble'
import actions from '../../actions'

const ChatContainer = ({ messages, socket, connectSocket, receiveMessage, ...props }) => {
  useEffect(() => { connectSocket() }, [])
  useEffect(() => { socket && socket.on('message', receiveMessage) }, [socket])

  return (
    <Chat {...props}>
      {messages.map(message => {
        if (message.journey) {
          return <JourneyBubble key={message.id} journey={message.body} />
        }

        return (
          <Bubble key={message.id} reply={message.reply}>
            {message.body}
          </Bubble>
        )
      })}
    </Chat>
  )
}

export default connect('messages, socket', actions)(ChatContainer)
