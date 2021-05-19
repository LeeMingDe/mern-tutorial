const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(new HttpError("Something went wrong, could not find a place", 500));
    }

    if (!place) {
        return next(new HttpError('Could not find a place for the provided id', 404));
    }
    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        return next(new HttpError("Fetching places failed", 500));
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError('Could not find a place for the provided user id', 404));
    }
    
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true }))});
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        return next(new HttpError('Creating place failed, please try again'), 500);

    }

    if (!user) {
        return next(new HttpError('Could not find user with the provided id', 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess }); 
        user.places.push(createdPlace); 
        await user.save({ session: sess }); 
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Creating place failed, please try again'), 500);
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(new HttpError("Something went wrong, could not update place", 500));
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        return next(new HttpError("Something went wrong, could not delete place", 500));
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        return next(new HttpError("Could not find place for this id", 404));
    }

    if (!place) {
        const error = new HttpError('Could not find place for this id.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError("Something went wrong, could not delete place", 500));
    }
    
    res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
