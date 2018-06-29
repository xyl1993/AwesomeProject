
import HttpUtils from '../../../utils/network/request/HttpUtils'
import {SOURCE_GHSYSTEM} from '../../../constants/baseConfig'
//获取随机干货
export const fetchRandomData = (params, data) => { return HttpUtils.getRequest(`random/data/${params}`, data, SOURCE_GHSYSTEM).then(res => res); };