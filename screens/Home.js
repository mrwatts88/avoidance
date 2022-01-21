import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Map from 'components/map/Map'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
    const [selectionButton, setSelectionButton] = useState('finish')

    return (
        <SafeAreaView style={styles.container}>
            <Map />
            <View style={styles.buttonContainerUpper}>
                <TouchableOpacity                        
                    onPress={() => setSelectionButton('finish')}
                    style={[
                        styles.button,
                        selectionButton === 'finish' && styles.pressedButton,
                        { marginRight: 10 },
                        styles.flex
                    ]}>
                    <FontAwesome5
                        style={ selectionButton === 'finish' && styles.pressedIcon }
                        name="flag-checkered" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectionButton('seeker')}
                    style={[
                        styles.button,
                        selectionButton === 'seeker' && styles.pressedButton,
                        styles.flex
                    ]}>
                    <MaterialIcons
                        style={ selectionButton === 'seeker' && styles.pressedIcon }
                        name="person-pin-circle" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={[styles.button]}>
                    <Text style={[styles.text]}>
                        Start
                    </Text>
                </TouchableOpacity>      
            </View>
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
    buttonContainerUpper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    flex: {
        flex: 1,
    },
    button: {
        borderColor: 'black',
        overflow: 'hidden',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        display: 'flex',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        alignItems: 'center'
    },
    pressedButton: {
        backgroundColor: 'black',
    },
    pressedIcon: {
        color: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})
