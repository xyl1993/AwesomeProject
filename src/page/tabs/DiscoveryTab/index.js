'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Platform, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { connect } from 'react-redux';
import { px2dp } from '../../../utils'
import getCorrectImageSizeUrl from '../../../utils/imageFactory';
import theme from '../../../constants/theme';
import colors from '../../../constants/colors';
import { getCurrentDate, getUpDate } from '../../../utils/utils';
import NavigationBar from '../../../components/NavigationBar';
import Footer from '../../../components/ListViewFooter';
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
    this.refresh= false;
    this.state = {
      dataSource: [],
      isFullData: true,
      loading: true,
      
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
          renderFooter={this._renderFooter.bind(this)}
          initialListSize={10}
          pageSize={10}
          // onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={5}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh.bind(this)}
              tintColor={this.props.mainThemeColor}
              colors={[this.props.mainThemeColor]}
              title="玩命加载中..."
            />}
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
    let dataList = this.refresh ? [] : this.state.dataSource;
    const randomCategory = ['Android/5', 'iOS/5', '前端/5', '休息视频/5', '拓展资源/5', 'App/5', '瞎推荐/5'];
    service.fetchRandomData(randomCategory[Math.floor(Math.random() * 7)], {}).then(res => {
      let { error, results } = res;
      for (let item of results) {
        dataList.push(item);
      }
      this.setState({ dataSource: dataList, loading: false });
    });
  };
  _onRefresh() {
    this.refresh = true;
    this._fetchData();
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
        <TouchableNativeFeedback
          overflow="hidden"
          key={rowID}
          onPress={this._itemOnPress.bind(this, rowData)}>
          {this._renderRowContent(rowData)}
        </TouchableNativeFeedback>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <TouchableHighlight
          overflow="hidden"
          key={rowID}
          onPress={this._itemOnPress.bind(this, rowData)}
          underlayColor={theme.touchableHighlightUnderlayColor}>
          {this._renderRowContent(rowData)}
        </TouchableHighlight>
      );
    }
  }
  _renderRowContent(rowData) {
    const { titleColor, subTitleColor, rowItemBackgroundColor, thumbnailColor, segmentColor } = this.props;
    return (
      <View style={[styles.itemContainer, { backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor }]}>
        <View style={[styles.txtPart]}>
          <View style={styles.titlePart}>
            <Text style={[styles.title, { color: titleColor }]} numberOfLines={2}>{rowData.desc}</Text>
          </View>
          <View style={styles.infoPart}>
            <Icon name="ios-pricetag-outline" color={subTitleColor} />
            <Text style={[styles.detailsLabel, { color: subTitleColor }]}>{rowData.type}</Text>
            <Icon name="ios-create-outline" color={subTitleColor} />
            <Text style={[styles.detailsLabel, { color: subTitleColor }]}>{rowData.who ? rowData.who : 'null'}</Text>
            <Icon name="ios-time-outline" color={subTitleColor} />
            <Text style={[styles.detailsLabel, { color: subTitleColor }]}>{this._handleCreateTime(rowData.publishedAt)}</Text>
          </View>
        </View>
        <View style={[styles.imgPart]}>
          {(rowData.images && this.props.isOpenThumbnail) ?
            <Image style={styles.image} source={{ uri: getCorrectImageSizeUrl(rowData.images[0]) }} />
            :
            <Image style={[styles.image, { backgroundColor: thumbnailColor }]} source={require('../../../assets/images/user_article_no_data.png')} />
          }
        </View>
      </View>
    )
  }
  _renderBtnContent(i, index) {
    return (
      <View style={{ width: px2dp(50), height: px2dp(50), alignItems: 'center', justifyContent: 'center' }}>
        <Avatar icon={this.tabIcon[i][index]} width={px2dp(50)} backgroundColor={this.tabColor[i][index]} />
      </View>
    );
  }
  _itemOnPress(rowData) {
    // this.props.navigator.push({
    //   component: WebViewPage,
    //   args: { rowData: rowData }
    // });
  }
  _handleCreateTime(time) {
    return time.substring(0, 10);
  }
  _renderFooter() {
    const { tabIconColor } = this.props;
    return (
      <Footer indicatorColor={tabIconColor} isFullData={true} isRenderFooter={this.state.isFullData} />
    );
  }
};



const mapStateToProps = (state) => {
  return {
    isOpenThumbnail: state.settingState.isOpenThumbnail,
    mainThemeColor: state.settingState.colorScheme.mainThemeColor,   //主题颜色
    pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor, //页面背景色
    segmentColor: state.settingState.colorScheme.segmentColor, //边框颜色
    titleColor: state.settingState.colorScheme.titleColor,   //标题颜色
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
  },
  itemContainer: {
    flexDirection: 'row',
    width: theme.screenWidth,
    height: px2dp(73),
    borderBottomWidth: px2dp(1)
  },
  txtPart: {
    flex: 80,
    paddingTop: px2dp(10),
    paddingLeft: px2dp(12),
    paddingRight: px2dp(5),
    paddingBottom: px2dp(10)
  },
  imgPart: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: px2dp(5)
  },
  image: {
    width: px2dp(60),
    height: px2dp(60),
    resizeMode: 'cover'
  },
  titlePart: {
    flex: 70,
  },
  infoPart: {
    flex: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsLabel: {
    marginLeft: px2dp(3),
    marginRight: px2dp(13),
    fontSize: px2dp(10)
  },
});

export default connect(mapStateToProps)(DiscoveryTab);