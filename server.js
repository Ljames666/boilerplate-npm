/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

let fs = require('fs');
let express = require('express');
let app = express();

if (!process.env.DISABLE_XORIGIN) {
    app.use(function (req, res, next) {
        let allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        let origin = req.headers.origin || '*';
        if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
        }
        next();
    });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json').get(function (req, res, next) {
    console.log('requested');
    let data = {
        name: 'fcc-learn-npm-package-json',
        dependencies: {
            express: '^4.14.0',
        },
        main: 'server.js',
        scripts: {
            start: 'node server.js',
        },
        repository: {
            type: 'git',
            url: 'https://github.com/Ljames666/boilerplate-npm.git',
        },
        author: 'Jamerson Paz',
    };
    res.json(data);
});

app.route('/').get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Respond not found to all the wrong routes
app.use(function (req, res, next) {
    res.status(404);
    res.type('txt').send('Not found');
});

// Error Middleware
app.use(function (err, req, res, next) {
    if (err) {
        res.status(err.status || 500)
            .type('txt')
            .send(err.message || 'SERVER ERROR');
    }
});

//Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening on port ' + listener.address().port);
});
