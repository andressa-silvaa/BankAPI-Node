const express = require('express');
const router = require('./routers/router')
const app = express();

app.use(express.json())
app.use(router)


app.listen(3000, () => console.log('running'))