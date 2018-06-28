/**
 * 基础数据配置
 */

 //请求接口项目名
const ApiSource = {
  HFSYSTEM:'HFSYSTEM',
  GHSYSTEM:'GHSYSTEM'
}


const articleType = {
  PICTURE: 'PICTURE',
  READING: 'READING',
  MUSIC: 'music',
  MOVIE: 'MOVIE',
  SERIAL: 'serial',
  ESSAY: 'essay',
  QUESTIONS: 'question'
}

const beginTime = {
  picture: {
    beginYear: 2012,
    beginMonth: 9
  },
  essay: {
    beginYear: 2012,
    beginMonth: 9
  },
  serial: {
    beginYear: 2016,
    beginMonth: 0  //0
  },
  question: {
    beginYear: 2012,
    beginMonth: 9
  },
  music: {
    beginYear: 2016,
    beginMonth: 0
  }
}

const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const logEventType = {
  enterPage: 3001,
  exitPage: 3002,
  click: 3003,
  slide: 3004,
  gesture: 3005
}


const sharePlatform = {
  QQ: 0,
  SINA: 1,
  WECHAT: 2,
  WECHATMOMENT: 3,
  QQZONE: 4,
  FACEBOOK: 5
}

export {articleType, beginTime, monthList, logEventType, ApiSource, sharePlatform}