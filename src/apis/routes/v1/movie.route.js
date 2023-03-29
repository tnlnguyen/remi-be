const express = require('express')

const { movieController } = require('../../controllers')
const { movieValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const router = express.Router()
const authenticateMiddleware = require('../../../middlewares/auth')

router.get('/', movieController.login)
router.post('/share', authenticateMiddleware, validate(movieValidation.shareSchema), movieController.shareMovie)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie
 */

/**
 * @swagger
 * /v1/movie/share:
 *   post:
 *     summary: Share a new movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *             example:
 *               url: url
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   $ref: '#/components/schemas/Movie'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *
 * /v1/movie:
 *   get:
 *     summary: Get all movies
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       "200":
 *         description: OK
 */
