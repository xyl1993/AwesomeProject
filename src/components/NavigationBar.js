/**
 * 顶部导航组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

class NavigationBar extends Component {
  /**
   * 参数的默认状态
   */
  static propTypes = {
    title: PropTypes.string.isRequired,
    leftBtnIcon: PropTypes.string,
    leftBtnText: PropTypes.string,
    leftBtnPress: PropTypes.func,
    rightBtnIcon: PropTypes.string,
    rightBtnText: PropTypes.string,
    rightBtnPress: PropTypes.func
  }

  constructor(props) {
    super(props);
  }
  render() {
    const { title, leftBtnIcon, leftBtnText, leftBtnPress, rightBtnIcon, rightBtnText, rightBtnPress } = this.props;
    return (
      <View style={styles.cointer}>
        <StatusBar translucent={true} backgroundColor={this.props.mainThemeColor} />
        <View style={[styles.navigationBar, { backgroundColor: this.props.mainThemeColor }]}>
          <View style={styles.fixedCell}>
            <Button icon={leftBtnIcon}></Button>
          </View>
          <View style={styles.centerCell}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.fixedCell}>

          </View>
        </View>
      </View>
    )
  }
}

/**
 * 返回按钮组件
 */
class Button extends Component {

  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    let icon = null;
    if (this.props.icon) {
      if (Platform.OS === 'android') {
        icon = 'md-' + this.props.icon;
      } else if (Platform.OS === 'ios') {
        icon = 'ios-' + this.props.icon;
      }
    }
    return (
      /**
       * 本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。这
       * 个过程并不会真正改变视图层级，大部分情况下很容易添加到应用中而不会带来一些奇怪的副作用。（译注：此组件与TouchableHighlight的区别在于并没有额外的颜色变化，更适于一般场景）
       */
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={theme.touchableOpacityActiveOpacity}>
        <View style={styles.btn}>
          {
            icon ?
              <Icon name={icon} color="#fff" size={px2dp(23)} />
              :
              <Text style={styles.btnText}>{this.props.text}</Text>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cointer: {
    height: theme.toolbar.height,
    width: theme.screenWidth,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  navigationBar: {
    height: theme.toolbar.height,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? 0 : px2dp(6),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  fixedCell: {
    height: theme.toolbar.height,
    width: theme.toolbar.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCell: {
    flex: 1,
    height: theme.toolbar.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.toolbar.titleSize,
    color: theme.toolbar.titleColor
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: theme.toolbar.height,
    height: Platform.OS === 'android' ? theme.toolbar.height : theme.toolbar.height - px2dp(6),
  },
  btnText: {
    color: theme.toolbar.titleColor,
    fontSize: theme.toolbar.textBtnSize
  }
});

const mapStateToProps = (state) => {
  return {
    mainThemeColor: state.settingState.colorScheme.mainThemeColor,

  };
};

export default connect(mapStateToProps)(NavigationBar);