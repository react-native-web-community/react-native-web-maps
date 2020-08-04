import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('MapView', module)
  .add('basic', () => (
    <View style={styles.container}>
      <MapView defaultZoom={15} region={{ latitude: 48.86, longitude: 2.34 }} />
      <MapView defaultZoom={10} region={{ latitude: 48.86, longitude: 2.34 }} />
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
        initialRegion={{
          latitude: 48.86,
          longitude: 2.34,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
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

storiesOf('Marker', module)
  .add('basic', () => (
    <View style={styles.container}>
      <MapView ref={map => (this.map = map)} region={{ latitude: 48.88, longitude: 2.32 }}>
        <MapView.Marker
          title="BAM"
          description="Shape the future of mobile with us"
          coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
          onPress={() => {
            this.map.animateToRegion({
              latitude: 48.8828463,
              longitude: 2.3229091,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          }}
        />
        <MapView.Marker
          title="BAM"
          description="Shape the future of mobile with us"
          coordinate={{ latitude: 48.8828463, longitude: 2.3 }}
          onPress={() => {
            console.log(this.map.getCamera());
            const zoom = this.map.getCamera().zoom === 20 ? 15 : 20;
            this.map.animateCamera({
              zoom,
              center: {
                lat: 48.8828463,
                lng: 2.3,
              },
            });
          }}
        />
      </MapView>
    </View>
  ))
  .add('Callout', () => (
    <View style={styles.container}>
      <MapView ref={map => (this.map = map)} region={{ latitude: 48.88, longitude: 2.32 }}>
        <MapView.Marker
          title="BAM"
          ref={marker => (this.marker = marker)}
          description="Shape the future of mobile with us"
          coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
          onPress={() => {
            this.marker1.showCallout();
          }}>
          <MapView.Callout onPress={action('onPress callout')}>
            <View style={{ padding: 10 }}>
              <Text>Paris</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    </View>
  ));

const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
});
