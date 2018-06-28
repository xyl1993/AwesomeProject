/**
 * 全局的请求动画状态
 */
import {handleActions} from 'redux-actions'
import * as type from '../constants/actionType'
const initialState = {
  showHUD: false
}

const Actions = {}

/**
 * 状态控制
 * 在 utils/progressHUD/index.js中暴露了方法来调用此action函数 更改loading状态
 */
Actions[type.FETCH_SHOW_HUD] = (state=initialState, action) => {
  if (state.showHUD !== action.payload) {
    return {
      ...state,
      showHUD: action.payload
    }
  } else {
    return {
      ...state
    }
  }
}

const reducer = handleActions(Actions, initialState)

export default reducer