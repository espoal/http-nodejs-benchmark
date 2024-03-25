import express from 'express'
import { env } from 'node:process'

const port = Number(env.HTTP_PORT) || 8080
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World from express!')
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})
