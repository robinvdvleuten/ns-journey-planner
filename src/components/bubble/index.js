/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Box } from "@rebass/emotion"

const bubbleStyles = css`
  background: #fff;
  border-radius: 0.25em 1em 1em 1em;
  color: #212121;
  margin-bottom: 0.25em;
  padding: 0.5em 1em;
`

const replyStyles = css`
  align-self: flex-end;
  background: #2c2c2c;
  color: #fff;
  border-radius: 5px 15px 15px 15px;
  border-radius: 1em 1em 0.25em 1em;
`

const Bubble = ({ children, reply, ...props }) => (
  <Box css={[bubbleStyles, reply && replyStyles]} {...props}>
    {children}
  </Box>
)

export default Bubble
