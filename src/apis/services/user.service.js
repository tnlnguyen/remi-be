const jwt = require('jsonwebtoken')
const ApiError = require('../../utils/api-error')
const httpStatus = require('http-status')

const { User } = require('../models')

const tokenService = require('./token.service')
const env = require('../../configs/env')

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }

    return await User.create(userBody)
}

const login = async (email, password) => {
    const user = await getUserByEmail(email)
    
    if (!user) {
        const user = await createUser({email, password})

        return user
    }

    if (!(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }

    return user
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email })
}

const getUserById = async (id) => {
    return await User.findOne({ _id: id })
}

const logout = async (refreshToken) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken)
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await refreshTokenDoc.remove()
    return true
}

const refreshToken = async (data) => {
    const { refreshToken } = data

    const oldRefresh = await tokenService.getTokenByRefresh(refreshToken)
    const oldRefreshToken = jwt.verify(oldRefresh?.token, env.passport.jwtToken)

    if (!oldRefreshToken || oldRefreshToken.exp < moment().unix()) {
        return null;
    }

    const user = await getUserById(oldRefreshToken.sub)

    return user;
}

module.exports = {
    createUser,
    login,
    getUserByEmail,
    refreshToken,
    logout,
    getUserById,
}
