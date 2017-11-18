import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

export default class RNMaps extends Component {
  state = {
    center: { lat: 48.864716, lng: 2.349014 },
  };

  handleMapMounted = map => (this.map = map);

  render() {
    if (!this.state.center)
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    return (
      <View style={{ height: '100vh' }}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={this.state.center}
          defaultZoom={15}
        />
      </View>
    );
  }
}
