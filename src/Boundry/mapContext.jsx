import {createContext, useState} from "react";

const MapContext = createContext(null)

export const MapContextProvider = ({children}) => {
    const [refresh, setRefresh] = useState(0)
    const [showToast, setShowToast] = useState(false)

    const refreshMap = () => {
        setRefresh((prevState) => prevState + 1)
    }

    const showToastMessage = () => {
        setShowToast(true)
    }

    const resetToast = () => {
        setShowToast(false)
    }
    return (
        <MapContext.Provider value={{refresh, refreshMap, showToast, showToastMessage, resetToast}}>
            {children}
        </MapContext.Provider>
    )
}


export default MapContext