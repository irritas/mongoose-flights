const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },

    arrival: Date
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },

    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },

    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
        required: true
    },

    departs: {
        type: Date,
        default: () => {
            let date = new Date();
            return date.setFullYear(date.getFullYear() + 1);
        }
    },

    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);