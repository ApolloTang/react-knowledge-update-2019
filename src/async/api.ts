type Post = string
type ApiError = string

const getPost = (): Promise<Post> => {
  console.log('http get post')
  return new Promise((rs, rj)=>{
    const error = false
    if (error) {
      rj('error')
    } else {
      rs('foo')
    }
  })
}

const subReddit = {
  getPost
}

export default {
  subReddit
}

export {
  Post
}


