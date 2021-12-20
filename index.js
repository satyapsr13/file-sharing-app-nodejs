const express = require('express')
const app = express()
const port = 3000
const connectdb = require("./config/db");
console.log('hello');

connectdb();
app.use("/api/files", require("./routes/file"));
app.use("/files", require("./routes/show"));
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))