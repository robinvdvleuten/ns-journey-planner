/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { normalize } from "polished"
import { Box, Flex } from "@rebass/emotion"
import { Provider } from 'unistore/react'
import Input from "./components/input"
import Chat from "./containers/chat"
import store from "./store"

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
  <Provider store={store}>
    <Flex alignItems="center" flexDirection="column" mt={4}>
      <Global styles={normalize()} />
      <Global styles={globalStyles} />
      <Box width="24rem">
        <Chat mb={4} />
        <Input />
      </Box>
    </Flex>
  </Provider>
);

export default Application;
