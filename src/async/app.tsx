import React, {
  useEffect
} from 'react'
import {connect} from 'react-redux'
import {
  mapStoreToProps,
  mapDispatchToProps
} from './selector'



const App = ({
  dispatch_fetchSubredditPosts,
  dispatch_refreshSubredditPosts
}:{
  dispatch_fetchSubredditPosts:any //@TODO fixme
  dispatch_refreshSubredditPosts:any //@TODO fixme
}) => {
  const handle_refresh = () => {
    dispatch_refreshSubredditPosts()
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
  })

  const date = 'sept 20, 2019'
  return(
    <div>
      <h1>fetching list of posts from https://www.reddit.com/r/reactjs/</h1>
      <div>last updated at: {date} <button onClick={handle_refresh}>refresh</button></div>
      <div>Post goes here</div>
    </div>
  )
}



export default connect(mapStoreToProps, mapDispatchToProps)(App)




