import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as APIKeys from './keys';
import BeerItem from './beer_item';

class BeerScreen extends React.Component {
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
    fetch(`https://api.yelp.com/v3/businesses/search?term='bar'&latitude=${lat}&longitude=${lng}`, {
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
    let businessData;
    if (this.state.data) {
       businessData = this.state.data.businesses.map( business => {
        return(
          <BeerItem key={business.id} business={business} />
        );
      });
    } else {
      businessData = null;
    }
    return (
      <View>
        <Text>Beer near you:</Text>
        { businessData }
      </View>
  );
  }
}


export default BeerScreen;
