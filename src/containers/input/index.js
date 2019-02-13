import React from 'react'
import { connect } from 'unistore/react'
import Input from "../../components/input"
import actions from '../../actions'

const InputContainer = ({ socket, sendMessage, ...props }) => {
  return <Input disabled={!socket} onMessage={sendMessage} {...props} />
}

export default connect('socket', actions)(InputContainer)
