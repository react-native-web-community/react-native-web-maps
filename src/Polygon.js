import React, { Component } from 'react';
import { Polygon } from 'react-google-maps';

class MapViewPolygon extends Component {
  render() {
    return <Polygon {...this.props} />;
  }
}

export default MapViewPolygon;
