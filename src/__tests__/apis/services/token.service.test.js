const mockingoose = require('mockingoose')
const { generateAuthTokens } = require('../../../apis/services/token.service')

describe('Token service', () => {
  describe('generateAuthTokens', () => {
    it('should return new token', async () => {
      const user = {
        _id: '6425c4aa2472eabb45fefb50',
        email: 'nhanle1862@gmail.com',
        password: '$2a$10$Gfo5rvw2yZh9oBpdTdE4suPkKeokeIV.tROk0rmCCEpoCMqIYg1DG',
      }
      const results = await generateAuthTokens(user)

      expect(results.access).not.toBeNull()
      expect(results.refresh).not.toBeNull()
      expect(results.access.token).not.toBeNull()
      expect(results.refresh.token).not.toBeNull()
    })
  })
})
