import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { InfoWindow } from 'react-google-maps';

class MapViewCallout extends Component {
  render() {
    const { onPress, ...rest } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <InfoWindow onCloseClick={this.props.hideCallout} {...rest}>
          {this.props.children}
        </InfoWindow>
      </TouchableOpacity>
    );
  }
}

export default MapViewCallout;
