import './App.css'
import MapBoundry from "./Boundry/index.jsx";
import {useContext, useState} from "react";
import MapContext from "./Boundry/mapContext.jsx";
import axios from "axios";
import {BACKEND_URL} from "./utils/constants.js";

function App() {

    const [userName, setUserName] = useState("")
    const [showMaps, setShowMaps] = useState(false)
    const {refreshMap} = useContext(MapContext)
    const [isError, setError] = useState(false)

    const handleInputChange = (e) => {
        setUserName(e?.target?.value)
    }
    const handleCreateUser = async () => {
        const response = await axios.post(`${BACKEND_URL}/users`, {name: userName, email: userName})
        if (response.status === 201) {
            setShowMaps(true)
        }
    }

    return (
        <div className="relative min-h-screen bg-gray-50">
            {/* Top Form Section */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full px-4">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4 border border-gray-200">
                    <input
                        type="email"
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isError ? 'border-red-600' : "border-gra-300"} `}
                    />
                    <div className="flex justify-between space-x-3">
                        <button
                            onClick={handleCreateUser}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                        <button
                            onClick={refreshMap}
                            className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            {showMaps && (
                <div className="pt-50 px-4">
                    <div className="w-full h-[80vh] overflow-hidden rounded-xl shadow-md border border-gray-300">
                        <MapBoundry userName={userName}/>
                    </div>
                </div>
            )}
        </div>

    )
}

export default App
