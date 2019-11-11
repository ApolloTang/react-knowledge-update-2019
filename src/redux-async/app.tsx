import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import { Tpost } from './model'
import {
  TmapDispatchToProps, TmapStoreToProps,
  mapStoreToProps, mapDispatchToProps
} from './selector'

type TPostProps = { post: Tpost }
type TLastUpdateDateProps = { date: string }
type TAppProps = TmapStoreToProps & TmapDispatchToProps


const Post = ({post}:TPostProps) => (<div> {post.author} : {post.title} </div>)


const LastUpdateDate = ({date}:TLastUpdateDateProps)=> (
  <div>
    <span>last updated at: </span><span data-testid="last-update">{date}</span>
  </div>
)



const App = ({
  date, posts, isLoading, errorMsg, dispatch_fetchSubredditPosts
}:TAppProps) => {
  const handle_refresh = () => {
    if (!isLoading) { dispatch_fetchSubredditPosts() }
  }

  useEffect(()=>{
    if (!isLoading) { dispatch_fetchSubredditPosts() }
    return () => { }
  }, [/* onMount and onUnmount] */])

  return(
    <div>
      <div>fetching list of posts from https://www.reddit.com/r/reactjs/</div>
      <div>
        <button onClick={handle_refresh} disabled={isLoading} >refresh</button>
        <span>{ isLoading ? '... Loading': '' }</span>
      </div>
      { date ? <LastUpdateDate date={date}/> : null }
      <div>
        {
          Array.isArray(posts)
          ? posts.map( post => <Post key={post.id} post={post} /> )
          : null
        }
      </div>
      { errorMsg ? <div data-testid="error-msg">{errorMsg}</div> : null }
    </div>
  )

}


const ConnectedApp = connect(mapStoreToProps, mapDispatchToProps)(App)
export {ConnectedApp}




