//
// file: model.ts
//
// In this file we transform data from api to data the a shape
// that is consumable by reducer.



// =============================================
//    Example of subreddit data shape from API
// =============================================

  // -------------------
  //  case(1) good data
  // -------------------
    const exampleData_apiSubreddit = {
      data: {
        children: [
          { data: { author: 'author1', title: 'title1', id: '1' } },
          { data: { author: 'author2', title: 'title2', id: '2' } }
          // ...
        ]
      }
    }

  // ----------------------
  //  case(2, 3) bad data
  // ----------------------
    const exampleData_apiSubreddit_bad1 = {}        // eslint-disable-line
    const exampleData_apiSubreddit_bad2 = undefined // eslint-disable-line



// =======================================================
//     Example of subreddit data shape in action payload
//     to be consumed by reducer
// =======================================================

  // ------------------------------------
  //  case(1): transfrom from good data
  // ------------------------------------
  const exampleData_payloadSubredit = { // eslint-disable-line
    posts: [ // <---  ReadonlyArray
      { author: 'author1', title: 'title1', id: '1' },
      { author: 'author2', title: 'title2', id: '2' }
      // ...
      // ...
    ],
    receivedAt: 1569818341066
  }


  // -------------------------------------
  //  case(2,3): transfrom from bad data
  // -------------------------------------
  const exampleData_payloadSubredit_empty = { // eslint-disable-line
    posts: [], // ReadonlyArray
    receivedAt: 1569818341066
  }



// ============
//  Api schema
// ============

  type Tpost_api = {
    author: string
    title: string
    id: string
  }

  type TpostData_api = {
    data: Tpost_api
  }

  type Tsubreddit_api =
    { data?: { children: TpostData_api[] } }  // case(1,2): good data, bad1
    | undefined                               // case(3): bad2


// ==========================================
//  payload schema to be consumed by reducer
// ==========================================

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


// ===========================================================
//   Here we transform (serialize) api data to the shape in
//   payload that is digestable by reducer:
//
//    Tsubreddit_api --(transform)--> Tsubreddit_serialized
// ===========================================================
const apiSerializer_subreddit = (json:Tsubreddit_api):Tsubreddit_serialized => {
  const receivedAt = Date.now()

  let subreddit_serialized = { // case(2,3) // bad data
    posts:[] as Tposts,
    receivedAt
  }

  if (json && json.data && json.data.children && Array.isArray(json.data.children)) {
    const posts =  json.data.children.map(
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

    subreddit_serialized = { // case(1) // good data
      posts,
      receivedAt
    }
  }

  return subreddit_serialized
}


export {
  exampleData_apiSubreddit,
  apiSerializer_subreddit,

  Tpost,
  Tposts,
  Tsubreddit_serialized
}
