const jwt = require('jsonwebtoken')
const ApiError = require('../../utils/api-error')
const httpStatus = require('http-status')

const { Movie } = require('../models')

const env = require('../../configs/env')

const getAll = async () => {
    return await Movie.find({})
}

const share = async (url) => {
    
}

module.exports = {
    getAll,
    share,
}
