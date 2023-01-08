const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

// const url = 'mongodb://localhost:27017/restaurant';
const connect = mongoose.connect('mongodb://127.0.0.1/restaurant');

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    })
    .then((dish) => {
        console.log(dish);
        
        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });

});