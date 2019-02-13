/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Box } from "@rebass/emotion"

const inputStyles = css`
  border: none;
  border-radius: 0.25em;
  display: block;
  padding: 0.5em 1em;
  width: 100%;
`

const Input = ({ children, ...props }) => (
  <Box {...props}>
    <input css={inputStyles} autoFocus />
  </Box>
)

export default Input
