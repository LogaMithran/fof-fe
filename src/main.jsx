import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "./App.jsx"
import {MapContextProvider} from "./Boundry/mapContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MapContextProvider>
            <App/>
        </MapContextProvider>
    </StrictMode>,
)
