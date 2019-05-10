import React, { Component } from "react";
import { StyleSheet, Image, View, Dimensions, Text, TouchableOpacity, FlatList, Button } from "react-native";
import {getArticleDetail} from '../network/APIService';
import {theme} from "../color";
import articleDetail from "../normalizers/articleDetail";
import RangeSlider from 'react-native-range-slider'
import {changeFontSize} from "../actions/changeFontSize";
import { connect } from "react-redux";


class ArticleDetailPage extends Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
      headerRight: <Button title="A" onPress={()=>navigation.state.params.changeFontSize()} />,
    })
    constructor(props) {
        super(props);
        this.state = {
          articleDetail: null,
          fontsize: 20,
          isChangeSlider: false
        }
      
        this.getData()
    }

    
    changeFontSize = () =>{
      this.setState({isChangeSlider: !this.state.isChangeSlider})
    }

    componentDidMount() {
      this.props.navigation.setParams({ changeFontSize: this.changeFontSize });
    }

    getData(){
      const { navigation } = this.props;
        const id = navigation.getParam('id', '0');
        getArticleDetail(id).then(response => {
          this.setState({articleDetail: response})
          console.log(response)
        },
         error =>{}
        ).catch(error=>{})
    }

    render() {
        return (
          <View style={styles.container}>
            {this.state.articleDetail != null?
              <View style={styles.body}>
                <Text style={{fontSize: this.state.fontsize}}>{this.state.articleDetail.title}</Text>
                <Text style={styles.date}>{this.state.articleDetail.date}</Text>
                <Image
                  style={styles.imageview}
                  source={{uri: this.state.articleDetail.image != null? this.state.articleDetail.image:''}}>
                </Image>
                <Text style={styles.des}>{this.state.articleDetail.content.replace(/<\/?[^>]+(>|$)/g, "")}</Text>

              </View>
            :<View/>
            }

            {this.state.isChangeSlider?
            <View style={styles.sliderview}>
              <RangeSlider
                disableRange={true}
                lineHeight={2}
                handleDiameter={18}
                minValue={20}
                maxValue={50}
                selectedMaximum={20}
                style={styles.slider}
                onChange={(data) => { 
                  this.setState({fontsize: data.selectedMaximum}, function(){
                    this.props.changeFontSize(data.selectedMaximum)
                  })}}
              />
            </View> : <View/>
            }
          </View>
        );
      }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    body:{
      padding: 10
    },
    imageview:{
      width: '100%',
      height: 200
    },
    date:{
      fontSize: 12,
      color: 'grey',
      marginTop: 12,
      marginBottom: 12
    },
    des:{
      fontSize: 14,
      marginTop: 12,
      marginBottom: 12
    },
    sliderview:{
      width: '80%',
      position:'absolute', 
      alignSelf:'center', 
      paddingTop: 100, 
      paddingBottom: 100, 
      paddingLeft: 20, 
      paddingRight: 20
    },
    slider:{
      flex: 1, 
      height: 40, 
      marginTop: 20, 
      padding: 10}
  });


function mapStateToProps(state) {
  return {
      changefontsize: state.changefontsize
  };
}
    
  function mapDispatchToProps(dispatch) {
  return {
    changeFontSize: value => dispatch(changeFontSize(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailPage);