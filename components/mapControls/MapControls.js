import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { MapContext } from '../../context/mapContext'

export default function MapControls() {
    const {         
        selectionType,
        setSelectionType,
        start,
        stop,
        clear,
        mode,
    } = useContext(MapContext)

    const playing = ['starting', 'inProgress'].includes(mode)

    return (
        <View>
            <View style={styles.buttonContainerUpper}>
                <TouchableOpacity                    
                    onPress={() => setSelectionType('finish')}
                    disabled={mode !== 'setup'}
                    style={[
                        styles.button,
                        selectionType === 'finish' && styles.pressedButton,
                        { marginRight: 10 },
                        styles.flex
                    ]}>
                    <FontAwesome5
                        style={ selectionType === 'finish' && styles.pressedIcon }
                        name="flag-checkered" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={mode !== 'setup'}
                    onPress={() => setSelectionType('seeker')}
                    style={[
                        styles.button,
                        { marginRight: 10 },
                        selectionType === 'seeker' && styles.pressedButton,
                        styles.flex
                    ]}>
                    <MaterialIcons
                        style={ selectionType === 'seeker' && styles.pressedIcon }
                        name="person-pin-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={mode !== 'setup'}
                    onPress={clear}
                    style={[
                        styles.button,
                        styles.flex
                    ]}>
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainerLower}>
                <TouchableOpacity
                    disabled={mode !== 'setup'}
                    style={[
                        styles.button,
                        styles.flex,
                        {marginRight: 10},
                        mode !== 'setup' && styles.pressedButton
                    ]}
                    onPress={start}>
                    <Text style={[styles.text, mode !== 'setup' && styles.pressedText]}>
                        Start
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!playing}
                    style={[
                        styles.button,
                        styles.flex,
                        !playing && styles.pressedButton
                    ]}
                    onPress={stop}>
                    <Text style={[styles.text, !playing && styles.pressedText]}>
                        Stop
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainerUpper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    buttonContainerLower: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    pressedText: {
        color: 'white',
    },
    pressedIcon: {
        color: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})