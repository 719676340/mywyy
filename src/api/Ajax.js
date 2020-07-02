import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += dataStr
      }
      promise = axios.get(url)
    }
    if (type === 'POST') {
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (err) {
      reject(err)
    })
  })
}
// 普通的axios请求的样式是 axios.post(url, data) axios.post(url, data) 返回的是一个promise使用then和catch
// 分别对resolve和reject进行捕获
// 现在用这样的写法主要是要返回数据中的data的话还需要进行var result =response.data 进行处理现在这样处理就会可以直接reuslt=函数的返回值
