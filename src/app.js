/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { normalize } from "polished"
import { Box, Flex } from "@rebass/emotion"
import Bubble from "./components/bubble"
import Chat from "./components/chat"
import Input from "./components/input"

const globalStyles = css`
  body {
    background: #dcdde0;
    font-family: system-ui, sans-serif;
    font-size: 1em;
    line-height: 1.5;
  }

  input {
    box-sizing: border-box;
    font-family: inherit;
    line-height: inherit;
  }
`

const Application = () => (
  <Flex alignItems="center" flexDirection="column" mt={4}>
    <Global styles={normalize()} />
    <Global styles={globalStyles} />
    <Box width="24rem">
      <Chat mb={4}>
        <Bubble>
          Hey!
        </Bubble>
        <Bubble>
          Can I have a banana?
        </Bubble>
        <Bubble reply>
          🍌
        </Bubble>
      </Chat>
      <Input />
    </Box>
  </Flex>
);

export default Application;
