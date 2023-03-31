const User = require('../../../apis/models/user.model')
const mockingoose = require('mockingoose')

const userData = {
  email: 'nhanle1862@gmail.com',
  password: '$2a$10$Gfo5rvw2yZh9oBpdTdE4suPkKeokeIV.tROk0rmCCEpoCMqIYg1DG',
}

/**
 * User model
 */
describe('User model', () => {
  it('create & save user successfully', async () => {
    mockingoose(User).toReturn(userData, 'create')

    const savedUser = await User.create(userData)
    // Object Id should be defined when successfully saved to MongoDB.
    expect(JSON.parse(JSON.stringify(savedUser))).toMatchObject(userData)
  })
})
