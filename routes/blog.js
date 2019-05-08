const express = require('express')
const { body } = require('express-validator/check')

const blogController = require('../controllers/blog')

const router = express.Router()

// GET /blog/posts
router.get('/posts', blogController.getPosts)

// GET /blog/post
router.get('/post/:postId', blogController.getPost)

// POST /blog/post
router.post(
  '/post',
  [
    body('title')
      .trim()
      .isLength({ min: 1 }),
    body('author')
      .trim()
      .isLength({ min: 1 }),
    body('body')
      .trim()
      .isLength({ min: 1 })
  ],
  blogController.createPost
)

// PUT /blog/post
router.put(
  '/post/:postId',
  [
    body('title')
      .trim()
      .isLength({ min: 1 }),
    body('author')
      .trim()
      .isLength({ min: 1 }),
    body('body')
      .trim()
      .isLength({ min: 1 })
  ],
  blogController.updatePost
)

// Delete /blog/post
router.delete('/post/:postId', blogController.deletePost)

module.exports = router
