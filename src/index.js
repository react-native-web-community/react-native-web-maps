import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './Marker';
import Polyline from './Polyline';
import Callout from './Callout';
import Geojson from './Geojson';

const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap {...props} ref={props.handleMapMounted} />
));

function googleToReact(point) {
  return {
    latitude: point.lat(),
    longitude: point.lng(),
  };
}

function reactToGoogle(point) {
  return {
    lat: point.latitude,
    lng: point.longitude,
  };
}

class MapView extends Component {
  state = {
    center: null,
  };

  handleMapMounted = map => {
    this.map = map;
    this.props.onMapReady && this.props.onMapReady();
  };

  getCamera = () => {
    return {
      zoom: this.map.getZoom(),
      center: this.map.getCenter(),
      heading: this.map.getHeading(),
    };
  };

  animateCamera(camera) {
    this.setState({ zoom: camera.zoom });
    this.setState({ center: reactToGoogle(camera.center) });
  }

  animateToRegion(coordinates) {
    this.setState({
      center: reactToGoogle(coordinates),
    });
  }

  async getMapBoundaries() {
    const bounds = this.map.getBounds();
    return {
      northEast: googleToReact(bounds.getNorthEast()),
      southWest: googleToReact(bounds.getSouthWest()),
    };
  }

  onDragEnd = () => {
    const { onRegionChangeComplete } = this.props;
    if (this.map && onRegionChangeComplete) {
      const center = this.map.getCenter();
      onRegionChangeComplete(googleToReact(center));
    }
  };

  render() {
    const { region, initialRegion, onRegionChange, onPress, options, defaultZoom } = this.props;
    const { center } = this.state;
    const style = this.props.style || styles.container;

    const googleMapProps = center
      ? { center }
      : region
      ? {
          center: reactToGoogle(region),
        }
      : {
          defaultCenter: reactToGoogle(initialRegion),
        };
    const zoom =
      defaultZoom ||
      (region && region.latitudeDelta
        ? Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2)
        : initialRegion && initialRegion.latitudeDelta
        ? Math.round(Math.log(360 / initialRegion.latitudeDelta) / Math.LN2)
        : 15);
    googleMapProps['zoom'] = this.state.zoom ? this.state.zoom : zoom;
    return (
      <View style={style}>
        <GoogleMapContainer
          handleMapMounted={this.handleMapMounted}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onZoomChanged={() => {
            this.setState({ zoom: this.map.getZoom() });
          }}
          {...googleMapProps}
          onDragStart={onRegionChange}
          onIdle={this.onDragEnd}
          defaultZoom={zoom}
          onClick={onPress}
          options={options}>
          {this.props.children}
        </GoogleMapContainer>
      </View>
    );
  }
}

MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Callout = Callout;
MapView.Geojson = Geojson;
export { Marker, Polyline, Callout, Geojson };

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default MapView;
