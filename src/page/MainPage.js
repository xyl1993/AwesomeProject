/**
 * 主页
 * 万事开头难 <>
 */
import React, { Component } from 'react'
import { StyleSheet, Platform, View, Text, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import theme from '../constants/theme';
import Home from './tabs/home'
import DiscoveryTab from './tabs/DiscoveryTab'
import { Icon } from '../utils/icon'
import { connect } from 'react-redux';
import px2dp from '../utils/px2dp';
class MainPage extends Component {

  render() {
    return (
      <BottomTabBar
        navigator={this.props.navigator}
        mainThemeColor={this.props.mainThemeColor}
        rowItemBackgroundColor={this.props.rowItemBackgroundColor}
        tabIconColor={this.props.tabIconColor}
        normalIconColor={this.props.normalIconColor}
      />
    );
  }
}

class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    };
  }

  _renderItem(Component, tab, tabName, normalIcon, selectedIcon) {
    const { navigator, tabIconColor, normalIconColor } = this.props;
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === tab}
        title={tabName}
        selectedTitleStyle={{ color: tabIconColor }}
        renderIcon={() => <Icon name={normalIcon} size={20} color={normalIconColor} />}
        renderSelectedIcon={() => <Icon name={selectedIcon} size={20} color={tabIconColor} />}
        onPress={() => this.setState({ selectedTab: tab })}>
        {<Component navigator={navigator} />}
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={[styles.tabBarStyle, { backgroundColor: this.props.rowItemBackgroundColor }]}
        sceneStyle={{
          // paddingTop: theme.toolbar.paddingTop, //immersive experience
          paddingBottom: styles.tabBarStyle.height
        }}>
        {this._renderItem(Home, 'home', '首页', this.state.homeIcon, this.state.homeIcon)}
        {this._renderItem(DiscoveryTab, 'discovery', '发现', this.state.compassIcon, this.state.compassIcon)}
        {this._renderItem(Home, 'collection', '收藏', this.state.moreIcon, this.state.moreIcon)}
        {this._renderItem(Home, 'more', '更多', this.state.collectionIcon, this.state.collectionIcon)}
      </TabNavigator>
    );
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.setState({ homeIcon: 'Ionicons|ios-home-outline' })
      this.setState({ compassIcon: 'Ionicons|ios-compass-outline' })
      this.setState({ moreIcon: 'Ionicons|ios-list-box-outline' })
      this.setState({ collectionIcon: 'Ionicons|ios-cube-outline' })
    } else if (Platform.OS === 'android') {
      this.setState({ homeIcon: 'Ionicons|md-home' })
      this.setState({ compassIcon: 'Ionicons|md-compass' })
      this.setState({ moreIcon: 'Ionicons|md-list-box' })
      this.setState({ collectionIcon: 'Ionicons|md-cube' })
    }
  }

  componentDidMount() {
  }
}

/**
 * 将reducers的设置的全局变量赋值给组件state属性
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  return {
    mainThemeColor: state.settingState.colorScheme.mainThemeColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
    normalIconColor: state.settingState.colorScheme.normalIconColor
  };
};

const styles = {
  tabBarItemIcon: {
    width: px2dp(20),
    height: px2dp(20)
  },
  tabBarStyle: {
    height: px2dp(45),
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
  }
}

export default connect(mapStateToProps)(MainPage);
