const express = require('express')
const bodyparser = require('body-parser')
var cors = require('cors');

const app = express()
app.use(cors());

const user = require('./appuserqueries')
const task= require('./taskqueries')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    console.log('app is running');
})


app.post('/adduser', user.createUser)
app.get('/login',user.loginUser)

app.get('/gettask',task.getTasks)
app.post('/addtask', task.createTask)
app.delete('/deletetask', task.deleteTask)
app.post('/edittask',task.editTask)

app.listen(3000, () => {
    console.log('listening to the port 3000...');
})