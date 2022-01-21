import React from 'react'
import {  StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from 'components/map/Map'
import MapControls from 'components/mapControls/MapControls'

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Map />
            <MapControls />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
})
