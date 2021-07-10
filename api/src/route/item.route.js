const express = require('express')
const app = express()

const controller = require('../controller/item.controller');

app.post('/item', (req, res) => {
    controller.create(req, res);
});
app.get('/item', (req, res) => {
    controller.getAll(req, res);
});
app.get('/item/:id', (req, res) => {
    controller.getById(req, res);
});
app.put('/item/:id', (req, res) => {
    controller.updateById(req, res);
});
app.delete('/item/:id', (req, res) => {
    controller.deleteById(req, res);
});

module.exports = app;