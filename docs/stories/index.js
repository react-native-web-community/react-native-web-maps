import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('MapView', module)
  .add('basic', () => (
    <View style={styles.container}>
      <MapView region={{ latitude: 48.86, longitude: 2.34 }} />
    </View>
  ))
  .add('onRegionChangeComplete', () => (
    <View style={styles.container}>
      <MapView
        initialRegion={{ latitude: 48.86, longitude: 2.34 }}
        onRegionChangeComplete={action('onRegionChangeComplete toggled')}
      />
    </View>
  ))
  .add('onPress', () => (
    <View style={styles.container}>
      <MapView region={{ latitude: 48.86, longitude: 2.34 }} onPress={action('onPress toggled')} />
    </View>
  ))
  .add('options', () => (
    <View style={styles.container}>
      <MapView
        initialRegion={{ latitude: 48.86, longitude: 2.34 }}
        options={{
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER,
          },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      />
    </View>
  ));

storiesOf('Marker', module).add('basic', () => (
  <View style={styles.container}>
    <MapView region={{ latitude: 48.88, longitude: 2.32 }}>
      <MapView.Marker
        title="BAM"
        description="Shape the future of mobile with us"
        coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
      />
    </MapView>
  </View>
));

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});
