import React, { useRef, useState } from 'react'
import SockJsClient from 'react-stomp'
import uuid from 'react-native-uuid'

const SOCKET_URL = 'http://10.0.0.21:8080/ws'

export const MapContext = React.createContext({})

export default function MapContextProvider({ children }) {
    const [selectionType, setSelectionType] = useState('finish')
    const [location, setLocation] = useState(null)
    const [seekers, setSeekers] = useState([])
    const [finish, setFinish] = useState(null)
    const [mode, setMode] = useState('setup')
    const clientRef = useRef(null)
    const [stateId, setStateId] = useState(uuid.v4())

    const sendStartMessage = (msg) => {
        clientRef.current.sendMessage(`/ws/start/${stateId}`, msg)
    }

    const start = () => {
        if (mode !== 'setup') return
        setMode('starting')
        sendStartMessage(JSON.stringify({
            seekers
        }))
    }

    const stop = () => {
        if (['starting', 'inProgress'].includes(mode)) {
            setMode('setup')
            clientRef.current.sendMessage(`/ws/stop/${stateId}`)
            setStateId(null)
        }
    }

    const clear = () => {
        if (mode !== 'setup') return
        setSeekers([])
        setFinish(null)
    }

    const removePin = ({ latitude , longitude }) => {
        if (mode !== 'setup') return

        if (selectionType === 'seeker') {
            const existingMarkerIdx = seekers.findIndex((s) => s.latitude === latitude && s.longitude === longitude)

            if (existingMarkerIdx !== -1) {
                const copy = [...seekers]
                copy.splice(existingMarkerIdx, 1)
                setSeekers(copy)
            }
        } else if (selectionType === 'finish') {
            if (finish?.latitude === latitude && finish?.longitude === longitude) {
                setFinish(null)
            }
        }
    }

    const addPin = (seeker) => {
        if (mode !== 'setup') return

        if (selectionType === 'seeker') {
            const copy = [...seekers]
            copy.push(seeker)
            setSeekers(copy)
        } else if (selectionType === 'finish') {
            setFinish(seeker)
        }
    }

    const onConnected = () => {
        console.log('Connected')
    }
    
    const onMessageReceived = (message) => {
        console.log(message)
    }

    const onDisconnect = () => {
        console.log('Disconnected')
    }

    return (
        <>
            <SockJsClient
                url={SOCKET_URL}
                topics={[`/topic/updates/${stateId}`]}
                onConnect={onConnected}
                onDisconnect={onDisconnect}
                onMessage={onMessageReceived}
                debug={false}
                ref={clientRef}
            />
            <MapContext.Provider value={{
                selectionType,
                seekers,
                location,
                finish,
                mode,
                addPin,
                removePin,
                setSelectionType,
                setSeekers,
                setLocation,
                setFinish,
                start,
                stop,
                clear,
            }}>
                {children}
            </MapContext.Provider>
        </>
    )
}
