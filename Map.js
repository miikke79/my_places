    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, View, Alert} from 'react-native';
    import MapView, { Marker } from'react-native-maps';
    import React, { useState, useEffect } from 'react';
    
    export default function Map({ route }) {
    
    const location = route.params.item.item;
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    
      useEffect(() => 
      {  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=K6UsLI0CHckInWVQwxQaQrdANObKx3hL&location=${location}`)  
      .then(response => response.json())  
      .then(data => {setLatitude(data.results[0].locations[0].latLng.lat), setLongitude(data.results[0].locations[0].latLng.lng) })
      .catch(error => {         Alert.alert('Error', error);   });
    }, []);
    
      return (
    
        <View style={styles.container}>
          <MapView
            style={styles.map}   
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }}>
            <Marker
            coordinate={{
              latitude:latitude, 
              longitude:longitude}}
              />
            </MapView>
          <StatusBar style="auto" />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      map: {
        flex:1,
        width: "100%",
        height: "100%"
      }
    });