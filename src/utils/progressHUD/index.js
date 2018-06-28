/**
 * Created by guangqiang on 2017/9/10.
 */
import React from 'react'
import {store} from '../../store'
import * as type from '../../constants/actionType'
import {createAction} from 'redux-actions'
import {Actions} from 'react-native-router-flux'

const loadingAction = createAction(type.FETCH_SHOW_HUD)

let sibling = undefined



const RootHUD = {
  show: () => {
    let currentStatus = store.getState().loading.showHUD;
    if (!currentStatus) {
      Actions.loading()
      store.dispatch(loadingAction(true))
    }
  },
  hidden: () => {
    store.dispatch(loadingAction(false))
  }
}

export {RootHUD}