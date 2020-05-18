const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
}


const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => max.likes > blog.likes ? max : blog

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
