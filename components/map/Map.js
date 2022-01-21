import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native'
import { MapContext } from '../../context/mapContext'

export default function Map() {
    const [isPermissionGranted, setPermissionGranted] = useState(false)

    const {         
        selectionType,
        seekers,
        setSeekers,
        location,
        setLocation,
        finish,
        setFinish,
    } = useContext(MapContext)

    useEffect(() => {
        (async function getPermission() {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status === 'granted') {
                setPermissionGranted(true)
            }
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
        const newPosition = e.nativeEvent.coordinate

        if (selectionType === 'seeker') {
            const copy = [...seekers]
            copy.push(newPosition)
            setSeekers(copy)
        } else if (selectionType === 'finish') {
            setFinish(newPosition)
        }
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
                        title='You'
                        pinColor='blue'
                    />
                    {seekers.map((s, i) => (
                        <Marker
                            key={i}
                            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
                            title='Seeker'
                            pinColor='red'
                        />
                    ))}
                    {finish ? (
                        <Marker
                            coordinate={{ latitude: finish.latitude, longitude: finish.longitude }}
                            title='Finish'
                            pinColor='green'
                        />
                    ): null}
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