import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Application from './app'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const markup = renderToString(<Application />)

    res.send(
      // prettier-ignore
      `<!doctype html>
<html lang="">
    <head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>NS Journey Planner 🚂</title>
        <script src="${assets.client.js}" defer crossorigin></script>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    )
  })

export default server
