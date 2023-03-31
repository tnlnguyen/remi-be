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

describe('POST /api/v1/user/login', () => {
  it('should return a new credential', async () => {
    const res = await request(conApp).post('/api/v1/user/login').send({
			email: 'nhanle1862@gmail.com',
			password: 'nhan',
    })
    expect(res.statusCode).toBe(200)
    expect(res.body).not.toBeNull()
  })
})
