import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

class MapViewMarker extends Component {
  state = {
    isOpen: false,
  };
  showCallout() {
    this.setState({ isOpen: true });
  }
  hideCallout() {
    this.setState({ isOpen: false });
  }
  render() {
    const { description, title, coordinate, onPress, ...rest } = this.props;

    const childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { hideCallout: this.hideCallout.bind(this) });
    });
    return (
      <Marker
        {...rest}
        title={description ? `${title}\n${description}` : title}
        position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
        onClick={onPress}>
        {this.state.isOpen && childrenWithProps}
      </Marker>
    );
  }
}

export default MapViewMarker;
