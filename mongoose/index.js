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
        
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'Updated test'}
        },{
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log(dish);
        
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });

});