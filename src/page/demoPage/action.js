import HttpUtils from '../../utils/network/request/HttpUtils'

export const getCostRemarkList = (data) => { return HttpUtils.getRequest(`/login/test`,data).then(res => res); };