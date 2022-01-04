const express = require('express')
const router = express.Router()
const agendaController = require('../controllers/AgendaController')
const mongoose = require('mongoose')



mongoose.connect("mongodb://localhost:27017/agendamento", {useNewUrlParser: true, useUnifiedTopology: true})

router.get('/', agendaController.index)
router.get('/getcalendar', agendaController.getcalendar)
router.get('/cadastro', agendaController.cadastro)
router.post('/create', agendaController.create)
router.get('/event/:id', agendaController.event)
router.post('/finish', agendaController.finish)
router.get('/list', agendaController.list)
router.get('/searchresult', agendaController.searchresult)





module.exports = router

