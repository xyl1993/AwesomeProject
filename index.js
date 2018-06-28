/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View
} from 'react-native'
import MainPage from './src/page/MainPage'
import App from './src/app'
import TestNetwork from './src/page/demoPage/TestNetwork'

export default class AwesomeProject extends Component {
	render() {
		return (
			<App />
		)
	}
}

const styles = StyleSheet.create({
	
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
