import {createContext, useState} from "react";

const MapContext = createContext(null)

export const MapContextProvider = ({children}) => {
    const [refresh, setRefresh] = useState(0)

    const refreshMap = () => {
        setRefresh((prevState) => prevState + 1)
    }
    return (
        <MapContext.Provider value={{refresh, refreshMap}}>
            {children}
        </MapContext.Provider>
    )
}


export default MapContext