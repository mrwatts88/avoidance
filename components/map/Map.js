import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native'
import { MapContext } from '../../context/mapContext'

export default function Map() {
    const [isPermissionGranted, setPermissionGranted] = useState(false)

    const {         
        addPin,
        removePin,
        seekers,
        location,
        setLocation,
        finish,
    } = useContext(MapContext)

    useEffect(() => {
        (async function getPermission() {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status === 'granted') setPermissionGranted(true)
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

    const onMapPress = ({ nativeEvent }) => {
        const { action, coordinate } = nativeEvent
        if (action === 'marker-press') removePin(coordinate)
        else if (!action) addPin(coordinate) 
    }

    const { coords } = location || {}
    const { latitude, longitude } = coords || {}

    return (
        <View style={styles.mapContainer}>
            {!isPermissionGranted || !location ? (
                <Text>{!location ? 'Loading location...' : 'Location permission not granted.'}</Text>
            ) : (
                <MapView
                    onPress={onMapPress}
                    style={{ width: '100%', height: '100%' }}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker coordinate={{ latitude, longitude }} pinColor='blue' />
                    {seekers.map((s, i) => (
                        <Marker
                            key={i}
                            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
                            pinColor='red'
                        />
                    ))}
                    {finish ? (
                        <Marker
                            coordinate={{ latitude: finish.latitude, longitude: finish.longitude }}
                            pinColor='green'
                        />
                    ) : null}
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
