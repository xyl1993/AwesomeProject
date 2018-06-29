'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Platform, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity } from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { connect } from 'react-redux';
import { px2dp } from '../../../utils'
import theme from '../../../constants/theme';
import colors from '../../../constants/colors';
import { getCurrentDate, getUpDate } from '../../../utils/utils';
import NavigationBar from '../../../components/NavigationBar';
import Avatar from '../../../components/Avatar';
import * as service from "./service";
import Icon from 'react-native-vector-icons/Ionicons';
import { getDaily } from "../home/service";


class DiscoveryTab extends Component {
  constructor(props) {
    super(props);
    this.tabNames = [['Android', 'iOS', '前端', 'App'], ['休息视频', '拓展资源', '瞎推荐', '福利']];
    this.tabIcon = [['logo-android', 'logo-apple', 'logo-chrome', 'ios-apps'], ['ios-film', 'ios-book', 'ios-radio', 'ios-images']];
    this.tabColor = [['rgb(141,192,89)', '#000', 'rgb(51,154,237)', 'rgb(249,89,58)'], ['#9370db', '#00ced1', '#ffa500', 'lightpink']];
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: [],
      loading: true
    }
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <View style={[styles.container, { backgroundColor: this.props.pageBackgroundColor }]}>
        <NavigationBar title="发现"></NavigationBar>
        <ListView
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.state.dataSource)}
          renderHeader={this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
        >

        </ListView>
      </View>
    )
  }
  /**
     * 即调用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，
     * 一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误.
     */
  componentDidMount() {
    this._fetchData();
  }

  /**
   * 这个方法被调用时期是组件将要被加载在视图上之前，
   * 功能比较少，即：render一个组件前最后一次修改state的机会。
   */
  componentWillUnmount() {
  }

  _fetchData() {
    this.setState({ loading: true });
    let dataList = this.state.dataSource;
    const randomCategory = ['Android/2', 'iOS/2', '前端/2', '休息视频/2', '拓展资源/2', 'App/2', '瞎推荐/2'];
    service.fetchRandomData(randomCategory[Math.floor(Math.random() * 7)], {}).then(res => {
      let { error, results } = res;
      for(let item of results){
        dataList.push(item);
      }
      this.setState({ dataSource: dataList, loading: false });
    });
  };

  _renderHeader() {
    const { rowItemBackgroundColor, segmentColor, subTitleColor } = this.props;
    return (
      <View>
        <View style={[styles.btnPanel, { backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor }]}>
          {this.tabNames.map((item, i) => {
            return (
              <View style={styles.btnRow} key={i}>
                {this.tabNames[i].map((subItem, index) => {
                  return (
                    <View style={styles.btnCell} key={subItem}>
                      <TouchableOpacity>
                        {this._renderBtnContent(i, index)}
                      </TouchableOpacity>
                      <Text style={[styles.btnCellLabel, { color: this.props.titleColor }]}>{subItem}</Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
        {
          this.state.loading ?
            <View style={[styles.fakeListViewHeader, { backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor }]}>
              <Icon name="md-aperture" color={subTitleColor} size={px2dp(16)} />
              <Text style={{ color: subTitleColor, marginLeft: px2dp(5) }}>刷新中...</Text>
            </View>
            :
            <View style={[styles.fakeListViewHeader, { backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor }]}>
              <Icon name="md-aperture" color={subTitleColor} size={px2dp(16)} />
              <Text style={{ color: subTitleColor, marginLeft: px2dp(5) }}>随机干货</Text>
            </View>
        }
      </View>
    )
  }
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    if (Platform.OS === 'android') {
      return (
        <Text>{rowData.id}</Text>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <Text>{rowData.id}</Text>
      );
    }
  }
  _renderBtnContent(i, index) {
    return (
      <View style={{ width: px2dp(50), height: px2dp(50), alignItems: 'center', justifyContent: 'center' }}>
        <Avatar icon={this.tabIcon[i][index]} width={px2dp(50)} backgroundColor={this.tabColor[i][index]} />
      </View>
    );
  }
};



const mapStateToProps = (state) => {
  return {
    isOpenThumbnail: state.settingState.isOpenThumbnail,
    mainThemeColor: state.settingState.colorScheme.mainThemeColor,
    pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
    segmentColor: state.settingState.colorScheme.segmentColor,
    titleColor: state.settingState.colorScheme.titleColor,
    subTitleColor: state.settingState.colorScheme.subTitleColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    thumbnailColor: state.settingState.colorScheme.thumbnailColor,
    arrowColor: state.settingState.colorScheme.arrowColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnPanel: {
    height: px2dp(215),
    width: theme.screenWidth,
    marginTop: px2dp(12),
    marginBottom: px2dp(15),
    borderBottomWidth: theme.segment.width,
    borderTopWidth: theme.segment.width,
    padding: px2dp(17),
  },
  btnRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnCellLabel: {
    marginTop: px2dp(4)
  },
  fakeListViewHeader: {
    flexDirection: 'row',
    padding: px2dp(8),
    borderBottomWidth: theme.segment.width,
    borderTopWidth: theme.segment.width,
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(DiscoveryTab);