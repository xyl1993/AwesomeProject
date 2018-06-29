'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity } from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { connect } from 'react-redux';
import { px2dp } from '../../../utils'
import theme from '../../../constants/theme';
import colors from '../../../constants/colors';
import { getCurrentDate, getUpDate } from '../../../utils/utils';
import * as service from "./service";

import ListViewForHome from './ListViewForHome';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      error:false,
      dataSource:{
        category:[]
      },
    };
    this.imageHeight = px2dp(400);
    this.fullUrl = '';
    this.dataTime = getCurrentDate();
  }

  render() {
    const { dataSource, mainThemeColor, pageBackgroundColor, rowItemBackgroundColor, segmentColor } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: pageBackgroundColor }]}>
        <ScrollView>
          {(this.state.error || !this.state.dataSource) ?
            <View style={styles.indicator}>
              <Text style={{ color: this.props.tabIconColor }}>Ooops, 获取数据失败</Text>
            </View> :
            <View>
              <ImageView
                imgUrl={this.state.fullUrl}
                labelTime={this.dataTime} />
              <View style={styles.scrollContents}>
                {this.state.dataSource.category.map((item, i) => {
                  if (item !== '福利' && this._getTargetList(this.state.dataSource, item) != null)
                    return (
                      <ListViewForHome
                        key={i}
                        navigator={this.props.navigator}
                        dataSource={this._getTargetList(this.state.dataSource, item)}
                        headerTitle={item} />
                    );
                })}
              </View>
            </View>}
        </ScrollView>
      </View>
    );
  }

  _fetchData() {
    service.getDaily(getUpDate(), {}).then(res => {
      console.log(res);
      let { category, error, results } = res;
      
      this.setState({ fullUrl: results['福利'][0].url, error: error, dataSource: res })
    });
  }

  /**
   * 即调用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，
   * 一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误.
   */
  componentDidMount() {
    this._fetchData();
    // RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
  }

  /**
   * 这个方法被调用时期是组件将要被加载在视图上之前，
   * 功能比较少，即：render一个组件前最后一次修改state的机会。
   */
  componentWillUnmount() {
    // RCTDeviceEventEmitter.removeListener('fetch', this._handleEventEmitter.bind(this));
  }

  _handleEventEmitter(value) {
    this._fetchData();
    // if (value)
    //   this._fetchData();
    // else
    //   this.props.actions.onlyFetchLocalData(getCurrentDate());
  }

  _getTargetList(dataSource, target) {
    switch (target) {
      case 'Android':
        return dataSource.results.Android;
      case 'iOS':
        return dataSource.results.iOS;
      case '前端':
        return dataSource.results.前端;
      case '休息视频':
        return dataSource.results.休息视频;
      case '拓展资源':
        return dataSource.results.拓展资源;
      case 'App':
        return dataSource.results.App;
      case '瞎推荐':
        return dataSource.results.瞎推荐;
      default:
        return null;
    }
  }

  // _onPress(id) {
  //   if (id === 0)
  //     this._fetchData();
  //   else if (id === 1)
  //     ;
  // }


  // _onScroll(event) {
  //   var offsetY = event.nativeEvent.contentOffset.y;
  //   if (offsetY <= this.imageHeight - theme.toolbar.height) {
  //     var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
  //     this.setState({ opacity: opacity });
  //   } else {
  //     this.setState({ opacity: 1 });
  //   }
  // }

}

class ImageView extends Component {
  static propTypes = {
    imgUrl: PropTypes.string,
    labelTime: PropTypes.string
  }

  render() {
    return (
      <View style={styles.imgContainer}>
        <Image source={{ uri: this.props.imgUrl }} style={styles.img} />
        <View style={styles.dateLabel}>
          <Text style={styles.label}>{this.props.labelTime}</Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mainThemeColor: state.settingState.colorScheme.mainThemeColor,
    pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    segmentColor: state.settingState.colorScheme.segmentColor,
    colorScheme: state.settingState.colorScheme.colorScheme
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    width: theme.screenWidth,
    zIndex: 1
  },
  scrollContents: {
    //height: theme.screenHeight+theme.toolbar.height,
  },
  imgContainer:{
    height: px2dp(400)
  },
  img: {
    width: theme.screenWidth,
    height: px2dp(400),
    resizeMode: 'cover'
  },
  dateLabel: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative',
    width: theme.screenWidth,
    height: px2dp(50),
    bottom: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    color: '#fff',
    fontSize: px2dp(20),
    marginRight: px2dp(20),
    fontWeight: 'bold'
  },
  footer: {
    width: theme.screenWidth,
    height: px2dp(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: theme.segment.width
  },
  bottomBtn: {
    backgroundColor: colors.lightBlue,
    width: theme.screenWidth * 0.9,
    height: px2dp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnLabel: {
    color: '#fff',
    fontSize: px2dp(16)
  },
  indicator: {
    flexDirection: 'row',
    width: theme.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(20)
  }
});

export default connect(mapStateToProps)(Home);