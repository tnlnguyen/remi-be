const Joi = require('joi')

const { password } = require('./customize.validation')

const shareSchema = {
    body: Joi.object().keys({
        url: Joi.string().required(),
    }),
}

module.exports = {
    shareSchema
}
