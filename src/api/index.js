import ajax from './Ajax'
const _baseUrl = 'http://api.javaswing.cn'
// const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
// 获取banner图片数据
export const getBannerList = () => ajax(_baseUrl + '/banner')
export const getPersonalized = () => ajax(_baseUrl + '/personalized')
export const getPersonalizedMV = () => ajax(_baseUrl + '/personalized/mv')
