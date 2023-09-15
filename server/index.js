import express from "express";
import ViteExpress from 'vite-express'
import ctrl from './controller.js'
const{getCourse} = ctrl

const app = express()

const PORT = 2319

app.use(express.urlencoded({extended: false})) //These two will decypher body objects for you.
app.use(express.json()) 

app.get('/api/course/:id', getCourse)

ViteExpress.listen(app, PORT, () => console.log(`${PORT}!  We've got a ${PORT}!`)) //This opens the door to the express server and the vite front end as well.