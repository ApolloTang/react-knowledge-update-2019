import React, {
  useEffect
} from 'react'
import {connect} from 'react-redux'
import {
  TmapDispatchToProps,
  TmapStoreToProps,
  mapStoreToProps,
  mapDispatchToProps
} from './selector'


interface TAppProps {
  // subreddit:TmapStoreToProps['subreddit']
  date:TmapStoreToProps['date']
  posts:TmapStoreToProps['posts']
  isLoading:TmapStoreToProps['isLoading']
  errorMsg:TmapStoreToProps['errorMsg']
  dispatch_fetchSubredditPosts:TmapDispatchToProps['dispatch_fetchSubredditPosts']
}

type TPost = any // @TODO fixtype

const Post = ({post}:TPost) => {
  return(
    <div>{JSON.stringify(post, null, 2)}</div>
  )
}

const App = ({
  // subreddit,
  date,
  posts,
  isLoading,
  errorMsg,
  dispatch_fetchSubredditPosts,
}:TAppProps) => {
  const handle_refresh = () => {
    dispatch_fetchSubredditPosts()
  }

  useEffect(()=>{
    console.log('mounting')
    const busy = false
    if (!busy) {
      dispatch_fetchSubredditPosts()
    }
    return () => {
      console.log('un mounting')
    }
  } , [/* onMount and onUnmount] */])

    return(
      <div>
        <div>fetching list of posts from https://www.reddit.com/r/reactjs/</div>
        <div>last updated at: {date} <button onClick={handle_refresh}>refresh</button></div>
        {
          isLoading
            ? <div> ... Loading</div>
            : posts && posts.map(post=><Post key={post.id} post={post} />)
        }
        { errorMsg ? <div>{errorMsg}</div> : null}
        {/* <pre><code> */}
        {/*   {JSON.stringify(subreddit, null, 2)} */}
        {/* </code></pre> */}
      </div>
    )

}



export default connect(mapStoreToProps, mapDispatchToProps)(App)




