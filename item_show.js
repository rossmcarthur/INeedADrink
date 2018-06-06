import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as APIKeys from './keys';

export default class ItemShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.id,
      data: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`https://api.yelp.com/v3/businesses/${this.state.id}`, {
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + APIKeys.API,
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ data });
    }).catch(error => console.log('Error', error));
  }

  render() {
    if (this.state.data) {
      return (
        <ScrollView style={{ flex: 1 }} >
          <View style={{ flex: 1, alignItems: 'center'}}>
            <Text style={{fontFamily: "Optima", fontSize: 30}}>{this.state.data.name}</Text>
            <Text style={{fontFamily: 'Optima', fontSize: 20}}>{this.state.data.location.display_address[0]}, {this.state.data.location.display_address[1]}</Text>
            <Text style={{fontFamily: 'Optima', fontSize: 20}}>{this.state.data.display_phone}</Text>
            <Text style={{fontFamily: 'Optima', fontSize: 20}}>{this.state.data.hours[0].is_open_now ? "Open Now!" : "Closed!"}</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', width: '100%', height: '100%'}}>
            <Image style={{ width: '80%', height: 250, marginTop: 20, marginBottom: 20}} source={{uri: this.state.data.image_url}} />
            <MapView
              style={{width: "80%", height: 250, paddingLeft: 30}}
              initialRegion={{
                latitude: this.props.navigation.state.params.userLocation[0],
                longitude: this.props.navigation.state.params.userLocation[1],
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
              }}
              showsUserLocation>
              <Marker
                key={this.state.id}
                coordinate={{ latitude: this.state.data.coordinates.latitude, longitude: this.state.data.coordinates.longitude}}>
              </Marker>
            </MapView>

          </View>
        </ScrollView>
      );
    } else {
      return null;
    }
  }

}
