const mockingoose = require('mockingoose')
const { Movie } = require('../../../apis/models')
const { getAll, share } = require('../../../apis/services/movie.service')

describe('Movies service', () => {
  describe('getAll', () => {
    it('should return the list of movies', async () => {
      mockingoose(Movie).toReturn(
        [
          {
            _id: '6425ce7f359686de09306009',
            url: 'https://www.youtube.com/watch?v=-PExnC26MMA',
            title: '5-Hour Study with Me / Pomodoro Timer 30-5 / Lo-Fi Relaxing Music / Day 137',
            author: 'Sean Study',
            description: 'Sean Study',
          },
          {
            _id: '6425ce7f359686de09306009',
            url: 'https://www.youtube.com/watch?v=-PExnC26MMA',
            title: '5-Hour Study with Me / Pomodoro Timer 30-5 / Lo-Fi Relaxing Music / Day 137',
            author: 'Sean Study',
            description: 'Sean Study',
          },
        ],
        'find'
      )
      const results = await getAll()
      expect(results[0].url).toBe('https://www.youtube.com/watch?v=-PExnC26MMA')
    })
  })
  describe('share', () => {
    it('should create a new movie', async () => {
      mockingoose(Movie).toReturn(
        {
          _id: '6425ce7f359686de09306009',
          url: 'https://www.youtube.com/watch?v=-PExnC26MMA',
          title: '5-Hour Study with Me / Pomodoro Timer 30-5 / Lo-Fi Relaxing Music / Day 137',
          author: 'Sean Study',
          description: 'Sean Study',
        },
        'create'
      )
      const results = await share('https://www.youtube.com/watch?v=-PExnC26MMA')
      expect(results.title).toBe('5-Hour Study with Me / Pomodoro Timer 30-5 / Lo-Fi Relaxing Music / Day 137')
    })
  })
})
