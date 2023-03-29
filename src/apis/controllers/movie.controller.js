const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { movieService } = require('../services')
const ApiError = require('../../utils/api-error')

const getMovie = catchAsync(async (req, res) => {
    const movie = await movieService.getAll()
    res.status(httpStatus.OK).send({ movie })
})

const shareMovie = catchAsync(async (req, res) => {
    const { url } = req.body
    const result = await movieService.share(url)
    res.send({ result })
})

module.exports = {
    getMovie,
    shareMovie,
}
