const validator = require('../utili/validator')

const Post = require('../models/post')

exports.createPost = async (req, res, next) => {
  try {
    const errors = validator.validate(req)

    if (errors.length !== 0) {
      const error = new Error('Validation failed')
      error.statusCode = 422
      error.data = errors
      throw error
    }

    const title = req.body.title
    const author = req.body.author
    const body = req.body.body

    const post = new Post({
      title: title,
      author: author,
      body: body,
      postTime: new Date(),
      modified: false
    })

    const savePost = await post.save()

    res.status(201).json({
      message: 'Post created successfully!',
      post: savePost
    })

    return savePost
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }

    next(err)
    return err
  }
}

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts: posts
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
    return err
  }
}

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)

    if (!post) {
      const error = new Error('Post not found')
      error.statusCode = 404
      error.data = error
      throw error
    }

    res.status(200).json({
      message: 'Fetched post successfully.',
      post: post
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
    return err
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const errors = validator.validate(req)

    if (errors.length !== 0) {
      const error = new Error('Validation failed')
      error.statusCode = 422
      error.data = errors
      throw error
    }

    const postId = req.params.postId
    const post = await Post.findById(postId)

    if (!post) {
      const error = new Error('Post not found')
      error.statusCode = 404
      error.data = error
      throw error
    }

    const title = req.body.title
    const author = req.body.author
    const body = req.body.body

    post.title = title
    post.author = author
    post.body = body
    post.modified = true
    post.modifyTime = new Date()

    const updatePost = await post.save()

    res.status(200).json({
      message: 'Update post successfully.',
      post: updatePost
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
    return err
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)

    if (!post) {
      const error = new Error('Post not found')
      error.statusCode = 404
      error.data = error
      throw error
    }

    await Post.findByIdAndDelete(postId)

    res.status(200).json({ message: 'Delete Successed' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
    return err
  }
}
