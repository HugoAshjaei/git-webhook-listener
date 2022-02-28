const app = require("./app"),
    dotenv = require('dotenv'),
    en = require('./helper/language/en.json');

dotenv.config();

// ports
const PORT = process.env.PORT || 3000;


// create http server
app.listen(PORT, () => console.log(en.serverIsRunning + PORT));