const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A hotel must have a name'],
        unique:true
    },
    address: {
        type: String,
        required: [true, 'A hotel must have an address']
    },
    ranking: {
        type: Number,
        default: 4.5,
        min:[1,'Ranking must be above 1'],
        max:[5,'Ranking must be below 5']
    },
    price: {
        type: Number,
        required: [true, 'A hotel must have a price']
    },
    price_discount: {
        type: Number,
    },
    comfort:{
        type: String,
        required: [true, 'A hotel must have a stars level'],
        enum: {
            values: ['1', '2', '3', '4', '5', '6', '7']
        }
    },
    summary:{
        type: String,
        trim: true,
        required:[true, 'A hotel must have a summary']
    },
    description:{
        type: String,
        trim: true
    },
    image_cover:{
        type: String,
        required: [true, 'A hotel must have a cover']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;