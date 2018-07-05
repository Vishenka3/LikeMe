import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';

import routes from './routes/routes';

// Express app setup
const app = express();
const port = 4000;
let availablePort = port;

app.set('port', port);
const server = http.createServer(app);

// view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// serve static files from 'public'
app.use(express.static(path.join(__dirname, './public')));

// use routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'development' ? err : {},
    });
    next();
});

// logger
app.use(logger('combined'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = `${
        typeof port === 'string' ? 'Pipe' : 'Port'
    } ${port}`;

    switch (error.code) {
    case 'EACCES':
        console.log(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        if (availablePort - port < 10) {
            availablePort += 1;
            server.listen(availablePort);
        } else {
            console.log(`${bind} is already in use`);
            process.exit(1);
        }
        break;
    default:
        throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = `${
        typeof addr === 'string' ? 'pipe' : 'port'
    } ${
        typeof addr === 'string' ? addr : addr.port
    }`;
    console.log(`Server is listening on ${bind}`);
    console.log(`Visit: http://localhost:${addr.port}/api/customers`);
}

server.on('error', onError);
server.on('listening', onListening);

server.listen(availablePort);
