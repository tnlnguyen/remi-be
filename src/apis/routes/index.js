const express = require('express')

const userRoute = require('./v1/user.route')
const movieRoute = require('./v1/movie.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/v1/user',
        route: userRoute,
    },
    {
        path: '/v1/movie',
        route: movieRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
