/**
 * 将redux的状态管理框架理解为 javascript中的全局变量，与vue中的vuex框架差不多
 * 这个方法用来合并各个初始化对象
 */
'use strict';

import {combineReducers} from 'redux';
import settingState from './settingState';
import loading from './loading';
export default combineReducers({
  settingState,
  loading
});