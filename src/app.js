/** @jsx jsx */
import { Global, jsx } from '@emotion/core'
import { normalize } from "polished"

const Application = () => (
  <div>
    <Global styles={normalize()} />
    Hello, World!
  </div>
);

export default Application;
