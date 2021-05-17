const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyAG1IQ1IBzDHsry0V9qO4LUG50Z4HYVS70';

const getCoordsForAddress = async address => {
    // return {
    //     lat: 40.7484405,
    //     lng: -73.9878584
    // }
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    const data = response.data;

    if (!data || data.status === 'ZERO RESULTS') {
        const error = new HttpError('Could not find location for specified address', 422);
        throw error;
    }
    
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;