// "name": "Peter Pan",
//       "image": "images/alberto.png",
//       "designation": "Chief Epicurious Officer",
//       "abbr": "CEO",
//       "description": "Our CEO, Peter, . . .",
//       "featured": false

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const LeaderSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    }
},{
    timestamps: true
});

var Leaders = mongoose.model('Leaders', LeaderSchema);

module.exports = Leaders;