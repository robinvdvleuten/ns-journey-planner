/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Box, Flex } from "@rebass/emotion"

const Chat = ({ children, ...props }) => (
  <Box {...props}>
    <Flex alignItems="flex-start" flexDirection="column">
      {children}
    </Flex>
  </Box>
)

export default Chat
