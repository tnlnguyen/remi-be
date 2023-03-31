const Token = require('../../../apis/models/token.model')
const mockingoose = require('mockingoose')

const tokenData = {
  _id: '61ec341698e78b1ec07d621e',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWVjMzQxNjk4ZTc4YjFlYzA3ZDYyMWIiLCJpYXQiOjE2NDI4Njk3ODIsImV4cCI6MTY0MzEyODk4MiwidHlwZSI6InJlZnJlc2gifQ.0uFdvbbA6FR9vnLwZouLbI3iI90Ffd7zzmfaE7MkZVo',
  user: '61ec341698e78b1ec07d621b',
  type: 'refresh',
  expires: '2022-01-25T16:43:02.411Z',
}

/**
 * Token model
 */
describe('Token model', () => {
  it('create & save token successfully', async () => {
    mockingoose(Token).toReturn(tokenData, 'create')

    const savedToken = await Token.create(tokenData)
    // Object Id should be defined when successfully saved to MongoDB.
    expect(JSON.parse(JSON.stringify(savedToken))).toMatchObject(tokenData)
  })
})
