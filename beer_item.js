import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class BeerItem extends React.Component {
  render(){
    return(
      <View>
        <Text>{this.props.business.name}</Text>
        <Text>{this.props.business.location.display_address[0]}, {this.props.business.location.display_address[1]}</Text>
        <Text>{this.props.business.display_phone}</Text>
        <Text>{this.props.business.price}</Text>
        <Image style={{width: 50, height: 50 }} source={{uri: this.props.business.image_url}} />
      </View>
    );
  }
}

export default BeerItem;
