const mockingoose = require('mockingoose')
const User = require('../../../apis/models/user.model')
const { createUser, login } = require('../../../apis/services/user.service')

describe('Users service', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      mockingoose(User).toReturn(
        {
          _id: '6425c4aa2472eabb45fefb50',
          email: 'nhanle1862@gmail.com',
          password: '$2a$10$Gfo5rvw2yZh9oBpdTdE4suPkKeokeIV.tROk0rmCCEpoCMqIYg1DG',
        },
        'create'
      )

      const results = await createUser({ email: 'nhanle1862@gmail.com', password: 'nhan' })
      expect(results.email).toBe('nhanle1862@gmail.com')
    })
  })

  describe('login', () => {
    it('should return the credential', async () => {
      const user = {
        _id: '6425c4aa2472eabb45fefb50',
        email: 'nhanle1862@gmail.com',
        password: '$2a$10$Gfo5rvw2yZh9oBpdTdE4suPkKeokeIV.tROk0rmCCEpoCMqIYg1DG',
      }

      mockingoose(User).toReturn(user, 'findOne')

      const results = await login('nhanle1862@gmail.com', 'nhan')
      expect(JSON.parse(JSON.stringify(results))).toMatchObject(user)
    })
  })
})
