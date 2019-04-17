'use strict';

const Hapi = require('hapi');
const Joi = require('joi')

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    server.route({
        method: 'POST',
        path: '/signup',
        handler:  (request, h) => {
    
            const payload = request.payload;
            return `Welcome ${encodeURIComponent(payload.username)}!`;
        },
        options: {
            auth: false,
            validate: {
                payload: {
                    username: Joi.string().min(1).max(20),
                    password: Joi.string().min(7)
                }
            }
        }
    });


    await server.start();
    console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
