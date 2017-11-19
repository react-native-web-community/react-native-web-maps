import React from 'react';
import MapView from 'react-native-maps';

import { storiesOf } from '@storybook/react';

storiesOf('MapView', module).add('Simple display', () => (
  <MapView initialCenter={{ lat: 48.864716, lng: 2.349014 }} defaultZoom={12} />
));
