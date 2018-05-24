import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import CoffeeScreen from './coffee';
import BeerScreen from './beer';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      position: 'unknown'
    };
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <ImageBackground source={require('./assets/cafe.jpeg')} style={styles.container}>
        <Image style={{height: 125, width: 250}} source={require('./assets/bubble.png')} />
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Coffee', {
                position: this.state.position
              })}>
            <Image style={{height: 115, width: 150}} source={require('./assets/coffee.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Beer', {
                position: this.state.position
              })}>
            <Image style={{height: 115, width: 150}} source={require('./assets/beer.png')}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%'
  },
  coffeeButton: {
    color: 'white'
  },

});

const RootStack = createStackNavigator({
    Home: HomeScreen,
    Coffee: CoffeeScreen,
    Beer: BeerScreen
  },
  {
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
