type Post = string
type ApiError = string

const sleep = () => new Promise((rs)=>{
  setTimeout(rs, 2000)
})

const getPost = async(): Promise<Post> => {
  await sleep()
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
  Post,
  ApiError
}


