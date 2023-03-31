const Movie = require('../../../apis/models/movie.model')
const mockingoose = require('mockingoose')

const movieData = {
  _id: '6425ce7f359686de09306009',
  url: 'https://www.youtube.com/watch?v=-PExnC26MMA',
  title: '5-Hour Study with Me / Pomodoro Timer 30-5 / Lo-Fi Relaxing Music / Day 137',
  author: 'Sean Study',
  description: 'Sean Study',
}

/**
 * Movie model
 */
describe('Movie model', () => {
  it('create & save movie successfully', async () => {
    mockingoose(Movie).toReturn(movieData, 'create')

    const savedMovie = await Movie.create(movieData)
    // Object Id should be defined when successfully saved to MongoDB.
    expect(JSON.parse(JSON.stringify(savedMovie))).toMatchObject(movieData)
  })
})
