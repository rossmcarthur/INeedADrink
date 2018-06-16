import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as APIKeys from './keys';

class IndexScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.navigation.state.params.position.coords.latitude,
      lng: this.props.navigation.state.params.position.coords.longitude,
      data: null,
      page: this.props.navigation.state.params.page
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const lat = this.state.lat;
    const lng = this.state.lng;
    fetch(`https://api.yelp.com/v3/businesses/search?term=${this.state.page}&latitude=${lat}&longitude=${lng}`, {
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
        <View style={{backgroundColor: '#1DBBFF'}}>
          <View style={styles.container}>
            <Text style={styles.header}>{this.state.page === 'coffee' ? "Cafes near you:" : "Beer near you:"}</Text>
          </View>
          <View style={styles.container}>
            <MapView
              style={styles.map}
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
              style={{ backgroundColor: '#D1F1FF'}}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: '#1DBBFF'
  },
  header: {
    fontSize: 20,
    alignItems: 'center',
    fontFamily: "roboto",
    color: 'white',
    paddingBottom: 10,
    paddingTop: 10
  },
  map: {
    width: "80%",
    height: 200,
    borderRadius: 5
  }


});

export default IndexScreen;
