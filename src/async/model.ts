//
// file: model.ts
//
// In this file we transform data from api to data the a shape
// that is consumable by reducer.


// =========================
// Example of Api data shape
// =========================
const mockApi = { // Tsubreddit_api
  data: {         // TsubredditData_api
    children: [   // Tposts_api
      {           // Tpost_api
        data: {   // TpostData_api
          author: 'author', title: 'title', id: '1'
        }
      },
      {           // Tpost_api
        data: {   // TpostData_api
          author: 'author', title: 'title', id: '1'
        }
      },
    ]
  }
}


// ==========
// Api schema
// ==========
type Tsubreddit_api = typeof mockApi
type TsubredditData_api = Tsubreddit_api['data']
type Tposts_api = TsubredditData_api['children']
type Tpost_api = Tposts_api[0]
type TpostData_api = Tpost_api['data']


// ==============
// reducer schema
// ==============
type Tpost= TpostData_api
type Tposts = Tpost[]|[]
interface Tsubreddit_serialized {
  posts:Tposts
  receivedAt: number
}


// ==========================================================
// Here were transform (serialize) api data to the shape that
// is digestable by reducer:
//
//    Tsubreddit_api ===> Tsubreddit_serialized
//
// ==========================================================
const apiSerializer_subreddit = (json:Tsubreddit_api):Tsubreddit_serialized => {
  const receivedAt = Date.now()

  let subreddit_serialized:Tsubreddit_serialized = {
    posts:[],
    receivedAt
  }

  if (json && json.data && json.data.children && json.data.children.length !== 0) {
    const posts = json.data.children.map(
      (child:Tpost_api):Tpost => {
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
  mockApi,
  Tsubreddit_api,
  TsubredditData_api,
  Tposts_api,
  Tpost_api,
  TpostData_api,

  apiSerializer_subreddit,

  Tpost,
  Tposts,
  Tsubreddit_serialized
}
