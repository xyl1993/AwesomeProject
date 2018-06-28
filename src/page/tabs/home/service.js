import HttpUtils from '../../../utils/network/request/HttpUtils'
const source = 'GHSYSTEM';
export const getDaily = (params, data) => { return HttpUtils.getRequest(`day/${params}`, data, source).then(res => res); };