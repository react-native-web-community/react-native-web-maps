import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

class MapViewMarker extends Component {
  render() {
    const { description, title, coordinate, onPress, ...rest } = this.props;
    return (
      <Marker
        {...rest}
        title={description ? `${title}\n${description}` : title}
        position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
        onClick={onPress}
      />
    );
  }
}

export default MapViewMarker;
