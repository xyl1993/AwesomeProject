/**
 * Created by guangqiang on 2017/8/30.
 */
// const _TouchableOpacity = Venilog.createVenilogComponent(TouchableOpacity)
// const _Button = Venilog.createVenilogComponent(Button)
// export {_TouchableOpacity as TouchableOpacity}
// export {_Button as Button}

import {
  View,
  ScrollView,
  ListView,
  RefreshControl,
  ViewPropTypes,
  ActivityIndicator,
  InteractionManager,
  Image,
  Text,
  TextInput
} from 'react-native'

import {Button} from './button'
/**
 * 统一将 react-native库中的组件 + 自定义组件 统一收口管理
 */
export {
  View,
  ScrollView,
  ListView,
  RefreshControl,
  ViewPropTypes,
  ActivityIndicator,
  InteractionManager,
  Image,
  Text,
  TextInput,
  Button
}