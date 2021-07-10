const express = require('express')
const app = express()

const controller = require('../controller/item.controller');
app.post('/item', (req, res) => {
    controller.create(req, res);
});

module.exports = app;