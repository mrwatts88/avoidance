import React, { useState } from 'react'

export const MapContext = React.createContext({})

export default function MapContextProvider({ children }) {
    const [selectionType, setSelectionType] = useState('finish')
    const [location, setLocation] = useState(null)
    const [seekers, setSeekers] = useState([])
    const [finish, setFinish] = useState(null)
    const [mode, setMode] = useState('setup')

    const start = () => {
        if (mode !== 'setup') return
        setMode('starting')
    }

    const stop = () => {
        if (['starting', 'inProgress'].includes(mode)) {
            setMode('setup')
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

    return (
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
        }}>{children}</MapContext.Provider>
    )
}
