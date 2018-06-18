import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './Marker';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

function calcZoom(region) {
  if (!region.latitudeDelta || !region.longitudeDelta) return 13
  const avgDelta = (region.longitudeDelta + region.latitudeDelta) / 2.0;
  return Math.floor(1/avgDelta);
}
class MapView extends PureComponent {
  handleMapMounted = map => (this.map = map);

  onDragEnd = () => {
    const center = this.map.getCenter();
    !!this.props.onRegionChangeComplete &&
      this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
  };

  render() {
    if (!this.props.region)
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    const center = { 
      lat: this.props.region.latitude, 
      lng: this.props.region.longitude 
    };
    const zoom = calcZoom(this.props.region);
    return (
      <View style={styles.container}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={center}
          onDragStart={!!this.props.onRegionChange && this.props.onRegionChange}
          onDragEnd={this.onDragEnd}
          zoom={zoom}
          onClick={this.props.onPress}
        >
          {this.props.children}
        </GoogleMapContainer>
      </View>
    );
  }
}

MapView.Marker = Marker;

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});

export { Marker };
export default MapView;
