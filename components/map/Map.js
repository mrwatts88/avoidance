import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native'

export default function Map() {
    const [location, setLocation] = useState(null)
    const [isPermissionGranted, setPermissionGranted] = useState(false)
    const [seekers, setSeekers] = useState([])
  
    useEffect(() => {
        (async function getPermission() {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setPermissionGranted(false)
                return
            }

            setPermissionGranted(true)
        })()
    }, [])

    useEffect(() => {
        if (!isPermissionGranted) return

        async function getLocation() {
            const location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        }

        getLocation()
        const interval = setInterval(getLocation, 1000)

        return () => clearInterval(interval)
    }, [isPermissionGranted])

    const onMapPress = (e) => {
        const copy = [...seekers]
        copy.push(e.nativeEvent.coordinate)

        setSeekers(copy)
    }

    const { coords } = location || {}
    const { latitude, longitude} = coords || {}

    return (
        <View style={styles.mapContainer}>
            {!isPermissionGranted || !location ? (
                <Text>{!location ? 'Loading location...' : 'Location permission not granted.'}</Text>
            ) : (
                <MapView
                    onPress={onMapPress}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{ latitude, longitude }}
                        title="You"
                        pinColor='blue'
                    />
                    {seekers.map((s, i) => (
                        <Marker
                            key={i}
                            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
                            title="Seeker"
                            pinColor='red'
                        />
                    ))}
                </MapView>)}
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})