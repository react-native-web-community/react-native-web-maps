import React, { Component } from 'react';
import { Polyline } from 'react-google-maps';

class MapViewPolyline extends Component {
  render() {
    
    return (
        <Polyline
        path={this.props.path}
      options={this.props.options}
      />
    );
  }
}

export default MapViewPolyline;
