/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Box } from "@rebass/emotion"
import { Formik } from 'formik';

const inputStyles = css`
  border: none;
  border-radius: 0.25em;
  display: block;
  padding: 0.5em 1em;
  width: 100%;
`

const Input = ({ children, disabled, onMessage, ...props }) => (
  <Formik initialValues={{ message: "Ik wil van Aml naar Bgn" }} onSubmit={async (values, actions) => {
    await onMessage(values.message)
    actions.setValues({ message: "" })
    actions.setSubmitting(false)
  }}>
    {({ values, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
      <Box {...props}>
        <form onSubmit={handleSubmit}>
          <input name="message" value={values.message} disabled={disabled || isSubmitting} css={inputStyles} onBlur={handleBlur} onChange={handleChange} autoFocus />
        </form>
      </Box>
    )}
  </Formik>
)

export default Input
