import React, { useState } from 'react'

export const MapContext = React.createContext({})

export default function MapContextProvider({ children }) {
    const [selectionType, setSelectionType] = useState('finish')
    const [seekers, setSeekers] = useState([])
    const [location, setLocation] = useState(null)

    const start = () => {
        console.log('start')
    }

    return (
        <MapContext.Provider value={{
            selectionType,
            setSelectionType,
            seekers,
            setSeekers,
            location,
            setLocation,
            start
        }}>{children}</MapContext.Provider>
    )
}