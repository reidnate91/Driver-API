'use strict';

const Hapi = require('hapi');
const Joi = require('joi');
const monk = require('monk');
const db = monk("mongodb://newuser:hello123@clusterproject-shard-00-00-e2ua7.mongodb.net:27017,clusterproject-shard-00-01-e2ua7.mongodb.net:27017,clusterproject-shard-00-02-e2ua7.mongodb.net:27017/wr-hauling?ssl=true&replicaSet=ClusterProject-shard-0&authSource=admin&retryWrites=true")
// require('dotenv').config();

// const db = require('db')
// db.connect({
//  url: process.env.MANGO_URL
// })
const drivers=  db.get("drivers")


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
        handler:  async (request, h) => {
    
            // const payload = request.payload;
            // return `Welcome ${encodeURIComponent(payload.username)}!`;
            const results = await drivers.insert(request.payload)
            return h.response('worked', results ).code(200);
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
    server.route({
        method: 'POST',
        path: '/login',
        handler:  async (request, h) => {
    
           
        },
    })


    await server.start();
    console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});


// const result = dotenv.config()
 
// if (result.error) {
//   throw result.error
// }
 
// console.log(result.parsed)

init();
