const express = require('express')

const { userController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const router = express.Router()
const authenticateMiddleware = require('../../../middlewares/auth')

router.post('/login', validate(authValidation.loginSchema), userController.login)
router.post('/register', validate(authValidation.registerSchema), userController.register)
router.post('/refresh', authenticateMiddleware, validate(authValidation.refreshSchema), userController.refreshToken)
router.post('/logout', authenticateMiddleware, validate(authValidation.refreshSchema), userController.logout)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */

/**
 * @swagger
 * /v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: object
 *                 properties:
 *                   name:
 *                     name: string
 *                     description: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               role: 
 *                 name: user
 *                 description: Company HR
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *
 * /v1/user/login:
 *   post:
 *     summary: Login with existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 */
