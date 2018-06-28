var moment = require('moment');
function convertTime(time) {
  if (time <= 9)
    return '0' + time;
  return time;
}

export function getCurrentDate() {
  var date = new Date();
  return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}

export function getYesterdayFromDate(date) {
  var date = new Date(date);
  date.setDate(date.getDate() - 1);

  return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}

export function getUpDate() {
  let _today = moment();
  return _today.subtract(1, 'days').format('YYYY/MM/DD'); /*前一天的时间*/
}