/**
 * Created by guangqiang on 2017/8/16.
 */
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as service from "./action";
import { Button } from '../../components/common'
import HttpUtils from '../../utils/network/request/HttpUtils'

const getUrl = "http://192.168.60.1:7080/HFSystem/login/test?startTime=2018-4-3&endTime=2019-3-3"
const postUrl = "http://192.168.60.1:7080/HFSystem/seal/getSealType"

class Network extends Component {

  get() {
    service.getCostRemarkList(data={}).then(res => {
      console.log(res)
    });
  }

  post() {
    HttpUtils.postRequrst(postUrl, {}).then(response => {
      console.log(response)
    })
  }

  reduxForFetch() {
    // 这里地方通过redux 框架，可以拿到网络请求数据
    this.props.openChat({ movieId: 208325 }).then(response => {
      alert(response)
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Text>测试网络请求框框</Text>
        <Text>{'通过redux获取到的state上的数据' + this.props.xxx}</Text>
        <Button onPress={() => this.get()}>发送GET请求</Button>
        <Button onPress={() => this.post()}>发送POST请求</Button>
        <Button onPress={() => this.reduxForFetch()}>redux 派发dispatch</Button>
      </View>
    )
  }
}

// 将绑定操作在UI组件上完成, 是另一种redux 写法
// const testFunc = (data) => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: type.CHAT_INCREASES,
//     })
//   }
// }
//
// const mapStateToProps = (state, props) => {
//   return {
//     ppp: '嗷嗷嗷'
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     testFunc: bindActionCreators(testFunc, dispatch),
//   }
// }
//
// export default _Network = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Network)

export default Network