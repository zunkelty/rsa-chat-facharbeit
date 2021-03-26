const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {}
});
const ApiManager = require('./ApiManager');
const apiManager = new ApiManager(io);

const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { ieNoOpen } = require('helmet');

app.disable("X-Powered-By");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(helmet.hidePoweredBy());

http.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}!`);
});

// Routes
app.use('/api', apiManager.getRouter());

//Serve static files
app.use('/public', express.static(__dirname + '/public' ));
app.use('/', express.static('dist'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../' + '/dist/index.html'));
});