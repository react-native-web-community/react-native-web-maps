import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './Marker';
import Polyline from './Polyline';

const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap {...props} ref={props.handleMapMounted} />
));

class MapView extends Component {
  state = {
    center: null,
  };

  handleMapMounted = map => {
    this.map = map;
    this.props.onMapReady && this.props.onMapReady();
  };

  animateToRegion(coordinates) {
    this.setState({ center: { lat: coordinates.latitude, lng: coordinates.longitude } });
  }

  onDragEnd = () => {
    const { onRegionChangeComplete } = this.props;
    if (this.map && onRegionChangeComplete) {
      const center = this.map.getCenter();
      const bounds = this.map.getBounds();
      onRegionChangeComplete({
        latitude: center.lat(),
        longitude: center.lng(),
        latitudeDelta: bounds.getNorthEast().lat() - bounds.getSouthWest().lat(),
        longitudeDelta: bounds.getNorthEast().lng() - bounds.getSouthWest().lng(),
      });
    }
  };

  render() {
    const { region, initialRegion, onPress, ...otherProps } = this.props;
    const { center } = this.state;
    const style = this.props.style || styles.container;

    const centerProps = region
      ? {
          center: {
            lat: region.latitude,
            lng: region.longitude,
          },
        }
      : center
      ? { center }
      : {
          defaultCenter: {
            lat: initialRegion.latitude,
            lng: initialRegion.longitude,
          },
        };

    return (
      <View style={style}>
        <GoogleMapContainer
          {...otherProps}
          {...centerProps}
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onIdle={this.onDragEnd}
          defaultZoom={15}
          onClick={onPress}>
          {this.props.children}
        </GoogleMapContainer>
      </View>
    );
  }
}

MapView.Marker = Marker;
MapView.Polyline = Polyline;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default MapView;
