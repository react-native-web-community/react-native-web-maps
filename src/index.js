import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './Marker';

const GoogleMapContainer = withGoogleMap(props => <GoogleMap {...props} ref={props.handleMapMounted} />);

/**
 * Calculates the zoom for the map object using long/lat deltas
 * @param {*} region : an object containing the longitude and latitude deltas
 * @returns integer
 */
function calcZoom(region) {
  if (!region.latitudeDelta || !region.longitudeDelta) return 13
  const avgDelta = (region.longitudeDelta + region.latitudeDelta) / 2.0;
  return Math.floor(1/avgDelta);
}

class MapView extends PureComponent {
  static defaultProps = {
    // Sets default location to Washington D.C. if region prop not supplied
    region: {
      latitude: 38.8935128,
      longitude: -77.1546602
    }
  };

  handleMapMounted = map => (this.map = map);

  onDragEnd = () => {
    const center = this.map.getCenter();
    !!this.props.onRegionChangeComplete &&
      this.props.onRegionChangeComplete({ latitude: center.lat(), longitude: center.lng() });
  };

  render() {
    const { region } = this.props;

    const center = {
      lat: region.latitude,
      lng: region.longitude
    };
    const zoom = calcZoom(region);
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

