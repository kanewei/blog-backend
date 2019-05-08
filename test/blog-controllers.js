const expect = require('chai').expect
const sinon = require('sinon')
const mongoose = require('mongoose')

const blogController = require('../controllers/blog')
const validator = require('../utili/validator')
const Post = require('../models/post')

describe('Blog test', function () {
  before(function (done) {
    let mongodbUrl = 'mongodb://127.0.0.1:27017/test-post'
    mongoose.connect(mongodbUrl, {
      useNewUrlParser: true
    })
      .then(() => {
        const post = new Post({
          title: 'title',
          author: 'author',
          body: 'body',
          postTime: new Date(),
          modified: false,
          _id: '5cd14cd42e97fd01a9339973'
        })
        return post.save()
      })
      .then(() => {
        done()
      })
  })

  describe('Create post', function () {
    it('Post invalid', function (done) {
      sinon.stub(validator, 'validate').returns([1])

      blogController.createPost({}, {}, () => {}).then((result) => {
        expect(result).to.be.an('error')
        expect(result).to.have.property('statusCode', 422)
      })
        .then(() => {
          done()
          validator.validate.restore()
        })
    })

    it('Post successed', function (done) {
      const req = {
        body: {
          title: 'title',
          author: 'author',
          body: 'body'
        }
      }

      const res = {
        statusCode: 500,
        result: null,
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.result = data
        }
      }

      blogController.createPost(req, res, () => {}).then(() => {
        expect(res).to.have.property('statusCode', 201)
        expect(res.result).to.have.property('post')
        expect(res.result.post).to.have.property('title')
        expect(res.result.post).to.have.property('modified', false)
      })
        .then(() => {
          done()
        })
    })
  })

  describe('Get posts', function () {
    it('Should get posts', function (done) {
      const res = {
        result: null,
        status: function () {
          return this
        },
        json: function (data) {
          this.result = data
        }
      }

      blogController.getPosts({}, res, () => {}).then(() => {
        expect(res.result).to.have.property('posts')
      })
        .then(() => {
          done()
        })
    })
  })

  describe('Get post', function () {
    it('Post not found', function (done) {
      const req = {
        params: {
          postId: '5cd14cd42e97fd01a9339973'
        }
      }

      const res = {
        statusCode: 500,
        result: null,
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.result = data
        }
      }

      sinon.stub(Post, 'findById').returns(null)

      blogController.getPost(req, res, () => {}).then((result) => {
        expect(result).to.be.an('error')
        expect(result).to.have.property('statusCode', 404)
      })
        .then(() => {
          done()
          Post.findById.restore()
        })
    })

    it('Should get post', function (done) {
      const req = {
        params: {
          postId: '5cd14cd42e97fd01a9339973'
        }
      }

      const res = {
        statusCode: 500,
        result: null,
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.result = data
        }
      }

      blogController.getPost(req, res, () => {}).then(() => {
        expect(res.result).to.have.property('post')
        expect(res).to.have.property('statusCode', 200)
      })
        .then(() => {
          done()
        })
    })
  })

  describe('Update post', function () {
    it('Update post invalid', function (done) {
      sinon.stub(validator, 'validate').returns([1])

      blogController.updatePost({}, {}, () => {}).then((result) => {
        expect(result).to.be.an('error')
        expect(result).to.have.property('statusCode', 422)
      })
        .then(() => {
          done()
          validator.validate.restore()
        })
    })

    it('Post not found', function (done) {
      const req = {
        params: {
          postId: '5cd14cd42e97fd01a9339973'
        }
      }

      sinon.stub(Post, 'findById').returns(null)

      blogController.updatePost(req, {}, () => {}).then((result) => {
        expect(result).to.be.an('error')
        expect(result).to.have.property('statusCode', 404)
      })
        .then(() => {
          done()
          Post.findById.restore()
        })
    })

    it('Should update post', function (done) {
      const req = {
        params: {
          postId: '5cd14cd42e97fd01a9339973'
        },
        body: {
          title: 'updateTitle',
          author: 'updateAuthor',
          body: 'updateBody'
        }
      }

      const res = {
        statusCode: 500,
        result: null,
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.result = data
        }
      }

      blogController.updatePost(req, res, () => {}).then(() => {
        expect(res).to.have.property('statusCode', 200)
        expect(res.result).to.have.property('post')
        expect(res.result.post).to.have.property('modifyTime')
        expect(res.result.post).to.have.property('modified', true)
      })
        .then(() => {
          done()
        })
    })
  })

  describe('Delete post', function () {
    it('Post not found', function (done) {
      const req = {
        params: {
          postId: '5cd14cd42e97fd01a9339973'
        }
      }

      sinon.stub(Post, 'findById').returns(null)

      blogController.deletePost(req, {}, () => {}).then((result) => {
        expect(result).to.be.an('error')
        expect(result).to.have.property('statusCode', 404)
      })
        .then(() => {
          done()
          Post.findById.restore()
        })
    })

    it('Should delete post', function (done) {
      const req = {
        params: {
          postId: '5cd14cd42e97fd01a9339973'
        }
      }

      const res = {
        statusCode: 500,
        result: null,
        status: function (code) {
          this.statusCode = code
          return this
        },
        json: function (data) {
          this.result = data
        }
      }

      blogController.deletePost(req, res, () => {}).then(() => {
        expect(res).to.have.property('statusCode', 200)
      })
        .then(() => {
          done()
        })
    })
  })

  after(function (done) {
    Post.deleteMany({})
      .then(() => {
        return mongoose.disconnect()
      })
      .then(() => {
        done()
      })
  })
})
