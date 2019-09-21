(function(){


  const typeIsAny:any = ()=>{}
  typeIsAny()
  // here `typeIsAny` is type any, we can do operation


  const typeIsUnknown:unknown = ()=>{}
  // here we don't know the type of `typeIsUnknown`, we can't do operation
  typeIsUnknown()
  //^^^^^^^^^^^^^^  [tsserver 2571] Object is of type 'unknown'

  if (typeof typeIsUnknown === 'function') {
    // here `type` has type `Function` it is callable
    typeIsUnknown()
  }

const value: unknown = 'Hello World'
const someString: string = value as string
const otherString = someString.toUpperCase()  // "HELLO WORLD"


})()
