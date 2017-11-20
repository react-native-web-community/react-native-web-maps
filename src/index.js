import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

export default class RNMaps extends Component {
  constructor(props) {
    super(props);
    this.state = { center: { lat: props.initialCenter.lat, lng: props.initialCenter.lng } };
  }

  handleMapMounted = map => (this.map = map);

  render() {
    if (!this.state.center)
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    return (
      <View style={styles.container}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={this.state.center}
          defaultZoom={this.props.defaultZoom || 15}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});
