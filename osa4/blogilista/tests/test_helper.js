const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Testi otsikko 1',
        author: 'Testaaja Matti',
        url: 'www-osoite 1',
        likes: 1001
    },
    {
        title: 'Testi otsikko 2',
        author: 'Testaaja Pekka',
        url: 'www-osoite 2',
        likes: 2002 
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'test', url: 'test-url', likes: 69 })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
  }