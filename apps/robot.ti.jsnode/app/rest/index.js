const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));

app.use('/psid', require('./controllers/psid.controller'));

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(port, () => console.log(`App listening on port ${port}`));
