const express = require('express')

const app = express()

app.listen(3001, (req, res) => {
    console.log('serve listen prot: http://localhost:3001')
})