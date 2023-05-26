const myPromise = require('./index')

const h1 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('a')
    reject('a')
  }, 3000)
  // resolve('a')
  // throw '错误'
})

const h2 = Promise.resolve('b')
// const h3 = Promise.reject('c')

// // const s = myPromise.race([h1, h2, h3])

// const s = myPromise.any([h1, h2, h3])

// s.then(data => {
//   console.log(data)
// }).catch(reason => {
//   console.log(reason)
// })
