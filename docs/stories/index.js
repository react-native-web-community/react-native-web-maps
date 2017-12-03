import React from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('MapView', module)
  .add('Simple display', () => <MapView region={{ latitude: 48.86, longitude: 2.34 }} />)
  .add('Display latitude and longitude on region change', () => (
    <View>
      <MapView region={{ latitude: 48.86, longitude: 2.34 }} onRegionChangeComplete={action('new coordinates')} />
    </View>
  ));&

storiesOf('Marker', module).add('Simple display', () => (
  <MapView region={{ latitude: 48.88, longitude: 2.32 }}>
    <MapView.Marker title="BAM" coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }} />
  </MapView>
));
