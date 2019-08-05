import React, { Component } from 'react';
import { Marker, OverlayView } from 'react-google-maps';

class MapViewMarker extends Component {
  render() {
    const { description, title, coordinate, children, ...rest } = this.props;
    if (children) {
      const { onPress, ...overlayRest } = rest;
      const wrappedChildren = onPress ? (
        <div ref={ref => ref && google.maps.OverlayView.preventMapHitsFrom(ref)} onClick={onPress}>
          {children}
        </div>
      ) : (
        children
      );
      return (
        <OverlayView
          {...overlayRest}
          title={description ? `${title}\n${description}` : title}
          position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          {wrappedChildren}
        </OverlayView>
      );
    }
    return (
      <Marker
        {...rest}
        title={description ? `${title}\n${description}` : title}
        position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
      />
    );
  }
}

export default MapViewMarker;
