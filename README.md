# Agendamento
Projeto feito com MongoDb, nodemailer, express, ejs. Uma API feita para agendamento de consultas, e quando o tempo está chegando perto um e-mail é enviado.


### Get /
Index

#### Parametros

### Get /getcalendar
Esse endpoint é o responsável por requisitar todas as consultas

#### Parametros

### Get /cadastro
Esse endpoint é o responsável para renderizar a página de cadastro de consulta.

#### Parametros


### Post /create
Esse endpoint é o responsável cadastrar uma consulta.

### Parametros
Nome, cpf, email, descrição e data

### Get /event/:id
Esse endpoint é o responsável para procurar as futuras consultas

### Parametros
Id

### Post /finish
Feito para concluir uma consulta

### Parametros
Id

### Get /list
Procura todas as consultas não finalizadas ainda

### Parametros
