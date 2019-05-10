import React, { Component } from "react";
import HomePage from "./HomePage";
import ArticleDetailPage from "./ArticleDetailPage";
import {apptheme} from "../color";
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'

export const Navigator = createStackNavigator({
  HomePage: { screen: HomePage },
  ArticleDetailPage: { screen: ArticleDetailPage },
},{
  initialRouteName: 'HomePage',
})

class Nav extends Component {
  render() {
    return (
      <Navigator />
    )
  }
}
      
export default Nav