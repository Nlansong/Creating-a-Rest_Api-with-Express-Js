const express = require('express')
const app = express();
const userRouter = require('./routes/users')

const PORT = 8080;


//middlewares
app.use(express.json())
//app.use('/', userRouter)
app.use('/users', userRouter)

app.listen(PORT, () =>{
    console.log('server started successfully')
})