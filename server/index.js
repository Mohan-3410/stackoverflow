const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter')
const questionRouter = require('./routes/questionRouter')
const answerRouter = require('./routes/answerRouter')
const botRouter = require('./routes/botRouter')
const dbConnect = require('./dbConnect')
dotenv.config({ path: "./.env" })

const app = express();

app.use(morgan('common'))
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
let origin = 'http://localhost:5173';
console.log("here env", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    origin = process.env.CORS_ORIGIN
}
app.use(cors({
    credentials: true,
    origin
}))

app.use('/auth', authRouter)
app.use('/questions', questionRouter)
app.use('/answer', answerRouter)
app.use('/bot', botRouter)
app.get('/', (req, res) => {
    res.send("this is a stack overflow clone API")
})

const PORT = process.env.PORT || 3000;
dbConnect().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))