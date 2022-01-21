import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { MapContext } from '../../context/mapContext'

export default function MapControls() {
    const {         
        selectionType,
        setSelectionType,
        start,
        clear,
    } = useContext(MapContext)

    return (
        <View>
            <View style={styles.buttonContainerUpper}>
                <TouchableOpacity                    
                    onPress={() => setSelectionType('finish')}
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
                    onPress={clear}
                    style={[
                        styles.button,
                        styles.flex
                    ]}>
                    <FontAwesome5 name="trash" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={[styles.button]} onPress={start}>
                    <Text style={[styles.text]}>
                        Start
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