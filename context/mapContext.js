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

    return (
        <MapContext.Provider value={{
            selectionType,
            seekers,
            location,
            finish,
            setSelectionType,
            setSeekers,
            setLocation,
            setFinish,
            start,
            clear,
        }}>{children}</MapContext.Provider>
    )
}