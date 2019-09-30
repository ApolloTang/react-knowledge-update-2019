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

import {
  Tpost
} from './model'

type TAppProps = TmapStoreToProps & TmapDispatchToProps

type TPostProps = {
  post:Tpost
}

const Post = ({post}:TPostProps) => {
  return(
    <div>
      {post.author} : {post.title}
    </div>
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
        <div>
          <button onClick={handle_refresh} disabled={isLoading} >refresh</button>
          <span>{ isLoading ? '... Loading':''}</span>
        </div>
        <div>{date?`last updated at: ${date}`:null}</div>
        { Array.isArray(posts) ? (posts as Tpost[]).map((post)=><Post key={post.id} post={post} />) : null }
        { errorMsg ? <div>{errorMsg}</div> : null}
        {/* <pre><code> */}
        {/*   {JSON.stringify(subreddit, null, 2)} */}
        {/* </code></pre> */}
      </div>
    )

}


export default connect(mapStoreToProps, mapDispatchToProps)(App)




