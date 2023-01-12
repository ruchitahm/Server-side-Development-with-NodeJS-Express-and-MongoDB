const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const authenticate = require('../authenticate');
const cors = require('./cors');

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
    // .all((req,res,next) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     next();
    // })

    //All Leaders
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
    .get(cors.cors, (req,res,next) => {
        Leaders.find(req.query)
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.create(req.body)
        .then((leader) => {
            console.log('Leader Created ', leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));    
    });
    // .get((req, res, next) => {
    //     res.end('Will send all the leaders to you!');
    // })
    
    // .post((req, res, next) => {
    //     res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    // })
    
    // .put((req, res, next) => {
    //     res.statusCode = 403;
    //     res.end('PUT operation not supported on /leaders');
    // })
    
    // .delete((req, res, next) => {
    //     res.end('Deleting all the leaders!');
    // })


// Leaders with specific ID
leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put(cors.corsWithOptions, authenticate.verifyUser,  authenticate.verifyAdmin,(req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
    // .get((req, res, next) => {
    // res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
    // })

    // .post((req, res, next) => {
    // res.statusCode = 403;
    // res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    // })

    // .put((req, res, next) => {
    // res.write('Updating the leader: ' + req.params.leaderId + '\n');
    // res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    // })

    // .delete((req, res, next) => {
    // res.end('Deleting the leader: '+ req.params.leaderId);
    // });
  
module.exports = leaderRouter;