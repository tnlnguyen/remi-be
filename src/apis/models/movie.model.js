const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Movie', movieSchema)
