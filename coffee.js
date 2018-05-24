import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList  } from 'react-native';
import { List, ListItem } from 'react-native-elements';
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
    .catch(error => console.log("Error", error));
  }

  render() {
    if (this.state.data) {
    return (
      <View>
      <View style={{ alignItems: 'center', margin: 'auto' }}>
      <Text style={{fontSize: 20, alignItems: 'center', fontFamily: 'Optima'}}>Cafes Near You:</Text>
      </View>
      <List>
        <FlatList
          data={this.state.data.businesses}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={`${item.location.display_address[0]}, ${item.location.display_address[1]}`}
              avatar={{uri: item.image_url}}
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

// let businessData;
// if (this.state.data) {
//    businessData = this.state.data.businesses.map( business => {
//     return(
//       <CoffeeItem key={business.id} business={business} />
//     );
//   });
// } else {
//   businessData = null;
// }
// return (
//   <View>
//     <Text>Cafes near you:</Text>
//     { businessData }
//   </View>
// );


export default CoffeeScreen;
