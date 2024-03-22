import express from 'express'
import { env } from 'node:process'

const port = Number(env.HTTP_PORT) || 8080
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
