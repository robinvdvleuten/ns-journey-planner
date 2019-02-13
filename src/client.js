import React from 'react'
import { hydrate } from 'react-dom'
import Application from './app'

hydrate(<Application />, window.root)

if (module.hot) {
  module.hot.accept()
}
