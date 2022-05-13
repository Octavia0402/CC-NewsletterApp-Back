const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const subscribersRouter = require('./router/subscribersRouter');
const utilsRouter = require('./router/utilsRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/subscribers", subscribersRouter);
app.use("/utils", utilsRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Newsletter app listening on port ${port}!`);
});