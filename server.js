const express = require('express')
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')

// Initializing config file
dotenv.config({path: './config/config.env'})

// Port no.
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on port no ${port}`.rainbow)
})