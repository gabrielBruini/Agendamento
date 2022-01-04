const AppointmentService = require('../services/AppointmentService')

class AgendaController {

    async index (req, res) {
        res.render("index")
    }
    async cadastro (req, res) {
        res.render('create')
    }

    async getcalendar (req, res) {
        var consultas = await AppointmentService.GetAll(false)
        res.json(consultas)
    }

    async create (req, res) { // post
        var {name, email, description, cpf, date, time} = req.body
        var status = await AppointmentService.Create(name, email, description, cpf, date, time)
        if(status) {
            res.redirect('/')
      
        } else {
            res.send("Ocorreu uma falha!")
        }

    }

    async event (req, res) { // get
    var id = req.params.id    
    var appointment = await AppointmentService.GetById(id)
    res.render("event", {appo: appointment})  
    }

    async finish (req, res) {
        var id = req.body.id
        await AppointmentService.Finish(id) 
        res.redirect("/")
    }

    async list (req, res) {
        var appos = await AppointmentService.GetAll(true)    
        res.render("list", {appos})
    }

    async searchresult (req, res) {
    var appos = await AppointmentService.Search(req.query.search)  
    res.render("list", {appos})

    }
    
}



module.exports = new AgendaController()