//
// file: model.ts
//
// In this file we transform data from api to data the a shape
// that is consumable by reducer.


// ========================================
// Example of subreddit data shape from API
// ========================================

  // case (1): good data
  // ---------------
  const exampleData_apiSubreddit = {
    data: {
      children: [
        {
          data: {
            author: 'author1', title: 'title1', id: '1'
          }
        },
        {
          data: {
            author: 'author2', title: 'title2', id: '2'
          }
        },
      ]
    }
  }

  // case (2): good data but no post
  // ---------------------------
  const exampleData_apiSubreddit_empty = {  // eslint-disable-line
    data: {
      children: [
      ]
    }
  }

  // case (3, 4): possible bad data
  // --------------
  const exampleData_apiSubreddit_error1 = {}        // eslint-disable-line
  const exampleData_apiSubreddit_error2 = undefined // eslint-disable-line





// ==================================================
// Example of subreddit data shape in action payload
// ==================================================

  // case (1): transfrom from good data
  // -----------------------------------
  const exampleData_payloadSubredit = { // eslint-disable-line
    posts: [ // ReadonlyArray
        {
          author: 'author1', title: 'title1', id: '1'
        },
        {
          author: 'author2', title: 'title2', id: '2'
        }
    ],
    receivedAt: 1569818341066
  }


  // case (2): transfrom from good data but empty
  // ---------------------------------------------
  const exampleData_payloadSubredit_empty = { // eslint-disable-line
    posts: [], // ReadonlyArray
    receivedAt: 1569818341066
  }

  // case (3): transfrom from bad data
  // ----------------------------------
  const exampleData_payloadSubredit_error = { // eslint-disable-line
    posts: [], // ReadonlyArray
    receivedAt: 1569818341066
  }


// ==========
// Api schema
// ==========
  type TpostData_api = {
    data:{
      author: string
      title: string
      id: string
    }
  }

  type Tsubreddit_api =
    {
      // data: { children: TpostData_api[] | never[] }
      data: { children: TpostData_api[] | never[] }
    } & {} | undefined


// ==============
// payload schema
// ==============
  type Tpost = {
      author: string
      title: string
      id: string
    }
  type Tposts = ReadonlyArray<Tpost>

  interface Tsubreddit_serialized {
    posts:Tposts
    receivedAt: number
  }


// ==========================================================
// Here were transform (serialize) api data to the shape that
// is digestable by reducer:
//
//    Tsubreddit_api ==(transform)==> Tsubreddit_serialized
//
// ==========================================================
const apiSerializer_subreddit = (json:Tsubreddit_api):Tsubreddit_serialized => {
  const receivedAt = Date.now()

  let subreddit_serialized:Tsubreddit_serialized = {
    posts:[],
    receivedAt
  }


  if (json && json.data && json.data.children && Array.isArray(json.data.children)) {
    // const posts = (json.data.children as TpostData_api[]).map(
    const posts =  (json.data.children as []).map(
      (child:TpostData_api):Tpost => {
        const data = child.data
        const post = {
          author: data && data.author,
          title: data && data.title,
          id: data && data.id
        }
        return post
      }
    )

    subreddit_serialized = {
      posts,
      receivedAt
    }
  }

  return subreddit_serialized
}


export {
  exampleData_apiSubreddit,

  Tsubreddit_api,
  // TsubredditData_api,
  // Tposts_api,
  // Tpost_api,
  TpostData_api,

  apiSerializer_subreddit,

  Tpost,
  Tposts,
  Tsubreddit_serialized
}
