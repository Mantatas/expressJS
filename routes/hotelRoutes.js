const express = require('express');
const router = express.Router();
const hotelController = require('./../controllers/hotelController')

router
.route('/')
.get(hotelController.getAllHotels)
.post(hotelController.createHotels)

router
.route('/:id')
.get(hotelController.getHotelById)
.patch(hotelController.updateHotel)
.delete(hotelController.deleteHotel)

module.exports = router;