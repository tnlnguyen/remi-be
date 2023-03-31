const jwt = require('jsonwebtoken')
const ApiError = require('../../utils/api-error')
const httpStatus = require('http-status')
const axios = require('axios');

const { Movie } = require('../models')

const getAll = async () => {
    return await Movie.find({})
}

const share = async (url) => {
    const result = await axios.get(`https://youtube.com/oembed?url=${url}&format=json`)

    return await Movie.create({
        url,
        title: result?.data?.title,
        author: result?.data?.author_name,
        description: result?.data?.author_name
    })
}

module.exports = {
    getAll,
    share,
}
