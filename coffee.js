import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as APIKeys from './keys';

class CoffeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.navigation.state.params.position.coords.latitude,
      lng: this.props.navigation.state.params.position.coords.longitude,
      data: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const lat = this.state.lat;
    const lng = this.state.lng;
    fetch(`https://api.yelp.com/v3/businesses/search?term='coffee'&latitude=${lat}&longitude=${lng}`, {
      headers: {
        "Authorization": 'Bearer ' + APIKeys.API,
      }
    })
    .then(response => {
      return response.json();
    }).then(data => {
      this.setState({ data });
    })
    .catch(error => alert("Error", error));
  }

  render() {
    if (this.state.data) {
      return (
        <View>
          <View style={{ alignItems: 'center', margin: 'auto' }}>
            <Text style={{fontSize: 20, alignItems: 'center', fontFamily: 'Optima',  marginBottom: 10}}>Cafes Near You:</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MapView
              style={{width: "80%", height: 200, margin: 'auto'}}
              initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              }}
              showsUserLocation
            >
            {this.state.data.businesses.map(business => {
              return (
                <Marker
                  key={business.id}
                  coordinate={{ latitude: business.coordinates.latitude, longitude: business.coordinates.longitude}}
                  onPress={() => this.props.navigation.navigate('Show', {
                    id: business.id,
                    userLocation: [this.state.lat, this.state.lng]
                  })
                    }
                >
                </Marker>
              );
            })}
          </MapView>
          </View>
          <List>
            <FlatList
              data={this.state.data.businesses}
              renderItem={({ item }) => (
                <ListItem
                  title={item.name}
                  subtitle={`${item.location.display_address[0]}, ${item.location.display_address[1]}`}
                  avatar={{uri: item.image_url}}
                  onPress={() => this.props.navigation.navigate('Show', {
                    id: item.id,
                    userLocation: [this.state.lat, this.state.lng]
                  })
                    }
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </List>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default CoffeeScreen;
