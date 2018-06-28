//index.js 
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { View } from "react-native"
import { Router, Scene, Actions, Modal, Lightbox, Stack } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'
import MainPage from './page/MainPage';  //引入两个组件
import { store } from './store'
import MessageBar from "./utils/messageBar/MessageBar"
import Loading from './utils/progressHUD/progressHUD'
//用scene这个组件来包裹要导航的组件，initial表示默认加载的
//组件，key的作用就是在路由中注册这个组件，后面要用到这个
//某个组件就用它的key 来代替它,component就是组件
//这个组件自带navbar，title就是navbar的名字

const scenes = Actions.create(
  <Scene key="root">
    <Modal key="modal" hideNavBar>
      <Lightbox key="lightbox" hideNavBar={true}>
        <Stack key="init" back>
          <Scene key="main" initial back={false} hideNavBar component={MainPage} />
        </Stack>
        <Scene key='loading' component={connect(
          (state) => state.loading
        )(Loading)} />
      </Lightbox>
    </Modal>
  </Scene>
)
const getSceneStyle = () => ({
  backgroundColor: "white",
  shadowOpacity: 1,
  shadowRadius: 3,
})

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router
          scenes={scenes}
          tintColor='white'
          getSceneStyle={getSceneStyle}
        />
        <MessageBar />
      </View>
    )
  }
  componentDidMount() {
  }
}

const initApp = () => {
  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default initApp