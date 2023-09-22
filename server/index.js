import express from "express";
import ViteExpress from 'vite-express'
import ctrl from './controllers/courseCtrl.js'
import session from "express-session";
import authCtrl from "./controllers/authCtrl.js";

const{register, login, checkUser, logout} = authCtrl
const{getCourse} = ctrl

const app = express()

const PORT = 2319

app.use(express.urlencoded({extended: false})) //These two will decypher body objects for you.
app.use(express.json()) 
app.use(session({
    saveUnitialized: true,
    resave: false,
    secret: 'aslkdfjahsdk',
    cookie: {
        maxAge: 1000*60*60*48
    }
}))

app.get('/api/course/:courseId', getCourse)

//authentication endpoints
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/user', checkUser)
app.delete('/api/logout', logout)

ViteExpress.listen(app, PORT, () => console.log(`${PORT}!  We've got a ${PORT}!`)) //This opens the door to the express server and the vite front end as well.