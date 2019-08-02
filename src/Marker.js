import React, { Component } from 'react';
import { Marker, OverlayView } from 'react-google-maps';

const ConditionalWrap = ({ condition, wrap, children }) =>
  condition ? wrap(children) : <React.Fragment>{children}</React.Fragment>;

class MapViewMarker extends Component {
  render() {
    const { description, title, coordinate, children, ...rest } = this.props;
    if (children) {
      const { onPress, ...overlayRest } = rest;
      return (
        <OverlayView
          {...overlayRest}
          title={description ? `${title}\n${description}` : title}
          position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <ConditionalWrap
            condition={!!onPress}
            wrap={(c) => (
              <div ref={(ref) => ref && google.maps.OverlayView.preventMapHitsFrom(ref)} onClick={onPress}>
                {c}
              </div>
            )}
          >
            {children}
          </ConditionalWrap>
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
