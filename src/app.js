/** @jsx jsx */
import { Global, jsx } from '@emotion/core'
import { normalize } from "polished"
import { Box, Flex } from "@rebass/emotion"

const Application = () => (
  <Flex justifyContent="center" mt={4}>
    <Global styles={normalize()} />
    <Box>
      Hello, World!
    </Box>
  </Flex>
);

export default Application;
