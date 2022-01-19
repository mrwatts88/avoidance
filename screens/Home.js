import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

export default function Home() {
    const [selectionButton, setSelectionButton] = useState('finish')

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
            </View>
            <View style={styles.buttonContainerUpper}>
                <FontAwesome5
                    onPress={() => setSelectionButton('finish')}
                    style={[styles.button, selectionButton === 'finish' && styles.pressedButton, { marginRight: 10 }]}
                    name="flag-checkered" size={24} color="black" />
                <MaterialIcons
                    onPress={() => setSelectionButton('seeker')}
                    style={[styles.button, selectionButton === 'seeker' && styles.pressedButton]}
                    name="person-pin-circle" size={24} color="black" />
            </View>
            <View>
                <Pressable><Text style={[styles.button, styles.text]}>Start</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 1,
    },
    buttonContainerUpper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    button: {
        flex: 1,
        border: '1px solid black',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
    },
    pressedButton: {
        backgroundColor: 'black',
        color: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})
