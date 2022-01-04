const express = require('express')
const app = express()
const router = require('./routes/rotas')
const AppoService = require('./services/AppointmentService')
const mailer = require('nodemailer')


app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use("/", router)


var tempo = 10000
setInterval(async () => {  
   await AppoService.SendNotification()
}, tempo)





app.listen(8000, () => {})

