import React, { useState } from 'react'

export const MapContext = React.createContext({})

export default function MapContextProvider({ children }) {
    const [selectionType, setSelectionType] = useState('finish')
    const [location, setLocation] = useState(null)
    const [seekers, setSeekers] = useState([])
    const [finish, setFinish] = useState(null)

    const start = () => {
        console.log('start')
    }

    const clear = () => {
        setSeekers([])
        setFinish(null)
    }

    const removePin = ({ latitude , longitude }) => {
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
            addPin,
            removePin,
            setSelectionType,
            setSeekers,
            setLocation,
            setFinish,
            start,
            clear,
        }}>{children}</MapContext.Provider>
    )
}
