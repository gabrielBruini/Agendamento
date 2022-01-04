var appointment = require('../models/Appointment')
var mongoose = require('mongoose')
var AppointmentFactory = require('../factories/AppointmentFactory')
const mailer = require('nodemailer')

const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {

   async Create(name, email, description, cpf, date, time) {
       var newAppo = new Appo({
           name, 
           email, 
           description, 
           cpf, 
           date, 
           time, 
           finished: false, 
           notified: false
       })
       try {
        await newAppo.save()
        return true

       } catch (err) {
           console.log(err)
           return false
           
       }

    }

    async GetAll(showFinished) {

        if(showFinished) {
           return await Appo.find()
        } else {
            var appos = await Appo.find({'finished': false})
            var appointments = []           

            appos.forEach(appointment => {
                if(appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }

            })
            return appointments
        }

    }

    async GetById(id) {
        try {
            var event = await Appo.findOne({'_id': id})                      
            return event

        } catch (err) {
            console.log(err)

        }
      
    }

    async Finish(id) {
        try {
        await Appo.findByIdAndUpdate(id, {finished: true})      
         return true

        } catch (err) {
            console.log(err)
            return false

        }
      

    }
    async Search(query) {
        try {
            var appos = await Appo.find().or([{email: query},{cpf: query}])
            return appos

        }
         catch (err) {
             console.log(err)
             return []
         }
       
    }
    async SendNotification () {
        var transporter = mailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "20811938803bc9",
                pass: "68a6bbd6bbac73"
            }

        })
       var appos = await this.GetAll(false)
       appos.forEach(async app => {

        var date = app.start.getTime()
        var hour = 1000 * 60 * 60
        var gap = date - Date.now()

        if(gap <= hour) {

            if(!app.notified) {

                await Appo.findByIdAndUpdate(app.id, {notified: true})

                transporter.sendMail({
                    from: "Gabriel Souza <gabriel@hotmail.com>",
                    to: app.email,
                    subject: "Sua consulta irá acontecer em breve!",
                    text: "Sua consulta irá acontecer em uma hora, ou menos."
                }).then( (data) => {
                    console.log(data)
                 

                }).catch(err => {
                    console.log(err)

                })
              
            }

        }

       })
    }

}

module.exports = new AppointmentService()