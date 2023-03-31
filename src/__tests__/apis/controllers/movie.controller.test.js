const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const { getOsEnv } = require('../../../libs/os')
const request = require('supertest')
const expressLoader = require('../../../loaders/expressLoader')

dotenv.config({ path: path.join(process.cwd(), `.env`) })

let conApp, conServer

beforeAll(async () => {
  const  {app, server} = await expressLoader()
	conApp = app
	conServer = server
})

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(getOsEnv('DB_CONNECTION'))
})

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close()
	conServer.close()
})

describe('GET /api/v1/movie/', () => {
  it('should return list of movie', async () => {
    const res = await request(conApp).get('/api/v1/movie')
    expect(res.statusCode).toBe(200)
  })
})

describe('POST /api/v1/movie/share', () => {
  it('should create movie', async () => {
    const res = await request(conApp).post('/api/v1/movie/share').set('Authorization', 'test').send({
      url: 'https://www.youtube.com/watch?v=-PExnC26MMA',
    })
    expect(res.statusCode).toBe(200)
  })
})
