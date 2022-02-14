require("dotenv").config({ path: "../../.env" });
const express = require('express')
const {setupLogging} = require('./logging')

const {ROUTES} = require('./routes')
const {setupProxies} = require('./proxy')

const app = express()
const port = process.env.GATEWAY_PORT

setupLogging(app)
setupProxies(app, ROUTES)

app.listen(port, () => {
	console.log(`Gateway up at http://localhost:${port}`)
})
