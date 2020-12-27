const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(titles).toContain(
      'Testi otsikko 1'
    )
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Testi otsikko 3',
        author: 'Testaaja Sakari',
        url: 'www-osoite 3',
        likes: 1234
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Testi otsikko 3'
    )
})

afterAll(() => {
  mongoose.connection.close()
})