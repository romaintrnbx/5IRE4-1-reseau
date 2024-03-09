require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./self_modules/routes/routes');
const routerSecure = require('./self_modules/routes/routesSecure');
const authorize = require('./self_modules/middlewares/authorize');
const corsOptions = require('./self_modules/middlewares/cors');
const cookieParser = require('cookie-parser'); 

const app = express();
app.use(cors(corsOptions))

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"1.1MB"}));
app.use(express.static('public'));
app.use(cookieParser()); 

app.use('/', router);
app.use(authorize);
app.use('/', routerSecure);
app.use('/logs', (req, res) => res.json(require('./logs.json'))); 

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.info(`[SERVER] Listening on https://5-ire-4-1-reseau.vercel.app:${port}`); 
})