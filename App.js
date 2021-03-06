import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
import IndexScreen from './components/index';
import ItemShow from './components/item_show';
import { createStackNavigator } from 'react-navigation';
import { Font } from 'expo';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      position: 'unknown',
      fontLoaded: false
    };
  }

async componentDidMount(){
  await Font.loadAsync({
      'roboto': require('./assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({ fontLoaded: true });
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
        <View style={styles.container}>
          { this.state.fontLoaded ?
        <ImageBackground source={require('./assets/images/cafe.jpeg')} style={styles.container}>
          <Image style={styles.title} source={require('./assets/images/bubble.png')} />
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Index', {
                  position: this.state.position,
                  page: 'coffee'
                })}>
              <Image style={styles.coffeeButton} source={require('./assets/images/coffee.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Index', {
                  position: this.state.position,
                  page: 'bar'
                })}>
              <Image style={styles.beerButton} source={require('./assets/images/beer.png')}/>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        : null }
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  image: {
    fontFamily: 'roboto'
  },
  title: {
    height: 125,
    width: 250
  },
  coffeeButton: {
    height: 115,
    width: 150
  },
  beerButton: {
    height: 115,
    width: 150
  }
});

const RootStack = createStackNavigator({
    Home: HomeScreen,
    Index: IndexScreen,
    Show: ItemShow
  },
  {
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
