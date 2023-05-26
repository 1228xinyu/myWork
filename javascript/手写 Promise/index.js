const PEDDING = 'pedding'
const FULFILLED = 'fulfilled'
const REJECT = 'reject'

function type(res, resolve, reject) {
  // 判断 res 是否为 Promise 对象
  if ((typeof res === 'object' && res !== null) || typeof res === 'function') {
    // 存在 then 方法为 function
    if (typeof res.then === 'function') {
      const { then } = res
      // 调用 then 方法
      then.call(res, resolve, reject)
    }
  }

  // 为普通数据类型
  else {
    resolve(res)
  }
}

function isPromise(res) {
  if (typeof res === 'object' || typeof res === 'function') {
    // 存在 then 方法
    if (typeof res.then === 'function') {
      return true
    }
  }
  return false
}

class myPromise {
  #status = PEDDING // 状态
  #value = null // 存储值
  #onFulfilledList = [] // 成功回调列表
  #onRejectedList = [] // 失败回调列表

  constructor(excutor) {
    // 成功
    const resolve = data => {
      if (this.#status === PEDDING) {
        // 改变状态
        this.#status = FULFILLED
        this.#value = data

        // 判断 #onFulfilledList 的长度，并执行
        if (this.#onFulfilledList.length) {
          // 遍历执行
          for (const fn of this.#onFulfilledList) {
            fn()
          }
        }
      }
    }

    // 失败
    const reject = reason => {
      if (this.#status === PEDDING) {
        // 改变状态
        this.#status = REJECT
        this.#value = reason

        // 判断 #onRejectedList 的长度，并执行
        if (this.#onRejectedList.length) {
          // 遍历执行
          for (const fn of this.#onRejectedList) {
            fn()
          }
        }
      }
    }

    try {
      excutor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // resolve
  /* 
   1. 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
   2. thenable对象指的是具有then方法的对象
   3. 如果参数是一个原始值，或者是一个不具有then()方法的对象，方法返回一个新的 Promise 对象，状态为resolved
   4. Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
  */
  static resolve(tar) {
    return new Promise((resolved, rejected) => {
      // 无参数
      if (!arguments.length) {
        resolved(tar)
      }

      // 判断 tar 的类型
      // Promise
      if (isPromise(tar)) {
        tar.then(
          data => {
            resolved(data)
          },
          reason => {
            rejected(reason)
          }
        )
      }
      // 普通数据类型
      else {
        resolved(tar)
      }
    })
  }

  // reject
  static reject(tar) {
    return new Promise((resolved, rejected) => {
      rejected(tar)
    })
  }

  // all 方法
  // 1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，
  //    此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
  // 2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，
  //    此时第一个被reject的实例的返回值，会传递给p的回调函数
  static all(args) {
    // 判断 args 是否为 可迭代对象
    if (!typeof args[Symbol.iterator] === 'function') {
      throw new TypeError(`${args} is not a iterator object`)
    }

    return new Promise((resolve, reject) => {
      const list = [] // 存储结果的数组

      let vernier = 0
      // 循环遍历 args
      for (const [index, item] of args.entries()) {
        // 判断 item 是否为 Promise 对象
        if (isPromise(item)) {
          item.then(
            data => {
              vernier++
              list[index] = data
              // 判断 vernier 是否等于 args 的长度
              vernier === args.length && resolve(list)
            },
            reason => {
              reject(reason)
            }
          )
        }
        // 普通数据类型
        else {
          vernier++
          list[index] = item

          // 判断 vernier 是否等于 args 的长度
          vernier === args.length && resolve(list)
        }
      }
    })
  }

  // race 方法
  // 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
  // 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
  static race(args) {
    // 判断 args 是否为 可迭代对象
    if (!typeof args[Symbol.iterator] === 'function') {
      throw new TypeError(`${args} is not a iterator object`)
    }

    return new Promise((resolve, reject) => {
      for (const item of args) {
        if (isPromise(item)) {
          item.then(
            data => resolve(data),
            reason => reject(reason)
          )
        }
        // 普通数据类型
        else {
          resolve(item)
        }
      }
    })
  }

  // allSettled 方法
  // 1- 只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返
  //    回的 Promise 对象才会发生状态变更。
  // 2- 一旦发生状态变更，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，
  //    它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象
  static allSettled(args) {
    if (!Array.isArray(args)) {
      throw new TypeError(`${args} is not a array`)
    }

    return new Promise((resolve, reject) => {
      const list = []
      let vernier = 0
      for (const [index, item] of args.entries()) {
        // 判断 item 是否为 Promise
        if (isPromise(item)) {
          item.then(
            data => {
              list[index] = { status: FULFILLED, value: data }
              vernier++
              vernier === args.length && resolve(list)
            },
            reason => {
              list[index] = { status: REJECT, reason: reason }
              vernier++
              vernier === args.length && resolve(list)
            }
          )
        }
        // 普通数据类型
        else {
          list[index] = { status: FULFILLED, value: item }
          vernier++
          vernier === args.length && resolve(list)
        }
      }
    })
  }

  // any
  /* 
   只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，
   包装实例就会变成rejected状态。
  */
  static any(args) {
    // 判断 args 是否为 可迭代对象
    if (!typeof args[Symbol.iterator] === 'function') {
      throw new TypeError(`${args} is not a iterator object`)
    }

    return new Promise((resolve, reject) => {
      const list = []
      let vernier = 0
      // 遍历
      for (const [index, item] of args.entries()) {
        // 判断 item 是否为 Promise
        if (isPromise(item)) {
          item.then(
            data => {
              resolve(data)
            },
            reason => {
              list[index] = reason
              vernier++
              vernier === args.length && reject(list)
            }
          )
        }
        // 普通数据类型
        else {
          resolve(item)
        }
      }
    })
  }

  // then 方法
  then(onFulfilled, onRejected) {
    // Promsie 穿透
    onFulfilled = onFulfilled ? onFulfilled : data => data

    onRejected = onRejected
      ? onRejected
      : reason => {
          throw reason
        }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 成功
        if (this.#status === FULFILLED) {
          try {
            const res = onFulfilled(this.#value)
            type(res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }

        // 失败
        else if (this.#status === REJECT) {
          try {
            const res = onRejected(this.#value)
            type(res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }

        // 待定
        else {
          // 收集成功回调
          this.#onFulfilledList.push(() => {
            try {
              const res = onFulfilled(this.#value)
              type(res, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })

          // 收集失败回调
          this.#onRejectedList.push(() => {
            try {
              const res = onRejected(this.#value)
              type(res, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        }
      }, 0)
    })
  }

  // catch 方法
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // finally 方法
  finally(callback) {
    if (!typeof callback === 'function') {
      throw new TypeError(`${callback} is not a function`)
    }

    return this.then(
      value => Promise.resolve(callback()).then(() => value),
      reason =>
        Promise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }
}

module.exports = myPromise
