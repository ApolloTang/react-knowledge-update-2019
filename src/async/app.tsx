import React, {
  useEffect
} from 'react'
import {connect} from 'react-redux'
import {
  mapStoreToProps,
  mapDispatchToProps
} from './selector'



const App = () => {
  useEffect(()=>{

    console.log('mounting')
    const busy = false
    if (busy) {
      dispatch_fetchPost()
    }
    return () => {
      console.log('un mounting')
    }
  })
  const date = 'sept 20, 2019'
  return(
    <div>
      <h1>fetching list of posts from https://www.reddit.com/r/reactjs/</h1>
      <div>last updated at: {date} <button>refresh</button></div>
      <div>Post goes here</div>
    </div>
  )
}



export default connect(mapStoreToProps, mapDispatchToProps)(App)




