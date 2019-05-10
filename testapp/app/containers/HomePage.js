import React, { Component } from "react";
import { StyleSheet, Image, View, Dimensions, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import {getArticles} from '../network/APIService';
import { connect } from "react-redux";

import {
    StackNavigator,
    } from 'react-navigation';

class HomePage extends Component{

    constructor(props) {
        super(props);
        console.log("here again")
        this.state = {
            articles: [],
            fontsize: 16
        }
        
        this.getData();
    }

    getData(){
        getArticles().then(response => {
            this.setState({articles: response})
        },
        error =>{}
        ).catch(error=>{})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hasOwnProperty('changefontsize')){
            this.setState({fontsize: nextProps.changefontsize})
        }
    }

    renderItem = ({item, index}) => {
        return(
        <TouchableOpacity style={styles.flatview} onPress={()=>this.props.navigation.navigate('ArticleDetailPage',{id: item.id})}>
            <Image
                style={styles.imageview}
                source={{uri: item.image != null? item.image:''}}>
            </Image>
            <Text style={[styles.textview, {fontSize: this.state.fontsize}]}>{item.title}</Text>
        </TouchableOpacity> 
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
            {this.state.articles.length > 0?
                <FlatList
                    data={this.state.articles}
                    renderItem={this.renderItem}
                    extraData={this.state.fontsize}
                />
                :
                <View/>
            }
            </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20
    },
    flatview:{
        flexDirection:'row',
        margin: 10,
        alignItems:'center',
    },
    imageview:{
        width: 100,
        height: 50
    },
    textview:{
        margin: 10,
        flex: 1 
    }
  });

function mapStateToProps(state) {
return {
    changefontsize: state.changefontsize
};
}
    
function mapDispatchToProps(dispatch) {
return {};
}

  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);