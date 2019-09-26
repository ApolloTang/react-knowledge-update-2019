import React, {
  useEffect
} from 'react'
import {connect} from 'react-redux'
import {
  mapStoreToProps,
  mapDispatchToProps
} from './selector'



const App = ({
  subreddit,
  dispatch_fetchSubredditPosts,
}:{
  subreddit: any // @TODO fixme
  dispatch_fetchSubredditPosts:any //@TODO fixme
}) => {
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

  const date = 'sept 20, 2019'
  return(
    <div>
      <h1>fetching list of posts from https://www.reddit.com/r/reactjs/</h1>
      <div>last updated at: {date} <button onClick={handle_refresh}>refresh</button></div>
      <div>Post goes here</div>
      <pre><code>
        {JSON.stringify(subreddit, null, 2)}
      </code></pre>
    </div>
  )
}



export default connect(mapStoreToProps, mapDispatchToProps)(App)




