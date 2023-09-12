import express from "express";
import ViteExpress from 'vite-express'

const app = express()

const PORT = 2319

app.use(express.urlencoded({extended: false})) //These two will decypher body objects for you.
app.use(express.json()) //

ViteExpress.listen(app, PORT, () => console.log(`${PORT}!  We've got a ${PORT}!`)) //This opens the door to the express server and the vite front end as well.